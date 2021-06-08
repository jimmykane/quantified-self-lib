import { CreatorInterface } from '../creators/creator.interface';
import { SerializableClassInterface } from '../serializable/serializable.class.interface';
import { LapInterface } from '../laps/lap.interface';
import { IntensityZonesInterface } from '../intensity-zones/intensity-zones.interface';
import { StatsClassInterface } from '../stats/stats.class.interface';
import { DurationClassInterface } from '../duration/duration.class.interface';
import { ActivityTypes } from './activity.types';
import { StreamDataItem, StreamInterface } from '../streams/stream.interface';
import { ActivityJSONInterface } from './activity.json.interface';
import { IDClassInterface } from '../id/id.class.interface';
import { DataPositionInterface } from '../data/data.position.interface';
import { DataEvent } from '../data/data.event';
import { DataStartEvent } from '../data/data.start-event';
import { DataStopEvent } from '../data/data.stop-event';
import { DataStopAllEvent } from '../data/data.stop-all-event';

export interface ActivityInterface
  extends StatsClassInterface,
    DurationClassInterface,
    SerializableClassInterface,
    IDClassInterface {
  name: string;
  type: ActivityTypes;
  creator: CreatorInterface;
  // Probably kill intensity zones and use the stats
  intensityZones: IntensityZonesInterface[];

  /**
   * Checks if there are data for that stream type
   * @param streamType
   * @param startDate
   * @param endDate
   */
  hasStreamData(streamType: string | StreamInterface, startDate?: Date, endDate?: Date): boolean;

  /**
   * Checks if there are lat,long data pairs
   * @param startDate
   * @param endDate
   */
  hasPositionData(startDate?: Date, endDate?: Date): boolean;

  /**
   * Checks if the equipment is a trainer
   */
  isTrainer(): boolean;

  /**
   * Checks if the activity has a power meter
   */
  hasPowerMeter(): boolean;

  /**
   * Gets the data of a stream with optional params of start and end
   * @param streamType
   * @param startDate
   * @param endDate
   */
  getStreamData(streamType: string | StreamInterface, startDate?: Date, endDate?: Date): (number | null)[];

  /**
   * Gets the data of a stream with optional params of start and end but removes nulls
   * @param streamType
   * @param startDate
   * @param endDate
   */
  getSquashedStreamData(streamType: string, startDate?: Date, endDate?: Date): number[];

  /**
   * Gets the data of the stream based on timestamps
   * @param streamType
   * @param filterNull
   */
  getStreamDataByTime(streamType: string, filterNull?: boolean): StreamDataItem[];

  /**
   * Gets the data of the stream based on duration
   * @param streamType
   * @param filterNull
   * @param filterInfinity
   */
  getStreamDataByDuration(streamType: string, filterNull?: boolean, filterInfinity?: boolean): StreamDataItem[];

  /**
   * Gets more than one stream data based on time
   * @param streamTypes
   */
  getStreamDataTypesBasedOnTime(streamTypes?: string[]): { [type: number]: { [type: string]: number | null } };

  /**
   * Gets more than one stream type based on another stream type
   * @param streamTypeToBaseOn
   * @param streamTypes
   */
  getStreamDataTypesBasedOnDataType(
    streamTypeToBaseOn: string,
    streamTypes: string[]
  ): { [type: string]: number | null }[];

  /**
   * Creates a stream with null filled data values
   * @param type
   */
  createStream(type: string): StreamInterface;

  /**
   * Gets a stream
   * @param type
   */
  getStream(type: string): StreamInterface;

  /**
   * Adds a stream
   * @param stream
   */
  addStream(stream: StreamInterface): this;

  /**
   * Adds multiple streams
   * @param streams
   */
  addStreams(streams: StreamInterface[]): this;

  /**
   * Removes a stream
   * @param streamType
   */
  removeStream(streamType: string | StreamInterface): this;

  /**
   * Gets all available streams
   */
  getAllStreams(): StreamInterface[];

  /**
   * Gets all non-unitbased streams (essential streams)
   */
  getAllExportableStreams(): StreamInterface[];

  /**
   * Removes all streams
   */
  clearStreams(): this;

  /**
   * Adds a value to the streams data
   * Floor is used so a date with > end date does not create and extra slug in the array
   * @param type
   * @param date
   * @param value
   */
  addDataToStream(type: string, date: Date, value: number): this;

  /**
   * Gets the data of 2 streams (lat,long) formated as positional data
   * @param startDate
   * @param endDate
   */
  getPositionData(startDate?: Date, endDate?: Date): (DataPositionInterface | null)[];

  /**
   * Gets the data of 2 streams (lat,long) formated as positional data but ommits nulls
   * @param startDate
   * @param endDate
   */
  getSquashedPositionData(startDate?: Date, endDate?: Date): (DataPositionInterface | null)[];

  /**
   * Gets the laps of the activity
   */
  getLaps(): LapInterface[];

  /**
   * Adds a lap to the activity
   * @param lap
   */
  addLap(lap: LapInterface): this;

  /**
   * Gets the laps of the activity
   */
  hasLaps(): boolean;

  /**
   * Gets all the timebased events of the activity
   */
  getAllEvents(): DataEvent[];

  /**
   * Adds an event to the activity
   * @param event
   */
  addEvent(event: DataEvent): this;

  /**
   * Sets all the events to the activity
   * @param events
   */
  setAllEvents(events: DataEvent[]): this;

  /**
   * Gets only the start type of events
   */
  getStartEvents(): DataStartEvent[];

  /**
   * Gets only the stop type of events
   */
  getStopEvents(): DataStopEvent[];

  /**
   * Gets the stop all type of events
   */
  getStopAllEvents(): DataStopAllEvent[];

  /**
   * Generates a time stream based on the type of streams requested
   * @param streamTypes
   */
  generateTimeStream(streamTypes?: string[]): StreamInterface;

  /**
   * Gets the date index/duration from a date relative to the activity
   * @param date
   */
  getDateIndex(date: Date): number;

  toJSON(): ActivityJSONInterface;
}
