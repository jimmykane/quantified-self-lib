import { ActivityInterface } from './activity.interface';
import { DataInterface } from '../data/data.interface';
import { LapInterface } from '../laps/lap.interface';
import { IntensityZonesInterface } from '../intensity-zones/intensity-zones.interface';
import { Creator } from '../creators/creator';
import { ActivityTypes } from './activity.types';
import { DurationClassAbstract } from '../duration/duration.class.abstract';
import { CreatorInterface } from '../creators/creator.interface';
import { DataLatitudeDegrees } from '../data/data.latitude-degrees';
import { DataLongitudeDegrees } from '../data/data.longitude-degrees';
import { StreamDataItem, StreamInterface } from '../streams/stream.interface';
import { ActivityJSONInterface } from './activity.json.interface';
import { DataPositionInterface } from '../data/data.position.interface';
import { Stream } from '../streams/stream';
import { IntensityZonesJSONInterface } from '../intensity-zones/intensity-zones.json.interface';
import { isNumber } from '../events/utilities/helpers';
import { DataPower } from '../data/data.power';
import { DataEvent } from '../data/data.event';
import { DataStartEvent } from '../data/data.start-event';
import { DataStopEvent } from '../data/data.stop-event';
import { DataJSONInterface } from '../data/data.json.interface';
import { DataStopAllEvent } from '../data/data.stop-all-event';
import { DataTime } from '../data/data.time';
import { ActivityUtilities } from '../events/utilities/activity.utilities';

export const MAX_ACTIVITY_DURATION = 1 * 1 * 30 * 24 * 60 * 60 * 1000; // 1 month

export class Activity extends DurationClassAbstract implements ActivityInterface {
  private static readonly TRAINER_TYPES: ActivityTypes[] = [
    ActivityTypes.VirtualRun,
    ActivityTypes.VirtualCycling,
    ActivityTypes.Treadmill,
    ActivityTypes.IndoorCycling,
    ActivityTypes.IndoorRunning,
    ActivityTypes.IndoorRowing,
    ActivityTypes.Crosstrainer,
    ActivityTypes.EllipticalTrainer,
    ActivityTypes.FitnessEquipment,
    ActivityTypes.StairStepper
  ];

  public name: string;
  public type: ActivityTypes;
  public creator: CreatorInterface;
  public intensityZones: IntensityZonesInterface[] = []; // maybe rename

  private laps: LapInterface[] = [];
  private streams: StreamInterface[] = [];

  private events: DataEvent[] = [];

  constructor(startDate: Date, endDate: Date, type: ActivityTypes, creator: Creator, name = '') {
    super(startDate, endDate);
    if (!startDate || !endDate) {
      throw new Error('Start and end dates are required');
    }
    if (endDate < startDate) {
      throw new Error('Activity end date is before the start date and that is not acceptable');
    }
    if (+endDate - +startDate > MAX_ACTIVITY_DURATION) {
      throw new Error('Activity duration is over 1 month and that is not supported');
    }
    this.type = type;
    this.creator = creator;
    this.name = name;
  }

  createStream(type: string): StreamInterface {
    return new Stream(type, Array(ActivityUtilities.getDataLength(this.startDate, this.endDate)).fill(null));
  }

  addDataToStream(type: string, date: Date, value: number): this {
    this.getStreamData(type)[this.getDateIndex(date)] = value;
    return this;
  }

  addStream(stream: StreamInterface): this {
    if (this.streams.find(activityStream => activityStream.type === stream.type)) {
      throw new Error(`Duplicate type of stream when adding ${stream.type} to activity ${this.getID()}`);
    }
    this.streams.push(stream);
    return this;
  }

  clearStreams(): this {
    this.streams = [];
    return this;
  }

  removeStream(streamType: string | StreamInterface): this {
    const stream = streamType instanceof Stream ? streamType : this.getStream(<string>streamType);
    this.streams = this.streams.filter(activityStream => stream !== activityStream);
    return this;
  }

  addStreams(streams: StreamInterface[]): this {
    this.streams.push(...streams);
    return this;
  }

  getAllStreams(): StreamInterface[] {
    return this.streams;
  }

  // @todo needs more logic improvement and transparency
  getAllExportableStreams(): StreamInterface[] {
    return this.getAllStreams().filter(stream => stream.isExportable());
  }

  hasStreamData(streamType: string | StreamInterface, startDate?: Date, endDate?: Date): boolean {
    try {
      this.getStreamData(streamType, startDate, endDate);
    } catch (e) {
      return false;
    }
    return true;
  }

  hasPositionData(startDate?: Date, endDate?: Date): boolean {
    return (
      this.hasStreamData(DataLatitudeDegrees.type, startDate, endDate) &&
      this.hasStreamData(DataLongitudeDegrees.type, startDate, endDate)
    );
  }

  isTrainer(): boolean {
    return Activity.TRAINER_TYPES.indexOf(this.type) !== -1;
  }

  hasPowerMeter(): boolean {
    return this.hasStreamData(DataPower.type);
  }

  getStream(streamType: string): StreamInterface {
    const find = this.streams.find(stream => stream.type === streamType);
    if (!find) {
      throw Error(`No stream found with type ${streamType}`);
    }
    return find;
  }

  getStreamData(streamType: string | StreamInterface, startDate?: Date, endDate?: Date): (number | null)[] {
    const stream = streamType instanceof Stream ? streamType : this.getStream(<string>streamType);
    if (!startDate && !endDate) {
      return stream.getData();
    }

    if (startDate && endDate) {
      return stream
        .getData()
        .filter((value, index) => new Date(this.startDate.getTime() + index * 1000) <= endDate)
        .filter((value, index) => new Date(this.startDate.getTime() + index * 1000) >= startDate);
    }

    if (startDate) {
      return stream.getData().filter((value, index) => new Date(this.startDate.getTime() + index * 1000) > startDate);
    }

    if (endDate) {
      return stream.getData().filter((value, index) => new Date(this.startDate.getTime() + index * 1000) < endDate);
    }

    return [];
  }

  // @todo see how this fits with the filtering on the stream class
  /**
   * Gets the data array of an activity stream excluding the non numeric ones
   * @todo include strings and all data abstract types
   * @param streamType
   * @param startDate
   * @param endDate
   */
  getSquashedStreamData(streamType: string, startDate?: Date, endDate?: Date): number[] {
    return <number[]>this.getStreamData(streamType, startDate, endDate).filter(data => isNumber(data));
  }

  getPositionData(startDate?: Date, endDate?: Date): (DataPositionInterface | null)[] {
    const latitudeStreamData = this.getStreamData(DataLatitudeDegrees.type, startDate, endDate);
    const longitudeStreamData = this.getStreamData(DataLongitudeDegrees.type, startDate, endDate);
    return latitudeStreamData.reduce((positionArray: (DataPositionInterface | null)[], value, index, array) => {
      const currentLatitude = latitudeStreamData[index];
      const currentLongitude = longitudeStreamData[index];
      if (!isNumber(currentLatitude) || !isNumber(currentLongitude)) {
        positionArray.push(null);
        return positionArray;
      }
      positionArray.push({
        latitudeDegrees: <number>currentLatitude,
        longitudeDegrees: <number>currentLongitude
      });
      return positionArray;
    }, []);
  }

  getSquashedPositionData(startDate?: Date, endDate?: Date): DataPositionInterface[] {
    return <DataPositionInterface[]>this.getPositionData(startDate, endDate).filter(data => data !== null);
  }

  getStreamDataTypesBasedOnDataType(
    streamTypeToBaseOn: string,
    streamTypes: string[]
  ): { [type: string]: number | null }[] {
    return ActivityUtilities.getStreamDataTypesBasedOnDataType(
      this.getStream(streamTypeToBaseOn),
      this.getAllStreams()
        .filter(stream => stream.type !== streamTypeToBaseOn)
        .filter(stream => streamTypes.indexOf(stream.type) !== -1)
    );
  }

  getStreamDataTypesBasedOnTime(streamTypes?: string[]): { [type: number]: { [type: string]: number | null } } {
    return ActivityUtilities.getStreamDataTypesBasedOnTime(
      this.startDate,
      this.endDate,
      !streamTypes
        ? this.getAllStreams()
        : this.getAllStreams().filter(stream => streamTypes.indexOf(stream.type) !== -1)
    );
  }

  getStreamDataByTime(streamType: string, filterNull = false, filterInfinity = false): StreamDataItem[] {
    return this.getStream(streamType).getStreamDataByTime(this.startDate, filterNull, filterInfinity);
  }

  getStreamDataByDuration(streamType: string, filterNull = false, filterInfinity = false): StreamDataItem[] {
    return this.getStream(streamType).getStreamDataByDuration(0, filterNull, filterInfinity);
  }

  addLap(lap: LapInterface): this {
    this.laps.push(lap);
    return this;
  }

  getLaps(activity?: ActivityInterface): LapInterface[] {
    return this.laps;
  }

  hasLaps(): boolean {
    return this.laps.length > 0;
  }

  getAllEvents(): DataEvent[] {
    return this.events;
  }

  getStartEvents(): DataStartEvent[] {
    return this.events.filter(event => event instanceof DataStartEvent);
  }

  getStopEvents(): DataStopEvent[] {
    return this.events.filter(event => event instanceof DataStopEvent);
  }

  getStopAllEvents(): DataStopEvent[] {
    return this.events.filter(event => event instanceof DataStopAllEvent);
  }

  addEvent(event: DataEvent): this {
    this.events.push(event);
    return this;
  }

  setAllEvents(events: DataEvent[]): this {
    this.events = events;
    return this;
  }

  generateTimeStream(streamTypes: string[] = []): StreamInterface {
    const timeStream = this.createStream(DataTime.type);
    let streams = this.getAllStreams();
    if (streamTypes.length) {
      streams = streams.filter(stream => streamTypes.indexOf(stream.type) !== -1);
    }
    streams.forEach(stream => {
      this.getStreamDataByDuration(stream.type, true, false).forEach((data: any) => {
        timeStream.getData()[data.time / 1000] = data.time / 1000;
      });
    });
    return timeStream;
  }

  getDateIndex(date: Date): number {
    // @todo ceil vs floor (still debatable)
    return Math.round((+date - +this.startDate) / 1000);
  }

  toJSON(): ActivityJSONInterface {
    const intensityZones: IntensityZonesJSONInterface[] = [];
    this.intensityZones.forEach((value: IntensityZonesInterface) => {
      intensityZones.push(value.toJSON());
    });
    const stats = {};
    this.stats.forEach((value: DataInterface, key: string) => {
      Object.assign(stats, value.toJSON());
    });
    return {
      startDate: this.startDate.getTime(),
      endDate: this.endDate.getTime(),
      type: this.type,
      creator: this.creator.toJSON(),
      intensityZones: intensityZones,
      stats: stats,
      events: this.getAllEvents().reduce((eventsArray: DataJSONInterface[], event) => {
        eventsArray.push(event.toJSON());
        return eventsArray;
      }, []),
      laps: this.getLaps().reduce((jsonLapsArray: any[], lap: LapInterface) => {
        jsonLapsArray.push(lap.toJSON());
        return jsonLapsArray;
      }, [])
    };
  }
}
