import { ActivityInterface } from '../../activities/activity.interface';
import { DataHeartRate } from '../../data/data.heart-rate';
import { DataCadence } from '../../data/data.cadence';
import { DataSpeed } from '../../data/data.speed';
import { DataVerticalSpeed } from '../../data/data.vertical-speed';
import { DataTemperature } from '../../data/data.temperature';
import { DataAltitude } from '../../data/data.altitude';
import { DataPower } from '../../data/data.power';
import { DataAltitudeMax } from '../../data/data.altitude-max';
import { DataAltitudeMin } from '../../data/data.altitude-min';
import { DataAltitudeAvg } from '../../data/data.altitude-avg';
import { DataHeartRateMax } from '../../data/data.heart-rate-max';
import { DataHeartRateMin } from '../../data/data.heart-rate-min';
import { DataHeartRateAvg } from '../../data/data.heart-rate-avg';
import { DataCadenceMax } from '../../data/data.cadence-max';
import { DataCadenceMin } from '../../data/data.cadence-min';
import { DataCadenceAvg } from '../../data/data.cadence-avg';
import {
  DataSpeedMax,
  DataSpeedMaxFeetPerMinute,
  DataSpeedMaxFeetPerSecond,
  DataSpeedMaxKilometersPerHour,
  DataSpeedMaxKnots,
  DataSpeedMaxMetersPerMinute,
  DataSpeedMaxMilesPerHour
} from '../../data/data.speed-max';
import {
  DataSpeedMin,
  DataSpeedMinFeetPerMinute,
  DataSpeedMinFeetPerSecond,
  DataSpeedMinKilometersPerHour,
  DataSpeedMinKnots,
  DataSpeedMinMetersPerMinute,
  DataSpeedMinMilesPerHour
} from '../../data/data.speed-min';
import {
  DataSpeedAvg,
  DataSpeedAvgFeetPerMinute,
  DataSpeedAvgFeetPerSecond,
  DataSpeedAvgKilometersPerHour,
  DataSpeedAvgKnots,
  DataSpeedAvgMetersPerMinute,
  DataSpeedAvgMilesPerHour
} from '../../data/data.speed-avg';
import {
  DataVerticalSpeedMax,
  DataVerticalSpeedMaxFeetPerHour,
  DataVerticalSpeedMaxFeetPerMinute,
  DataVerticalSpeedMaxFeetPerSecond,
  DataVerticalSpeedMaxKilometerPerHour,
  DataVerticalSpeedMaxMetersPerHour,
  DataVerticalSpeedMaxMetersPerMinute,
  DataVerticalSpeedMaxMilesPerHour
} from '../../data/data.vertical-speed-max';
import {
  DataVerticalSpeedMin,
  DataVerticalSpeedMinFeetPerHour,
  DataVerticalSpeedMinFeetPerMinute,
  DataVerticalSpeedMinFeetPerSecond,
  DataVerticalSpeedMinKilometerPerHour,
  DataVerticalSpeedMinMetersPerHour,
  DataVerticalSpeedMinMetersPerMinute,
  DataVerticalSpeedMinMilesPerHour
} from '../../data/data.vertical-speed-min';
import {
  DataVerticalSpeedAvg,
  DataVerticalSpeedAvgFeetPerHour,
  DataVerticalSpeedAvgFeetPerMinute,
  DataVerticalSpeedAvgFeetPerSecond,
  DataVerticalSpeedAvgKilometerPerHour,
  DataVerticalSpeedAvgMetersPerHour,
  DataVerticalSpeedAvgMetersPerMinute,
  DataVerticalSpeedAvgMilesPerHour
} from '../../data/data.vertical-speed-avg';
import { DataPowerMax } from '../../data/data.power-max';
import { DataPowerMin } from '../../data/data.power-min';
import { DataPowerAvg } from '../../data/data.power-avg';
import { DataTemperatureMax } from '../../data/data.temperature-max';
import { DataTemperatureMin } from '../../data/data.temperature-min';
import { DataTemperatureAvg } from '../../data/data.temperature-avg';
import { DataDistance } from '../../data/data.distance';
import { DataDuration } from '../../data/data.duration';
import { DataPause } from '../../data/data.pause';
import { DataAscent } from '../../data/data.ascent';
import { DataDescent } from '../../data/data.descent';
import { GeoLibAdapter } from '../../geodesy/adapters/geolib.adapter';
import { DataPaceMax, DataPaceMaxMinutesPerMile } from '../../data/data.pace-max';
import { DataPace } from '../../data/data.pace';
import { DataPaceMin, DataPaceMinMinutesPerMile } from '../../data/data.pace-min';
import { DataPaceAvg, DataPaceAvgMinutesPerMile } from '../../data/data.pace-avg';
import { DataBatteryCharge } from '../../data/data.battery-charge';
import { DataBatteryConsumption } from '../../data/data.battery-consumption';
import { DataBatteryLifeEstimation } from '../../data/data.battery-life-estimation';
import { DataPositionInterface } from '../../data/data.position.interface';
import { DataLatitudeDegrees } from '../../data/data.latitude-degrees';
import { Stream } from '../../streams/stream';
import {
  convertPaceToPaceInMinutesPerMile,
  convertSpeedToPace,
  convertSpeedToSpeedInFeetPerHour,
  convertSpeedToSpeedInFeetPerMinute,
  convertSpeedToSpeedInFeetPerSecond,
  convertSpeedToSpeedInKilometersPerHour,
  convertSpeedToSpeedInKnots,
  convertSpeedToSpeedInMetersPerHour,
  convertSpeedToSpeedInMetersPerMinute,
  convertSpeedToSpeedInMilesPerHour,
  convertSpeedToSwimPace,
  convertSwimPaceToSwimPacePer100Yard,
  isNumber,
  isNumberOrString
} from './helpers';
import { DataLongitudeDegrees } from '../../data/data.longitude-degrees';
import { StreamDataItem, StreamInterface } from '../../streams/stream.interface';
import { DataEnergy } from '../../data/data.energy';
import { DataStartAltitude } from '../../data/data.start-altitude';
import { DataEndAltitude } from '../../data/data.end-altitude';
import { DataSwimPaceMax, DataSwimPaceMaxMinutesPer100Yard } from '../../data/data.swim-pace-max';
import { DataSwimPace } from '../../data/data.swim-pace';
import { DataSwimPaceMin, DataSwimPaceMinMinutesPer100Yard } from '../../data/data.swim-pace-min';
import { DataSwimPaceAvg, DataSwimPaceAvgMinutesPer100Yard } from '../../data/data.swim-pace-avg';
import { DataFeeling } from '../../data/data.feeling';
import { DataPowerLeft } from '../../data/data.power-left';
import { DataRightBalance } from '../../data/data.right-balance';
import { DataLeftBalance } from '../../data/data.left-balance';
import { DataPowerRight } from '../../data/data.power-right';
import { DataAirPowerMin } from '../../data/data.air-power-min';
import { DataAirPower } from '../../data/data.air-power';
import { DataAirPowerMax } from '../../data/data.air-power-max';
import { DataAirPowerAvg } from '../../data/data.air-power-avg';
import { DataInterface } from '../../data/data.interface';
import { DataRPE } from '../../data/data.rpe';
import { DataGNSSDistance } from '../../data/data.gnss-distance';
import { DataHeartRateZoneOneDuration } from '../../data/data.heart-rate-zone-one-duration';
import { DataHeartRateZoneTwoDuration } from '../../data/data.heart-rate-zone-two-duration';
import { DataHeartRateZoneThreeDuration } from '../../data/data.heart-rate-zone-three-duration';
import { DataHeartRateZoneFourDuration } from '../../data/data.heart-rate-zone-four-duration';
import { DataHeartRateZoneFiveDuration } from '../../data/data.heart-rate-zone-five-duration';
import { DataPowerZoneOneDuration } from '../../data/data.power-zone-one-duration';
import { DataPowerZoneTwoDuration } from '../../data/data.power-zone-two-duration';
import { DataPowerZoneThreeDuration } from '../../data/data.power-zone-three-duration';
import { DataPowerZoneFourDuration } from '../../data/data.power-zone-four-duration';
import { DataPowerZoneFiveDuration } from '../../data/data.power-zone-five-duration';
import { DataSpeedZoneOneDuration } from '../../data/data.speed-zone-one-duration';
import { DataSpeedZoneTwoDuration } from '../../data/data.speed-zone-two-duration';
import { DataSpeedZoneThreeDuration } from '../../data/data.speed-zone-three-duration';
import { DataSpeedZoneFourDuration } from '../../data/data.speed-zone-four-duration';
import { DataSpeedZoneFiveDuration } from '../../data/data.speed-zone-five-duration';
import { DynamicDataLoader } from '../../data/data.store';
import { DataStartPosition } from '../../data/data.start-position';
import { DataEndPosition } from '../../data/data.end-position';
import {
  DataGradeAdjustedSpeedAvg,
  DataGradeAdjustedSpeedAvgFeetPerMinute,
  DataGradeAdjustedSpeedAvgFeetPerSecond,
  DataGradeAdjustedSpeedAvgKilometersPerHour,
  DataGradeAdjustedSpeedAvgKnots,
  DataGradeAdjustedSpeedAvgMetersPerMinute,
  DataGradeAdjustedSpeedAvgMilesPerHour
} from '../../data/data.grade-adjusted-speed-avg';
import {
  DataGradeAdjustedPaceAvg,
  DataGradeAdjustedPaceAvgMinutesPerMile
} from '../../data/data.grade-adjusted-pace-avg';
import { DataGradeAdjustedSpeed } from '../../data/data.grade-adjusted-speed';
import { DataGradeAdjustedPace } from '../../data/data.grade-adjusted-pace';
import {
  DataGradeAdjustedSpeedMax,
  DataGradeAdjustedSpeedMaxFeetPerMinute,
  DataGradeAdjustedSpeedMaxFeetPerSecond,
  DataGradeAdjustedSpeedMaxKilometersPerHour,
  DataGradeAdjustedSpeedMaxKnots,
  DataGradeAdjustedSpeedMaxMetersPerMinute,
  DataGradeAdjustedSpeedMaxMilesPerHour
} from '../../data/data.grade-adjusted-speed-max';
import {
  DataGradeAdjustedSpeedMin,
  DataGradeAdjustedSpeedMinFeetPerMinute,
  DataGradeAdjustedSpeedMinFeetPerSecond,
  DataGradeAdjustedSpeedMinKilometersPerHour,
  DataGradeAdjustedSpeedMinKnots,
  DataGradeAdjustedSpeedMinMetersPerMinute,
  DataGradeAdjustedSpeedMinMilesPerHour
} from '../../data/data.grade-adjusted-speed-min';
import {
  DataGradeAdjustedPaceMax,
  DataGradeAdjustedPaceMaxMinutesPerMile
} from '../../data/data.grade-adjusted-pace-max';
import {
  DataGradeAdjustedPaceMin,
  DataGradeAdjustedPaceMinMinutesPerMile
} from '../../data/data.grade-adjusted-pace-min';
import { DataGrade } from '../../data/data.grade';
import { GradeCalculator } from './grade-calculator/grade-calculator';
import {
  ActivityTypeGroups,
  ActivityTypes,
  ActivityTypesHelper,
  ActivityTypesMoving
} from '../../activities/activity.types';
import { DataMovingTime } from '../../data/data.moving-time';
import { StatsClassInterface } from '../../stats/stats.class.interface';
import { DataTimerTime } from '../../data/data.timer-time';
import { DataNumber } from '../../data/data.number';

export class ActivityUtilities {
  private static geoLibAdapter = new GeoLibAdapter();

  /**
   * Provide average from laps a given stat type
   */
  public static getDataTypeAvgFromLaps(
    activity: ActivityInterface,
    statType: string,
    filterOver?: number
  ): number | null {
    const data = <number[]>activity
      .getLaps()
      .map(lap => (<DataNumber>lap.getStat(statType))?.getValue())
      .filter(d => Number.isFinite(d) && (Number.isFinite(filterOver) ? d > <number>filterOver : true));

    if (data.length > 0) {
      return this.getAverage(data);
    }

    return null;
  }

  /**
   * Provide average of a given stream type
   */
  public static getDataTypeAvg(
    activity: ActivityInterface,
    streamType: string,
    startDate?: Date,
    endDate?: Date,
    filterOver?: number
  ): number {
    const data = <number[]>(
      activity
        .getSquashedStreamData(streamType, startDate, endDate)
        .filter(
          streamData =>
            streamData !== Infinity &&
            streamData !== -Infinity &&
            (Number.isFinite(filterOver) ? streamData > <number>filterOver : true)
        )
    );
    return this.getAverage(data);
  }

  public static round(value: number, decimals = 0) {
    const decimalsFactor = Math.pow(10, decimals);
    return Math.round(value * decimalsFactor) / decimalsFactor;
  }

  public static getAverage(data: number[]): number {
    return this.getSum(data) / data.length;
  }

  public static getSum(data: number[]): number {
    return data.reduce((sumbuff: number, value: number) => {
      sumbuff += value;
      return sumbuff;
    }, 0);
  }

  public static getDataTypeMax(
    activity: ActivityInterface,
    streamType: string,
    startDate?: Date,
    endDate?: Date
  ): number {
    return this.getActivityDataTypeMinOrMax(activity, streamType, true, startDate, endDate);
  }

  public static getDataTypeMin(
    activity: ActivityInterface,
    streamType: string,
    startDate?: Date,
    endDate?: Date,
    filterOver?: number
  ): number {
    return this.getActivityDataTypeMinOrMax(activity, streamType, false, startDate, endDate, filterOver);
  }

  public static getDataTypeMinToMaxDifference(
    activity: ActivityInterface,
    streamType: string,
    startDate?: Date,
    endDate?: Date
  ): number {
    return (
      this.getDataTypeMax(activity, streamType, startDate, endDate) -
      this.getDataTypeMin(activity, streamType, startDate, endDate)
    );
  }

  public static getDataTypeFirst(
    activity: ActivityInterface,
    streamType: string,
    startDate?: Date,
    endDate?: Date
  ): number {
    const data = <number[]>activity.getSquashedStreamData(streamType, startDate, endDate);
    return data[0];
  }

  public static getDataTypeLast(
    activity: ActivityInterface,
    streamType: string,
    startDate?: Date,
    endDate?: Date
  ): number {
    const data = <number[]>activity.getSquashedStreamData(streamType, startDate, endDate);
    return data[data.length - 1];
  }

  public static cropDistance(
    startDistance: number,
    endDistance: number,
    activity: ActivityInterface
  ): ActivityInterface {
    // Short to do the search just in case
    let startDistanceDate: Date | undefined; // Does not sound right
    let endDistanceDate: Date | undefined;

    // debugger;
    activity.getStreamData(DataDistance.type).forEach((distanceFromData, index) => {
      // Find the index with greater dinstnce and convert it to time
      if (startDistance && !startDistanceDate && distanceFromData && distanceFromData >= startDistance) {
        startDistanceDate = new Date(activity.startDate.getTime() + index * 1000);
        return;
      }
      // Same for end
      if (endDistance && !endDistanceDate && distanceFromData && distanceFromData >= endDistance) {
        endDistanceDate = new Date(activity.startDate.getTime() + index * 1000);
        return;
      }
    });

    if (!startDistanceDate && !endDistanceDate) {
      return activity;
    }

    activity = this.cropTime(activity, startDistanceDate, endDistanceDate);

    // Remove because it is invalid, you cannot just offset the distance as a stream I think
    const distanceStream = activity.getAllStreams().find(s => DataDistance.type === s.type);
    if (distanceStream) {
      activity.removeStream(distanceStream);
    }
    const gnssDistanceStream = activity.getAllStreams().find(s => DataGNSSDistance.type === s.type);
    if (gnssDistanceStream) {
      activity.removeStream(gnssDistanceStream);
    }
    return activity;
  }

  /**
   * Crops left,right on time.
   * Start and end date need to be relative to the activity start / end time
   * @param activity
   * @param startDate
   * @param endDate
   */
  public static cropTime(activity: ActivityInterface, startDate?: Date, endDate?: Date): ActivityInterface {
    activity.getAllStreams().forEach(stream => {
      // Get the data for the range specified
      const trimmedStreamData = activity.getStreamData(stream.type, startDate, endDate);
      activity.removeStream(stream);
      activity.addStream(new Stream(stream.type, trimmedStreamData));
    });

    activity.startDate = startDate || activity.startDate;
    activity.endDate = endDate || activity.endDate;
    // debugger
    return activity;
  }

  public static getStreamDataTypesBasedOnDataType(
    streamToBaseOn: StreamInterface,
    streams: StreamInterface[]
  ): { [type: string]: number | null }[] {
    return streamToBaseOn.getData().reduce((accu: { [type: string]: number | null }[], streamDataItem, index) => {
      if (!isNumberOrString(streamDataItem)) {
        return accu;
      }
      const dataItem: { [type: string]: number | null } = {
        [streamToBaseOn.type]: streamDataItem
      };
      streams.forEach(stream => {
        dataItem[stream.type] = stream.getData()[index];
      });
      accu.push(dataItem);
      return accu;
    }, []);
  }

  public static getStreamDataTypesBasedOnTime(
    startDate: Date,
    endDate: Date,
    streams: StreamInterface[]
  ): { [type: number]: { [type: string]: number | null } } {
    const streamDataBasedOnTime: { [type: number]: { [type: string]: number | null } } = {};
    for (let i = 0; i < this.getDataLength(startDate, endDate); i++) {
      // Perhaps this can be optimized with a search function
      streams.forEach((stream: StreamInterface) => {
        if (isNumber(stream.getData()[i])) {
          streamDataBasedOnTime[startDate.getTime() + i * 1000] =
            streamDataBasedOnTime[startDate.getTime() + i * 1000] || {};
          streamDataBasedOnTime[startDate.getTime() + i * 1000][stream.type] = stream.getData()[i];
        }
      });
    }
    return streamDataBasedOnTime;
  }

  public static getDataLength(startDate: Date, endDate: Date): number {
    return Math.ceil((+endDate - +startDate) / 1000) + 1;
  }

  public static generateMissingStreamsAndStatsForActivity(activity: ActivityInterface) {
    this.generateMissingStreamsForActivity(activity);
    activity.addStreams(this.createUnitStreamsFromStreams(activity.getAllStreams(), activity.type));
    this.generateMissingStatsForActivity(activity);
    this.generateMissingSpeedDerivedStatsForActivity(activity);
    this.generateMissingUnitStatsForActivity(activity); // Perhaps this needs to happen on user level so needs to go out of here
  }

  public static getSummaryStatsForActivities(activities: ActivityInterface[]): DataInterface[] {
    const stats: DataInterface[] = [];
    // If only one
    if (activities.length === 1) {
      return activities[0].getStatsAsArray();
    }

    let duration = 0;
    let ascent = 0;
    let descent = 0;
    let energy = 0;
    let distance = 0;
    let pauseTime = 0;
    let averageHeartRate = 0;
    let averagePower = 0;
    let averageCadence = 0;
    let averageSpeed = 0;
    let averageGradeAdjustedSpeed = 0;
    let averagePace = 0;
    let averageGradeAdjustedPace = 0;
    let averageSwimPace = 0;
    let averageTemperature = 0;
    let averageFeeling = 0;
    let averageRPE = 0;

    // Sum Duration
    activities.forEach(activity => {
      duration += activity.getDuration().getValue();
    });
    stats.push(new DataDuration(duration));

    // Sum pause time
    activities.forEach(activity => {
      pauseTime += activity.getPause().getValue();
    });
    stats.push(new DataPause(pauseTime));

    // Sum Distance
    activities.forEach(activity => {
      distance += activity.getDistance().getValue();
    });
    stats.push(new DataDistance(distance));

    // Sum ascent
    activities.forEach(activity => {
      const activityAscent = activity.getStat(DataAscent.type);
      if (activityAscent) {
        ascent += <number>activityAscent.getValue();
      }
    });
    stats.push(new DataAscent(ascent));

    // Sum descent
    activities.forEach(activity => {
      const activityDescent = activity.getStat(DataDescent.type);
      if (activityDescent) {
        descent += <number>activityDescent.getValue();
      }
    });
    stats.push(new DataDescent(descent));

    // Sum energy
    activities.forEach(activity => {
      const activityEnergy = activity.getStat(DataEnergy.type);
      if (activityEnergy) {
        energy += <number>activityEnergy.getValue();
      }
    });
    stats.push(new DataEnergy(energy));

    // Avg Avg HR
    activities.forEach(activity => {
      const activityAvgHeartRate = activity.getStat(DataHeartRateAvg.type);
      if (activityAvgHeartRate) {
        // The below will fallback for 0
        averageHeartRate = averageHeartRate
          ? (averageHeartRate + <number>activityAvgHeartRate.getValue()) / 2
          : <number>activityAvgHeartRate.getValue();
      }
    });
    if (averageHeartRate) {
      stats.push(new DataHeartRateAvg(averageHeartRate));
    }

    // Avg Avg HR
    activities.forEach(activity => {
      const activityAvgHeartRate = activity.getStat(DataHeartRateAvg.type);
      if (activityAvgHeartRate) {
        // The below will fallback for 0
        averageHeartRate = averageHeartRate
          ? (averageHeartRate + <number>activityAvgHeartRate.getValue()) / 2
          : <number>activityAvgHeartRate.getValue();
      }
    });
    if (averageHeartRate) {
      stats.push(new DataHeartRateAvg(averageHeartRate));
    }

    // Avg Avg Power
    activities.forEach(activity => {
      const activityAvgPower = activity.getStat(DataPowerAvg.type);
      if (activityAvgPower) {
        // The below will fallback for 0
        averagePower = averagePower
          ? (averagePower + <number>activityAvgPower.getValue()) / 2
          : <number>activityAvgPower.getValue();
      }
    });
    if (averagePower) {
      stats.push(new DataPowerAvg(averagePower));
    }

    // Avg Avg Cadence
    activities.forEach(activity => {
      const activityAvgCadence = activity.getStat(DataCadenceAvg.type);
      if (activityAvgCadence) {
        // The below will fallback for 0
        averageCadence = averageCadence
          ? (averageCadence + <number>activityAvgCadence.getValue()) / 2
          : <number>activityAvgCadence.getValue();
      }
    });
    if (averageCadence) {
      stats.push(new DataCadenceAvg(averageCadence));
    }

    // Avg Avg Speed
    activities.forEach(activity => {
      const activityAvgSpeed = activity.getStat(DataSpeedAvg.type);
      if (activityAvgSpeed) {
        // The below will fallback for 0
        averageSpeed = averageSpeed
          ? (averageSpeed + <number>activityAvgSpeed.getValue()) / 2
          : <number>activityAvgSpeed.getValue();
      }
    });
    if (averageSpeed) {
      stats.push(new DataSpeedAvg(averageSpeed));
    }

    // Avg Avg Gap Speed
    activities.forEach(activity => {
      const activityAvgGradeAdjustedSpeed = activity.getStat(DataGradeAdjustedSpeedAvg.type);
      if (activityAvgGradeAdjustedSpeed) {
        // The below will fallback for 0
        averageGradeAdjustedSpeed = averageGradeAdjustedSpeed
          ? (averageGradeAdjustedSpeed + <number>activityAvgGradeAdjustedSpeed.getValue()) / 2
          : <number>activityAvgGradeAdjustedSpeed.getValue();
      }
    });
    if (averageGradeAdjustedSpeed) {
      stats.push(new DataGradeAdjustedSpeedAvg(averageGradeAdjustedSpeed));
    }

    // Avg Avg Pace
    activities.forEach(activity => {
      const activityAvgPace = activity.getStat(DataPaceAvg.type);
      if (activityAvgPace) {
        // The below will fallback for 0
        averagePace = averagePace
          ? (averagePace + <number>activityAvgPace.getValue()) / 2
          : <number>activityAvgPace.getValue();
      }
    });
    if (averagePace) {
      stats.push(new DataPaceAvg(averagePace));
    }

    // Avg Avg GAP Pace
    activities.forEach(activity => {
      const activityAvgGradeAdjustedPace = activity.getStat(DataGradeAdjustedPaceAvg.type);
      if (activityAvgGradeAdjustedPace) {
        // The below will fallback for 0
        averageGradeAdjustedPace = averageGradeAdjustedPace
          ? (averageGradeAdjustedPace + <number>activityAvgGradeAdjustedPace.getValue()) / 2
          : <number>activityAvgGradeAdjustedPace.getValue();
      }
    });
    if (averageGradeAdjustedPace) {
      stats.push(new DataGradeAdjustedPaceAvg(averageGradeAdjustedPace));
    }

    // Avg Avg SwimPace
    activities.forEach(activity => {
      const activityAvgSwimPace = activity.getStat(DataSwimPaceAvg.type);
      if (activityAvgSwimPace) {
        // The below will fallback for 0
        averageSwimPace = averageSwimPace
          ? (averageSwimPace + <number>activityAvgSwimPace.getValue()) / 2
          : <number>activityAvgSwimPace.getValue();
      }
    });
    if (averageSwimPace) {
      stats.push(new DataSwimPaceAvg(averageSwimPace));
    }

    // Avg Avg Temperature
    activities.forEach(activity => {
      const activityAvgTemperature = activity.getStat(DataTemperatureAvg.type);
      if (activityAvgTemperature) {
        // The below will fallback for 0
        averageTemperature = averageTemperature
          ? (averageTemperature + <number>activityAvgTemperature.getValue()) / 2
          : <number>activityAvgTemperature.getValue();
      }
    });
    if (averageTemperature) {
      stats.push(new DataTemperatureAvg(averageTemperature));
    }

    // Avg Feeling
    activities.forEach(activity => {
      const activityAvgFeeling = activity.getStat(DataFeeling.type);
      if (activityAvgFeeling) {
        // The below will fallback for 0
        averageFeeling = averageFeeling
          ? Math.ceil((averageFeeling + <number>activityAvgFeeling.getValue()) / 2)
          : <number>activityAvgFeeling.getValue();
      }
    });
    if (averageFeeling) {
      stats.push(new DataFeeling(averageFeeling));
    }

    // Avg RPE
    activities.forEach(activity => {
      const activityAvgRPE = activity.getStat(DataFeeling.type);
      if (activityAvgRPE) {
        // The below will fallback for 0
        averageRPE = averageRPE
          ? Math.ceil((averageRPE + <number>activityAvgRPE.getValue()) / 2)
          : <number>activityAvgRPE.getValue();
      }
    });
    if (averageRPE) {
      stats.push(new DataRPE(averageRPE));
    }

    stats.push(...this.getIntensityZonesStatsAggregated(activities));

    // Add start and end position
    // This expects the to be sorted
    const activitiesWithStartPosition = activities.filter(activity => activity.getStat(DataStartPosition.type));
    const activitiesWithEndPosition = activities.filter(activity => activity.getStat(DataEndPosition.type));
    if (activitiesWithStartPosition && activitiesWithStartPosition.length) {
      const startPositionStat = <DataStartPosition>activitiesWithStartPosition[0].getStat(DataStartPosition.type);
      stats.push(new DataStartPosition(startPositionStat.getValue()));
    }
    if (activitiesWithEndPosition && activitiesWithEndPosition.length) {
      const endPositionStat = <DataEndPosition>(
        activitiesWithEndPosition[activitiesWithEndPosition.length - 1].getStat(DataEndPosition.type)
      );
      stats.push(new DataEndPosition(endPositionStat.getValue()));
    }
    // debugger;
    return stats;
  }

  public static getIntensityZonesStatsAggregated(statClassInstances: StatsClassInterface[]): DataInterface[] {
    return [
      DataHeartRateZoneOneDuration.type,
      DataHeartRateZoneTwoDuration.type,
      DataHeartRateZoneThreeDuration.type,
      DataHeartRateZoneFourDuration.type,
      DataHeartRateZoneFiveDuration.type,
      DataPowerZoneOneDuration.type,
      DataPowerZoneTwoDuration.type,
      DataPowerZoneThreeDuration.type,
      DataPowerZoneFourDuration.type,
      DataPowerZoneFiveDuration.type,
      DataSpeedZoneOneDuration.type,
      DataSpeedZoneTwoDuration.type,
      DataSpeedZoneThreeDuration.type,
      DataSpeedZoneFourDuration.type,
      DataSpeedZoneFiveDuration.type
    ].reduce((statsArray: DataInterface[], zone) => {
      const zoneDuration = statClassInstances.reduce((duration: number | null, statClassInstance) => {
        const durationStat = <DataDuration>statClassInstance.getStat(zone);
        if (durationStat) {
          duration = duration || 0;
          duration += durationStat.getValue();
        }
        return duration;
      }, null);

      if (isNumber(zoneDuration)) {
        statsArray.push(DynamicDataLoader.getDataInstanceFromDataType(zone, <number>zoneDuration));
      }
      return statsArray;
    }, []);
  }

  public static getActivityDataTypeGain(
    activity: ActivityInterface,
    streamType: string,
    starDate?: Date,
    endDate?: Date,
    minDiff?: number
  ): number {
    return this.getActivityDataTypeGainOrLoss(activity, streamType, true, starDate, endDate, minDiff);
  }

  public static getActivityDataTypeLoss(
    activity: ActivityInterface,
    streamType: string,
    starDate?: Date,
    endDate?: Date,
    minDiff?: number
  ): number {
    return this.getActivityDataTypeGainOrLoss(activity, streamType, false, starDate, endDate, minDiff);
  }

  public static getGainOrLoss(data: number[], gain: boolean, minDiff = 3) {
    let gainOrLoss = 0;
    data.reduce((previousValue: number, nextValue: number) => {
      // For gain
      if (gain) {
        // Increase the gain if eligible first check to be greater plus diff  [200, 300, 400, 100, 101, 102]
        if (previousValue + minDiff <= nextValue) {
          gainOrLoss += nextValue - previousValue;
          return nextValue;
        }
        // if not eligible check if smaller without the diff and if yes do not register it and send it back as the last to check against
        if (previousValue < nextValue) {
          return previousValue;
        }
        return nextValue;
      }

      // For Loss
      if (previousValue - minDiff >= nextValue) {
        gainOrLoss += previousValue - nextValue;
        return nextValue;
      }
      // if not eligible check if smaller without the diff and if yes do not register it and send it back as the last to check against
      if (previousValue > nextValue) {
        return previousValue;
      }
      return nextValue;
    });
    return gainOrLoss;
  }

  public static getMax(data: number[]): number {
    return data.reduce(function(previousValue, currentValue) {
      return Math.max(previousValue, currentValue);
    }, -Infinity);
  }

  public static getMin(data: number[]): number {
    return data.reduce(function(previousValue, currentValue) {
      return Math.min(previousValue, currentValue);
    }, Infinity);
  }

  public static calculateTotalDistanceForActivity(
    activity: ActivityInterface,
    startDate?: Date,
    endDate?: Date
  ): number {
    return this.geoLibAdapter.getDistance(
      <DataPositionInterface[]>activity.getPositionData(startDate, endDate).filter(position => position !== null)
    );
  }

  /**
   * Returns streams that derive from speed based on the activity type
   * @param speedStream
   * @param activityType
   */
  private static createByActivityTypeSpeedBasedStreams(
    speedStream: StreamInterface,
    activityType: ActivityTypes
  ): StreamInterface[] {
    return ActivityTypesHelper.speedDerivedDataTypesToUseForActivityType(activityType).reduce(
      (array: StreamInterface[], dataType) => {
        switch (dataType) {
          case DataPace.type:
            return array.concat([
              new Stream(
                DataPace.type,
                speedStream.getData().map(dataValue => {
                  if (!isNumber(dataValue)) {
                    return null;
                  }
                  return convertSpeedToPace(<number>dataValue);
                })
              )
            ]);
          case DataSwimPace.type:
            return array.concat([
              new Stream(
                DataSwimPace.type,
                speedStream.getData().map(dataValue => {
                  if (!isNumber(dataValue)) {
                    return null;
                  }
                  return convertSpeedToSwimPace(<number>dataValue);
                })
              )
            ]);
          case DataSpeed.type:
            return array.concat(speedStream);
          default:
            return array;
        }
      },
      []
    );
  }

  /**
   * Returns streams that derive from grade adjusted speed based on the activity type
   * @param gradeAdjustedSpeedStream
   * @param activityType
   */
  private static createByActivityTypeAltiDistanceSpeedBasedStreams(
    gradeAdjustedSpeedStream: StreamInterface,
    activityType: ActivityTypes
  ): StreamInterface[] {
    return ActivityTypesHelper.altiDistanceSpeedDerivedDataTypesToUseForActivityType(activityType).reduce(
      (array: StreamInterface[], dataType) => {
        switch (dataType) {
          case DataGradeAdjustedPace.type:
            return array.concat([
              new Stream(
                DataGradeAdjustedPace.type,
                gradeAdjustedSpeedStream.getData().map(dataValue => {
                  if (!isNumber(dataValue)) {
                    return null;
                  }
                  return convertSpeedToPace(<number>dataValue);
                })
              )
            ]);
          case DataGradeAdjustedSpeed.type:
            return array.concat(gradeAdjustedSpeedStream);
          default:
            return array;
        }
      },
      []
    );
  }

  /**
   * @todo unit test (get the pun?)
   * This creates streams that are deriving as unit based streams
   * For example it will create pace from speed, swim pace from speed but also speed in km/h as a unitstream
   * @param streams
   * @param activityType
   * @param unitStreamTypes DynamicDataLoader.allUnitDerivedDataTypes this acts like a whitelist for the unit derived units ONLY!
   */
  public static createUnitStreamsFromStreams(
    streams: StreamInterface[],
    activityType: ActivityTypes,
    unitStreamTypes?: string[]
  ): StreamInterface[] {
    // @todo perhaps check input to be unitStreamTypesStrictly
    const unitStreamTypesToCreate = unitStreamTypes || DynamicDataLoader.allUnitDerivedDataTypes;
    let baseUnitStreams: StreamInterface[] = [];
    const speedStream = streams.find(stream => stream.type === DataSpeed.type);
    if (speedStream) {
      baseUnitStreams = baseUnitStreams.concat(this.createByActivityTypeSpeedBasedStreams(speedStream, activityType));
    }
    const gradeAdjustedSpeedStream = streams.find(stream => stream.type === DataGradeAdjustedSpeed.type);
    if (gradeAdjustedSpeedStream) {
      baseUnitStreams = baseUnitStreams.concat(
        this.createByActivityTypeAltiDistanceSpeedBasedStreams(gradeAdjustedSpeedStream, activityType)
      );
    }
    const verticalSpeedStream = streams.find(stream => stream.type === DataVerticalSpeed.type);
    if (verticalSpeedStream) {
      // For vertical speed (yet) we dont need a seperate function so just add the base that is the "derived" one
      baseUnitStreams = ActivityTypesHelper.verticalSpeedDerivedDataTypesToUseForActivityType(activityType).length
        ? baseUnitStreams.concat(verticalSpeedStream)
        : baseUnitStreams;
    }
    // @todo add distance ?
    const startWith = baseUnitStreams.filter(
      baseUnitStream =>
        unitStreamTypesToCreate.indexOf(baseUnitStream.type) !== -1 && streams.indexOf(baseUnitStream) === -1
    );
    return Object.keys(DynamicDataLoader.dataTypeUnitGroups).reduce((array: StreamInterface[], baseDataType) => {
      const baseStream = baseUnitStreams.find(stream => stream.type === baseDataType);
      if (!baseStream) {
        return array;
      }
      const unitStreams = Object.keys(DynamicDataLoader.dataTypeUnitGroups[baseDataType])
        .filter(unitBasedDataType => unitStreamTypesToCreate.indexOf(unitBasedDataType) !== -1) // @todo perhaps dont filter
        .map(unitBasedDataType => {
          return new Stream(
            unitBasedDataType,
            baseStream.getData().map(dataValue => {
              if (!isNumber(dataValue)) {
                return null;
              }
              return DynamicDataLoader.dataTypeUnitGroups[baseDataType][unitBasedDataType](<number>dataValue);
            })
          );
        });
      return array.concat(unitStreams);
    }, startWith);
  }

  /**
   * Generates missing streams for an activity such as distance etc if they are missing
   * This will always create a steam even if the distance is 0
   * @param activity
   */
  public static generateMissingStreamsForActivity(activity: ActivityInterface): ActivityInterface {
    // First add any missing data to the streams via interpolating and extrapolating
    this.addMissingDataToStreams(activity);
    if (
      activity.hasStreamData(DataLatitudeDegrees.type) &&
      activity.hasStreamData(DataLatitudeDegrees.type) &&
      (!activity.hasStreamData(DataDistance.type) || !activity.hasStreamData(DataGNSSDistance.type))
    ) {
      const streamData = activity.createStream(DataDistance.type).getData(); // Creating does not add it to activity just presets the resolution to 1s
      let distance = 0;
      streamData[0] = distance; // Force first distance sample to be equal to 0 instead of null
      activity
        .getPositionData()
        .reduce((prevPosition: DataPositionInterface | null, position: DataPositionInterface | null, index: number) => {
          if (!position) {
            return prevPosition;
          }
          if (prevPosition && position) {
            distance += this.round(this.geoLibAdapter.getDistance([prevPosition, position]), 2);
          }
          streamData[index] = distance;
          return position;
        });

      if (!activity.hasStreamData(DataDistance.type)) {
        activity.addStream(new Stream(DataDistance.type, streamData));
      }

      if (!activity.hasStreamData(DataGNSSDistance.type)) {
        activity.addStream(new Stream(DataGNSSDistance.type, streamData));
      }

      if (!activity.hasStreamData(DataSpeed.type)) {
        const speedStreamData = activity.createStream(DataSpeed.type).getData();
        const distanceStream = activity.getStreamDataByDuration(DataDistance.type);
        let previousDistanceItem: StreamDataItem;
        distanceStream.forEach((distanceItem: StreamDataItem, index: number) => {
          // Use the first distance item value if previous distance is unknown
          if (!previousDistanceItem) {
            previousDistanceItem = distanceItem;
          }

          // If know distance then compute speed from last known distance item
          if (Number.isFinite(distanceItem.value)) {
            const deltaTime = (distanceItem.time - previousDistanceItem.time) / 1000;
            const deltaDistance = distanceItem?.value ? distanceItem.value - (previousDistanceItem?.value || 0) : 0;

            speedStreamData[index] = this.round(deltaTime > 0 ? deltaDistance / deltaTime : 0, 3);

            // Keep tracking of last know distance item
            previousDistanceItem = distanceItem;
          } else {
            speedStreamData[index] = null;
          }
        });
        activity.addStream(new Stream(DataSpeed.type, speedStreamData));
      }
    }

    // Check if we can get a grade stream
    if (
      !activity.hasStreamData(DataGrade.type) &&
      activity.hasStreamData(DataDistance.type) &&
      activity.hasStreamData(DataAltitude.type)
    ) {
      const distanceData = activity.getStreamData(DataDistance.type);
      const altitudeData = activity.getStreamData(DataAltitude.type);
      const gradeStreamData = GradeCalculator.computeGradeStream(distanceData, altitudeData);
      activity.addStream(new Stream(DataGrade.type, gradeStreamData));
    }

    // Get a grade adjusted speed (the model applies to running only)
    if (
      (ActivityTypesHelper.getActivityGroupForActivityType(activity.type) === ActivityTypeGroups.Running ||
        ActivityTypesHelper.getActivityGroupForActivityType(activity.type) === ActivityTypeGroups.TrailRunning) &&
      !activity.hasStreamData(DataGradeAdjustedSpeed.type) &&
      activity.hasStreamData(DataGrade.type) &&
      activity.hasStreamData(DataSpeed.type)
    ) {
      const speedStreamData = activity.getStreamData(DataSpeed.type);
      const gradeStreamData = activity.getStreamData(DataGrade.type);
      const gradeAdjustedSpeedData = speedStreamData.map((value, index) =>
        value === null ? null : this.round(GradeCalculator.estimateAdjustedSpeed(value, gradeStreamData[index] || 0), 2)
      );
      activity.addStream(new Stream(DataGradeAdjustedSpeed.type, gradeAdjustedSpeedData));
    }

    if (
      activity.hasStreamData(DataPower.type) &&
      activity.hasStreamData(DataRightBalance.type) &&
      !activity.hasStreamData(DataPowerRight.type)
    ) {
      const rightPowerStream = activity.createStream(DataPowerRight.type);
      const powerStreamData = activity.getStreamData(DataPower.type);
      const rightBalanceStreamData = activity.getStreamData(DataRightBalance.type);
      rightPowerStream.setData(
        rightBalanceStreamData.reduce((accu: (number | null)[], streamData, index) => {
          const powerStreamDataItem = powerStreamData[index];
          if (streamData === null || !powerStreamData || powerStreamDataItem === null) {
            return accu;
          }
          accu[index] = (streamData / 100) * powerStreamDataItem;
          return accu;
        }, [])
      );
      activity.addStream(rightPowerStream);
    }

    if (
      activity.hasStreamData(DataPower.type) &&
      activity.hasStreamData(DataLeftBalance.type) &&
      !activity.hasStreamData(DataPowerLeft.type)
    ) {
      const leftPowerStream = activity.createStream(DataPowerLeft.type);
      const powerStreamData = activity.getStreamData(DataPower.type);
      const leftBalanceStreamData = activity.getStreamData(DataLeftBalance.type);
      leftPowerStream.setData(
        leftBalanceStreamData.reduce((accu: (number | null)[], streamData, index) => {
          const powerStreamDataItem = powerStreamData[index];
          if (streamData === null || !powerStreamData || powerStreamDataItem === null) {
            return accu;
          }
          accu[index] = (streamData / 100) * powerStreamDataItem;
          return accu;
        }, [])
      );
      activity.addStream(leftPowerStream);
    }
    return activity;
  }

  /**
   * Back and forth fills an activity's stream data so they can be more "tree" like
   * It does this for:
   *
   *  [DataAltitude.type,
   * DataHeartRate.type,
   * DataCadence.type,
   * DataDistance.type]
   *
   * Example
   *
   * Distance[0, 10, 30, 40, 50,null,60] #null here is legit eg missing record
   * Altitude[100, 101, null, 103, null, null, 106]
   * Should be
   * Altitude[100,101,101,103,103,103,106]
   *
   * @param activity
   */
  private static addMissingDataToStreams(activity: ActivityInterface) {
    /**
     * This tries to align data with Strava.
     * Strava fills HR alti cadence with the last value.
     * For Power and temperature it doesn't but keeps nulls.
     * However, if you keep nulls for paused portions then strava doens't give back null
     * that typically indicates a sensor disconnect I suppose.
     */
    const streamTypesToBackAndForthFill = [
      DataAltitude.type,
      DataHeartRate.type,
      DataCadence.type,
      DataDistance.type
      // DataSpeed.type, @todo should we be backfilling speed?
    ];
    // First generate the time stream
    const timeStream = activity.generateTimeStream();
    /**
     * We do a second pass here and we add missing data on crossing time indexes
     * for example:
     * Time[0,1,2,3,4,5,7]
     * Distance[0, 10, 30, 40, 50,null,60] #null here is legit eg missing record
     * Altitude[100, 101, null, 103, null, null, 106]
     * Should be
     * Altitude[100,101,101,103,103,103,106]
     */
    activity
      .getAllStreams()
      .filter(stream => streamTypesToBackAndForthFill.indexOf(stream.type) !== -1)
      .forEach(stream => {
        // Find the first sample value
        let currentValue = <number>stream.getData(true, true)[0];
        // The time stream will always have more length than each stream when not back/forthfilled
        const timeStreamData = <number[]>timeStream.getData();
        stream.setData(
          timeStreamData.reduce((data: (number | null)[], time, timeIndex) => {
            // If there is no timeslot put whatever was
            if (!isNumber(time)) {
              data.push(stream.getData()[timeIndex]);
              return data;
            }

            // We have a time slot here on ...  (for the first run, old is the very first next)

            // If it's a number set the current , else leave it to old to forth fill
            if (isNumber(stream.getData()[time])) {
              currentValue = <number>stream.getData()[time];
            }
            // Fill the current or old...
            data.push(currentValue);
            return data;
          }, [])
        );
      });
    /**
     * @todo
     * Linear fill distance where:
     * a) There is not distance but it's not paused
     * b) There is no corespoding lat/long but there is distace (aka distance = not trusted)
     * About B I am not sure. That is because if there is for example an internal accelerometer
     * that reports better this can help with pace and other things. Even for GAP
     */
  }

  private static getActivityDataTypeGainOrLoss(
    activity: ActivityInterface,
    streamType: string,
    gain: boolean,
    startDate?: Date,
    endDate?: Date,
    minDiff?: number
  ): number {
    return this.getGainOrLoss(activity.getSquashedStreamData(streamType, startDate, endDate), gain, minDiff);
  }

  private static getActivityDataTypeMinOrMax(
    activity: ActivityInterface,
    streamType: string,
    max: boolean,
    startDate?: Date,
    endDate?: Date,
    filterOver?: number
  ): number {
    const data = activity
      .getSquashedStreamData(streamType, startDate, endDate)
      .filter(
        streamData =>
          streamData !== Infinity &&
          streamData !== -Infinity &&
          (Number.isFinite(filterOver) ? streamData > <number>filterOver : true)
      );
    if (max) {
      return this.getMax(data);
    }
    return this.getMin(data);
  }

  /**
   * Generates the stats for an activity
   * @todo move to factory with next version
   * @param activity
   */
  private static generateMissingStatsForActivity(activity: ActivityInterface) {
    // If there is no distance or distance for some reason is 0
    const activityDistanceStat = activity.getStat(DataDistance.type);
    if (!activityDistanceStat || activityDistanceStat.getValue() === 0) {
      let distance = 0;
      if (activity.hasStreamData(DataDistance.type)) {
        const distanceData = activity.getSquashedStreamData(DataDistance.type);
        distance = distanceData[distanceData.length - 1] - distanceData[0] || 0;
      } else if (
        activity.hasStreamData(DataLongitudeDegrees.type) &&
        activity.hasStreamData(DataLatitudeDegrees.type)
      ) {
        distance = this.calculateTotalDistanceForActivity(activity, activity.startDate, activity.endDate);
      }
      activity.addStat(new DataDistance(distance));
    }

    if (!activity.getStat(DataGNSSDistance.type) && activity.hasStreamData(DataGNSSDistance.type)) {
      activity.addStat(
        new DataGNSSDistance(
          activity.getSquashedStreamData(DataGNSSDistance.type)[
          activity.getSquashedStreamData(DataGNSSDistance.type).length - 1
            ]
        )
      );
    }

    // Ascent (altitude gain)
    if (!activity.getStat(DataAscent.type) && activity.hasStreamData(DataAltitude.type)) {
      activity.addStat(new DataAscent(this.getActivityDataTypeGain(activity, DataAltitude.type)));
    }
    // Descent (altitude loss)
    if (!activity.getStat(DataDescent.type) && activity.hasStreamData(DataAltitude.type)) {
      activity.addStat(new DataDescent(this.getActivityDataTypeLoss(activity, DataAltitude.type)));
    }
    // Altitude Max
    if (!activity.getStat(DataAltitudeMax.type) && activity.hasStreamData(DataAltitude.type)) {
      activity.addStat(new DataAltitudeMax(this.getDataTypeMax(activity, DataAltitude.type)));
    }
    // Altitude Min
    if (!activity.getStat(DataAltitudeMin.type) && activity.hasStreamData(DataAltitude.type)) {
      activity.addStat(new DataAltitudeMin(this.getDataTypeMin(activity, DataAltitude.type)));
    }
    // Altitude Avg
    if (!activity.getStat(DataAltitudeAvg.type) && activity.hasStreamData(DataAltitude.type)) {
      activity.addStat(new DataAltitudeAvg(this.getDataTypeAvg(activity, DataAltitude.type)));
    }

    // Altitude start
    if (!activity.getStat(DataStartAltitude.type) && activity.hasStreamData(DataAltitude.type)) {
      activity.addStat(new DataStartAltitude(this.getDataTypeFirst(activity, DataAltitude.type)));
    }

    // Altitude end
    if (!activity.getStat(DataEndAltitude.type) && activity.hasStreamData(DataAltitude.type)) {
      activity.addStat(new DataEndAltitude(this.getDataTypeLast(activity, DataAltitude.type)));
    }

    // Heart Rate  Max
    if (!activity.getStat(DataHeartRateMax.type) && activity.hasStreamData(DataHeartRate.type)) {
      activity.addStat(new DataHeartRateMax(this.getDataTypeMax(activity, DataHeartRate.type)));
    }
    // Heart Rate Min
    if (!activity.getStat(DataHeartRateMin.type) && activity.hasStreamData(DataHeartRate.type)) {
      activity.addStat(new DataHeartRateMin(this.getDataTypeMin(activity, DataHeartRate.type)));
    }
    // Heart Rate Avg
    if (!activity.getStat(DataHeartRateAvg.type) && activity.hasStreamData(DataHeartRate.type)) {
      activity.addStat(new DataHeartRateAvg(this.round(this.getDataTypeAvg(activity, DataHeartRate.type))));
    }
    // Cadence Max
    if (!activity.getStat(DataCadenceMax.type) && activity.hasStreamData(DataCadence.type)) {
      activity.addStat(new DataCadenceMax(this.getDataTypeMax(activity, DataCadence.type)));
    }
    // Cadence Min
    if (!activity.getStat(DataCadenceMin.type) && activity.hasStreamData(DataCadence.type)) {
      // Get min cadence except 0. A 0 cadence is not meaningful.
      const minCadenceOver = 0;
      activity.addStat(
        new DataCadenceMin(this.getDataTypeMin(activity, DataCadence.type, undefined, undefined, minCadenceOver))
      );
    }
    // Cadence Avg
    if (!activity.getStat(DataCadenceAvg.type) && activity.hasStreamData(DataCadence.type)) {
      // Get avg cadence except 0 values. Platforms like garmin/strava don't include 0 cadences in their averages.
      const avgCadenceOver = 0;
      const avgCadence = this.getDataTypeAvg(activity, DataCadence.type, undefined, undefined, avgCadenceOver);
      activity.addStat(new DataCadenceAvg(this.round(avgCadence)));
    }

    // Speed Max
    if (!activity.getStat(DataSpeedMax.type) && activity.hasStreamData(DataSpeed.type)) {
      activity.addStat(new DataSpeedMax(this.getDataTypeMax(activity, DataSpeed.type)));
    }
    // Speed Min
    if (!activity.getStat(DataSpeedMin.type) && activity.hasStreamData(DataSpeed.type)) {
      activity.addStat(new DataSpeedMin(this.getDataTypeMin(activity, DataSpeed.type)));
    }
    // Speed Avg
    if (!activity.getStat(DataSpeedAvg.type) && activity.hasStreamData(DataSpeed.type)) {
      activity.addStat(new DataSpeedAvg(this.getDataTypeAvg(activity, DataSpeed.type)));
    }

    // Grade Adjusted Speed Max
    if (!activity.getStat(DataGradeAdjustedSpeedMax.type) && activity.hasStreamData(DataGradeAdjustedSpeed.type)) {
      activity.addStat(new DataGradeAdjustedSpeedMax(this.getDataTypeMax(activity, DataGradeAdjustedSpeed.type)));
    }
    // Grade Adjusted Speed Min
    if (!activity.getStat(DataGradeAdjustedSpeedMin.type) && activity.hasStreamData(DataGradeAdjustedSpeed.type)) {
      activity.addStat(new DataGradeAdjustedSpeedMin(this.getDataTypeMin(activity, DataGradeAdjustedSpeed.type)));
    }
    // Grade Adjusted Speed Avg
    if (!activity.getStat(DataGradeAdjustedSpeedAvg.type) && activity.hasStreamData(DataGradeAdjustedSpeed.type)) {
      activity.addStat(new DataGradeAdjustedSpeedAvg(this.getDataTypeAvg(activity, DataGradeAdjustedSpeed.type)));
    }

    // Vertical Speed Max
    if (!activity.getStat(DataVerticalSpeedMax.type) && activity.hasStreamData(DataVerticalSpeed.type)) {
      activity.addStat(new DataVerticalSpeedMax(this.getDataTypeMax(activity, DataVerticalSpeed.type)));
    }
    // Vertical Speed Min
    if (!activity.getStat(DataVerticalSpeedMin.type) && activity.hasStreamData(DataVerticalSpeed.type)) {
      activity.addStat(new DataVerticalSpeedMin(this.getDataTypeMin(activity, DataVerticalSpeed.type)));
    }
    // Vertical Speed Avg
    if (!activity.getStat(DataVerticalSpeedAvg.type) && activity.hasStreamData(DataVerticalSpeed.type)) {
      activity.addStat(new DataVerticalSpeedAvg(this.getDataTypeAvg(activity, DataVerticalSpeed.type)));
    }
    // Power Max
    if (!activity.getStat(DataPowerMax.type) && activity.hasStreamData(DataPower.type)) {
      activity.addStat(new DataPowerMax(this.getDataTypeMax(activity, DataPower.type)));
    }
    // Power Min
    if (!activity.getStat(DataPowerMin.type) && activity.hasStreamData(DataPower.type)) {
      activity.addStat(new DataPowerMin(this.getDataTypeMin(activity, DataPower.type)));
    }
    // Power AVG
    if (!activity.getStat(DataPowerAvg.type) && activity.hasStreamData(DataPower.type)) {
      activity.addStat(new DataPowerAvg(this.getDataTypeAvg(activity, DataPower.type)));
    }

    // Air AirPower Max
    if (!activity.getStat(DataAirPowerMax.type) && activity.hasStreamData(DataAirPower.type)) {
      activity.addStat(new DataAirPowerMax(this.getDataTypeMax(activity, DataAirPower.type)));
    }
    // Air AirPower Min
    if (!activity.getStat(DataAirPowerMin.type) && activity.hasStreamData(DataAirPower.type)) {
      activity.addStat(new DataAirPowerMin(this.getDataTypeMin(activity, DataAirPower.type)));
    }
    // Air AirPower AVG
    if (!activity.getStat(DataAirPowerAvg.type) && activity.hasStreamData(DataAirPower.type)) {
      activity.addStat(new DataAirPowerAvg(this.getDataTypeAvg(activity, DataAirPower.type)));
    }

    // Temperature Max
    if (!activity.getStat(DataTemperatureMax.type) && activity.hasStreamData(DataTemperature.type)) {
      activity.addStat(new DataTemperatureMax(this.getDataTypeMax(activity, DataTemperature.type)));
    }
    // Temperature Min
    if (!activity.getStat(DataTemperatureMin.type) && activity.hasStreamData(DataTemperature.type)) {
      activity.addStat(new DataTemperatureMin(this.getDataTypeMin(activity, DataTemperature.type)));
    }
    // Temperature Avg
    if (!activity.getStat(DataTemperatureAvg.type) && activity.hasStreamData(DataTemperature.type)) {
      activity.addStat(new DataTemperatureAvg(this.getDataTypeAvg(activity, DataTemperature.type)));
    }

    // Battery Consumption Avg
    if (!activity.getStat(DataBatteryConsumption.type) && activity.hasStreamData(DataBatteryCharge.type)) {
      activity.addStat(
        new DataBatteryConsumption(this.getDataTypeMinToMaxDifference(activity, DataBatteryCharge.type))
      );
    }

    // Battery Life Estimation based on Consumption
    if (!activity.getStat(DataBatteryLifeEstimation.type)) {
      const consumption = activity.getStat(DataBatteryConsumption.type);
      if (consumption && consumption.getValue()) {
        activity.addStat(
          new DataBatteryLifeEstimation(
            Number(((+activity.endDate - +activity.startDate) / 1000) * 100) / Number(consumption.getValue())
          )
        );
      }
    }

    // Start and end position
    if (
      (!activity.getStat(DataStartPosition.type) || !activity.getStat(DataEndPosition.type)) &&
      activity.hasPositionData()
    ) {
      const activityPositionData = activity.getPositionData().filter(data => data !== null);
      const startPosition = activityPositionData[0];
      const endPosition = activityPositionData[activityPositionData.length - 1];
      if (startPosition && !activity.getStat(DataStartPosition.type)) {
        activity.addStat(new DataStartPosition(startPosition));
      }
      if (endPosition && !activity.getStat(DataEndPosition.type)) {
        activity.addStat(new DataEndPosition(endPosition));
      }
    }
  }

  private static generateMissingSpeedDerivedStatsForActivity(activity: ActivityInterface) {
    // Pace
    const speedMax = activity.getStat(DataSpeedMax.type);
    if (speedMax && !activity.getStat(DataPaceMax.type)) {
      activity.addStat(new DataPaceMax(convertSpeedToPace(<number>speedMax.getValue())));
    }
    const speedMin = activity.getStat(DataSpeedMin.type);
    if (speedMin && !activity.getStat(DataPaceMin.type)) {
      activity.addStat(new DataPaceMin(convertSpeedToPace(<number>speedMin.getValue())));
    }
    const speedAvg = activity.getStat(DataSpeedAvg.type);
    if (speedAvg && !activity.getStat(DataPaceAvg.type)) {
      activity.addStat(new DataPaceAvg(convertSpeedToPace(<number>speedAvg.getValue())));
    }
    // GAP
    const gradeAdjustedSpeedMax = activity.getStat(DataGradeAdjustedSpeedMax.type);
    if (gradeAdjustedSpeedMax && !activity.getStat(DataGradeAdjustedPaceMax.type)) {
      activity.addStat(new DataGradeAdjustedPaceMax(convertSpeedToPace(<number>gradeAdjustedSpeedMax.getValue())));
    }
    const gradeAdjustedSpeedMin = activity.getStat(DataGradeAdjustedSpeedMin.type);
    if (gradeAdjustedSpeedMin && !activity.getStat(DataGradeAdjustedPaceMin.type)) {
      activity.addStat(new DataGradeAdjustedPaceMin(convertSpeedToPace(<number>gradeAdjustedSpeedMin.getValue())));
    }
    const gradeAdjustedSpeedAvg = activity.getStat(DataGradeAdjustedSpeedAvg.type);
    if (gradeAdjustedSpeedAvg && !activity.getStat(DataGradeAdjustedPaceAvg.type)) {
      activity.addStat(new DataGradeAdjustedPaceAvg(convertSpeedToPace(<number>gradeAdjustedSpeedAvg.getValue())));
    }
    // Swim Pace
    if (speedMax && !activity.getStat(DataSwimPaceMax.type)) {
      activity.addStat(new DataSwimPaceMax(convertSpeedToSwimPace(<number>speedMax.getValue())));
    }
    if (speedMin && !activity.getStat(DataSwimPaceMin.type)) {
      activity.addStat(new DataSwimPaceMin(convertSpeedToSwimPace(<number>speedMin.getValue())));
    }
    if (speedAvg && !activity.getStat(DataSwimPaceAvg.type)) {
      activity.addStat(new DataSwimPaceAvg(convertSpeedToSwimPace(<number>speedAvg.getValue())));
    }
  }

  // @todo move to factory
  private static generateMissingUnitStatsForActivity(activity: ActivityInterface) {
    // Pace
    if (!activity.getStat(DataPaceMaxMinutesPerMile.type)) {
      const paceMax = activity.getStat(DataPaceMax.type);
      if (paceMax) {
        activity.addStat(new DataPaceMaxMinutesPerMile(convertPaceToPaceInMinutesPerMile(<number>paceMax.getValue())));
      }
    }
    if (!activity.getStat(DataPaceMinMinutesPerMile.type)) {
      const paceMin = activity.getStat(DataPaceMin.type);
      if (paceMin) {
        activity.addStat(new DataPaceMinMinutesPerMile(convertPaceToPaceInMinutesPerMile(<number>paceMin.getValue())));
      }
    }
    if (!activity.getStat(DataPaceAvgMinutesPerMile.type)) {
      const paceAvg = activity.getStat(DataPaceAvg.type);
      if (paceAvg) {
        activity.addStat(new DataPaceAvgMinutesPerMile(convertPaceToPaceInMinutesPerMile(<number>paceAvg.getValue())));
      }
    }
    // Grade Adjusted Pace
    if (!activity.getStat(DataGradeAdjustedPaceMaxMinutesPerMile.type)) {
      const gradeAdjustedPaceMax = activity.getStat(DataGradeAdjustedPaceMax.type);
      if (gradeAdjustedPaceMax) {
        activity.addStat(
          new DataGradeAdjustedPaceMaxMinutesPerMile(
            convertPaceToPaceInMinutesPerMile(<number>gradeAdjustedPaceMax.getValue())
          )
        );
      }
    }
    if (!activity.getStat(DataGradeAdjustedPaceMinMinutesPerMile.type)) {
      const gradeAdjustedPaceMin = activity.getStat(DataGradeAdjustedPaceMin.type);
      if (gradeAdjustedPaceMin) {
        activity.addStat(
          new DataGradeAdjustedPaceMinMinutesPerMile(
            convertPaceToPaceInMinutesPerMile(<number>gradeAdjustedPaceMin.getValue())
          )
        );
      }
    }
    if (!activity.getStat(DataGradeAdjustedPaceAvgMinutesPerMile.type)) {
      const gradeAdjustedPaceAvg = activity.getStat(DataGradeAdjustedPaceAvg.type);
      if (gradeAdjustedPaceAvg) {
        activity.addStat(
          new DataGradeAdjustedPaceAvgMinutesPerMile(
            convertPaceToPaceInMinutesPerMile(<number>gradeAdjustedPaceAvg.getValue())
          )
        );
      }
    }
    // Swim Pace
    if (!activity.getStat(DataSwimPaceMaxMinutesPer100Yard.type)) {
      const swimPaceMax = activity.getStat(DataSwimPaceMax.type);
      if (swimPaceMax) {
        activity.addStat(
          new DataSwimPaceMaxMinutesPer100Yard(convertSwimPaceToSwimPacePer100Yard(<number>swimPaceMax.getValue()))
        );
      }
    }
    if (!activity.getStat(DataSwimPaceMinMinutesPer100Yard.type)) {
      const swimPaceMin = activity.getStat(DataSwimPaceMin.type);
      if (swimPaceMin) {
        activity.addStat(
          new DataSwimPaceMinMinutesPer100Yard(convertSwimPaceToSwimPacePer100Yard(<number>swimPaceMin.getValue()))
        );
      }
    }
    if (!activity.getStat(DataSwimPaceAvgMinutesPer100Yard.type)) {
      const swimPaceAvg = activity.getStat(DataPaceAvg.type);
      if (swimPaceAvg) {
        activity.addStat(
          new DataSwimPaceAvgMinutesPer100Yard(convertSwimPaceToSwimPacePer100Yard(<number>swimPaceAvg.getValue()))
        );
      }
    }

    // Speed
    if (!activity.getStat(DataSpeedMaxKilometersPerHour.type)) {
      const speedMax = activity.getStat(DataSpeedMax.type);
      if (speedMax) {
        activity.addStat(
          new DataSpeedMaxKilometersPerHour(convertSpeedToSpeedInKilometersPerHour(<number>speedMax.getValue()))
        );
      }
    }
    if (!activity.getStat(DataSpeedMaxMilesPerHour.type)) {
      const speedMax = activity.getStat(DataSpeedMax.type);
      if (speedMax) {
        activity.addStat(new DataSpeedMaxMilesPerHour(convertSpeedToSpeedInMilesPerHour(<number>speedMax.getValue())));
      }
    }
    if (!activity.getStat(DataSpeedMaxFeetPerSecond.type)) {
      const speedMax = activity.getStat(DataSpeedMax.type);
      if (speedMax) {
        activity.addStat(
          new DataSpeedMaxFeetPerSecond(convertSpeedToSpeedInFeetPerSecond(<number>speedMax.getValue()))
        );
      }
    }
    if (!activity.getStat(DataSpeedMaxFeetPerMinute.type)) {
      const speedMax = activity.getStat(DataSpeedMax.type);
      if (speedMax) {
        activity.addStat(
          new DataSpeedMaxFeetPerMinute(convertSpeedToSpeedInFeetPerMinute(<number>speedMax.getValue()))
        );
      }
    }
    if (!activity.getStat(DataSpeedMaxMetersPerMinute.type)) {
      const speedMax = activity.getStat(DataSpeedMax.type);
      if (speedMax) {
        activity.addStat(
          new DataSpeedMaxMetersPerMinute(convertSpeedToSpeedInMetersPerMinute(<number>speedMax.getValue()))
        );
      }
    }
    if (!activity.getStat(DataSpeedMaxKnots.type)) {
      const speedMax = activity.getStat(DataSpeedMax.type);
      if (speedMax) {
        activity.addStat(new DataSpeedMaxKnots(convertSpeedToSpeedInKnots(<number>speedMax.getValue())));
      }
    }
    if (!activity.getStat(DataSpeedMinKilometersPerHour.type)) {
      const speedMin = activity.getStat(DataSpeedMin.type);
      if (speedMin) {
        activity.addStat(
          new DataSpeedMinKilometersPerHour(convertSpeedToSpeedInKilometersPerHour(<number>speedMin.getValue()))
        );
      }
    }
    if (!activity.getStat(DataSpeedMinMilesPerHour.type)) {
      const speedMin = activity.getStat(DataSpeedMin.type);
      if (speedMin) {
        activity.addStat(new DataSpeedMinMilesPerHour(convertSpeedToSpeedInMilesPerHour(<number>speedMin.getValue())));
      }
    }
    if (!activity.getStat(DataSpeedMinFeetPerSecond.type)) {
      const speedMin = activity.getStat(DataSpeedMin.type);
      if (speedMin) {
        activity.addStat(
          new DataSpeedMinFeetPerSecond(convertSpeedToSpeedInFeetPerSecond(<number>speedMin.getValue()))
        );
      }
    }
    if (!activity.getStat(DataSpeedMinFeetPerMinute.type)) {
      const speedMin = activity.getStat(DataSpeedMin.type);
      if (speedMin) {
        activity.addStat(
          new DataSpeedMinFeetPerMinute(convertSpeedToSpeedInFeetPerMinute(<number>speedMin.getValue()))
        );
      }
    }
    if (!activity.getStat(DataSpeedMinMetersPerMinute.type)) {
      const speedMin = activity.getStat(DataSpeedMin.type);
      if (speedMin) {
        activity.addStat(
          new DataSpeedMinMetersPerMinute(convertSpeedToSpeedInMetersPerMinute(<number>speedMin.getValue()))
        );
      }
    }
    if (!activity.getStat(DataSpeedMinKnots.type)) {
      const speedMin = activity.getStat(DataSpeedMin.type);
      if (speedMin) {
        activity.addStat(new DataSpeedMinKnots(convertSpeedToSpeedInKnots(<number>speedMin.getValue())));
      }
    }
    if (!activity.getStat(DataSpeedAvgKilometersPerHour.type)) {
      const speedAvg = activity.getStat(DataSpeedAvg.type);
      if (speedAvg) {
        activity.addStat(
          new DataSpeedAvgKilometersPerHour(convertSpeedToSpeedInKilometersPerHour(<number>speedAvg.getValue()))
        );
      }
    }
    if (!activity.getStat(DataSpeedAvgMilesPerHour.type)) {
      const speedAvg = activity.getStat(DataSpeedAvg.type);
      if (speedAvg) {
        activity.addStat(new DataSpeedAvgMilesPerHour(convertSpeedToSpeedInMilesPerHour(<number>speedAvg.getValue())));
      }
    }
    if (!activity.getStat(DataSpeedAvgFeetPerSecond.type)) {
      const speedAvg = activity.getStat(DataSpeedAvg.type);
      if (speedAvg) {
        activity.addStat(
          new DataSpeedAvgFeetPerSecond(convertSpeedToSpeedInFeetPerSecond(<number>speedAvg.getValue()))
        );
      }
    }
    if (!activity.getStat(DataSpeedAvgFeetPerMinute.type)) {
      const speedAvg = activity.getStat(DataSpeedAvg.type);
      if (speedAvg) {
        activity.addStat(
          new DataSpeedAvgFeetPerMinute(convertSpeedToSpeedInFeetPerMinute(<number>speedAvg.getValue()))
        );
      }
    }
    if (!activity.getStat(DataSpeedAvgMetersPerMinute.type)) {
      const speedAvg = activity.getStat(DataSpeedAvg.type);
      if (speedAvg) {
        activity.addStat(
          new DataSpeedAvgMetersPerMinute(convertSpeedToSpeedInMetersPerMinute(<number>speedAvg.getValue()))
        );
      }
    }
    if (!activity.getStat(DataSpeedAvgKnots.type)) {
      const speedAvg = activity.getStat(DataSpeedAvg.type);
      if (speedAvg) {
        activity.addStat(new DataSpeedAvgKnots(convertSpeedToSpeedInKnots(<number>speedAvg.getValue())));
      }
    }

    // Grade Adjusted Speed
    if (!activity.getStat(DataGradeAdjustedSpeedMaxKilometersPerHour.type)) {
      const speedMax = activity.getStat(DataGradeAdjustedSpeedMax.type);
      if (speedMax) {
        activity.addStat(
          new DataGradeAdjustedSpeedMaxKilometersPerHour(
            convertSpeedToSpeedInKilometersPerHour(<number>speedMax.getValue())
          )
        );
      }
    }
    if (!activity.getStat(DataGradeAdjustedSpeedMaxMilesPerHour.type)) {
      const speedMax = activity.getStat(DataGradeAdjustedSpeedMax.type);
      if (speedMax) {
        activity.addStat(
          new DataGradeAdjustedSpeedMaxMilesPerHour(convertSpeedToSpeedInMilesPerHour(<number>speedMax.getValue()))
        );
      }
    }
    if (!activity.getStat(DataGradeAdjustedSpeedMaxFeetPerSecond.type)) {
      const speedMax = activity.getStat(DataGradeAdjustedSpeedMax.type);
      if (speedMax) {
        activity.addStat(
          new DataGradeAdjustedSpeedMaxFeetPerSecond(convertSpeedToSpeedInFeetPerSecond(<number>speedMax.getValue()))
        );
      }
    }
    if (!activity.getStat(DataGradeAdjustedSpeedMaxFeetPerMinute.type)) {
      const speedMax = activity.getStat(DataGradeAdjustedSpeedMax.type);
      if (speedMax) {
        activity.addStat(
          new DataGradeAdjustedSpeedMaxFeetPerMinute(convertSpeedToSpeedInFeetPerMinute(<number>speedMax.getValue()))
        );
      }
    }
    if (!activity.getStat(DataGradeAdjustedSpeedMaxMetersPerMinute.type)) {
      const speedMax = activity.getStat(DataGradeAdjustedSpeedMax.type);
      if (speedMax) {
        activity.addStat(
          new DataGradeAdjustedSpeedMaxMetersPerMinute(
            convertSpeedToSpeedInMetersPerMinute(<number>speedMax.getValue())
          )
        );
      }
    }
    if (!activity.getStat(DataGradeAdjustedSpeedMaxKnots.type)) {
      const speedMax = activity.getStat(DataGradeAdjustedSpeedMax.type);
      if (speedMax) {
        activity.addStat(new DataGradeAdjustedSpeedMaxKnots(convertSpeedToSpeedInKnots(<number>speedMax.getValue())));
      }
    }
    if (!activity.getStat(DataGradeAdjustedSpeedMinKilometersPerHour.type)) {
      const speedMin = activity.getStat(DataGradeAdjustedSpeedMin.type);
      if (speedMin) {
        activity.addStat(
          new DataGradeAdjustedSpeedMinKilometersPerHour(
            convertSpeedToSpeedInKilometersPerHour(<number>speedMin.getValue())
          )
        );
      }
    }
    if (!activity.getStat(DataGradeAdjustedSpeedMinMilesPerHour.type)) {
      const speedMin = activity.getStat(DataGradeAdjustedSpeedMin.type);
      if (speedMin) {
        activity.addStat(
          new DataGradeAdjustedSpeedMinMilesPerHour(convertSpeedToSpeedInMilesPerHour(<number>speedMin.getValue()))
        );
      }
    }
    if (!activity.getStat(DataGradeAdjustedSpeedMinFeetPerSecond.type)) {
      const speedMin = activity.getStat(DataGradeAdjustedSpeedMin.type);
      if (speedMin) {
        activity.addStat(
          new DataGradeAdjustedSpeedMinFeetPerSecond(convertSpeedToSpeedInFeetPerSecond(<number>speedMin.getValue()))
        );
      }
    }
    if (!activity.getStat(DataGradeAdjustedSpeedMinFeetPerMinute.type)) {
      const speedMin = activity.getStat(DataGradeAdjustedSpeedMin.type);
      if (speedMin) {
        activity.addStat(
          new DataGradeAdjustedSpeedMinFeetPerMinute(convertSpeedToSpeedInFeetPerMinute(<number>speedMin.getValue()))
        );
      }
    }
    if (!activity.getStat(DataGradeAdjustedSpeedMinMetersPerMinute.type)) {
      const speedMin = activity.getStat(DataGradeAdjustedSpeedMin.type);
      if (speedMin) {
        activity.addStat(
          new DataGradeAdjustedSpeedMinMetersPerMinute(
            convertSpeedToSpeedInMetersPerMinute(<number>speedMin.getValue())
          )
        );
      }
    }
    if (!activity.getStat(DataGradeAdjustedSpeedMinKnots.type)) {
      const speedMin = activity.getStat(DataGradeAdjustedSpeedMin.type);
      if (speedMin) {
        activity.addStat(new DataGradeAdjustedSpeedMinKnots(convertSpeedToSpeedInKnots(<number>speedMin.getValue())));
      }
    }
    if (!activity.getStat(DataGradeAdjustedSpeedAvgKilometersPerHour.type)) {
      const speedAvg = activity.getStat(DataGradeAdjustedSpeedAvg.type);
      if (speedAvg) {
        activity.addStat(
          new DataGradeAdjustedSpeedAvgKilometersPerHour(
            convertSpeedToSpeedInKilometersPerHour(<number>speedAvg.getValue())
          )
        );
      }
    }
    if (!activity.getStat(DataGradeAdjustedSpeedAvgMilesPerHour.type)) {
      const speedAvg = activity.getStat(DataGradeAdjustedSpeedAvg.type);
      if (speedAvg) {
        activity.addStat(
          new DataGradeAdjustedSpeedAvgMilesPerHour(convertSpeedToSpeedInMilesPerHour(<number>speedAvg.getValue()))
        );
      }
    }
    if (!activity.getStat(DataGradeAdjustedSpeedAvgFeetPerSecond.type)) {
      const speedAvg = activity.getStat(DataGradeAdjustedSpeedAvg.type);
      if (speedAvg) {
        activity.addStat(
          new DataGradeAdjustedSpeedAvgFeetPerSecond(convertSpeedToSpeedInFeetPerSecond(<number>speedAvg.getValue()))
        );
      }
    }
    if (!activity.getStat(DataGradeAdjustedSpeedAvgFeetPerMinute.type)) {
      const speedAvg = activity.getStat(DataGradeAdjustedSpeedAvg.type);
      if (speedAvg) {
        activity.addStat(
          new DataGradeAdjustedSpeedAvgFeetPerMinute(convertSpeedToSpeedInFeetPerMinute(<number>speedAvg.getValue()))
        );
      }
    }
    if (!activity.getStat(DataGradeAdjustedSpeedAvgMetersPerMinute.type)) {
      const speedAvg = activity.getStat(DataGradeAdjustedSpeedAvg.type);
      if (speedAvg) {
        activity.addStat(
          new DataGradeAdjustedSpeedAvgMetersPerMinute(
            convertSpeedToSpeedInMetersPerMinute(<number>speedAvg.getValue())
          )
        );
      }
    }
    if (!activity.getStat(DataGradeAdjustedSpeedAvgKnots.type)) {
      const speedAvg = activity.getStat(DataGradeAdjustedSpeedAvg.type);
      if (speedAvg) {
        activity.addStat(new DataGradeAdjustedSpeedAvgKnots(convertSpeedToSpeedInKnots(<number>speedAvg.getValue())));
      }
    }

    // Vertical speed
    if (!activity.getStat(DataVerticalSpeedAvgFeetPerSecond.type)) {
      const verticalSpeedAvg = activity.getStat(DataVerticalSpeedAvg.type);
      if (verticalSpeedAvg) {
        activity.addStat(
          new DataVerticalSpeedAvgFeetPerSecond(convertSpeedToSpeedInFeetPerSecond(<number>verticalSpeedAvg.getValue()))
        );
      }
    }

    if (!activity.getStat(DataVerticalSpeedAvgMetersPerMinute.type)) {
      const verticalSpeedAvg = activity.getStat(DataVerticalSpeedAvg.type);
      if (verticalSpeedAvg) {
        activity.addStat(
          new DataVerticalSpeedAvgMetersPerMinute(
            convertSpeedToSpeedInMetersPerMinute(<number>verticalSpeedAvg.getValue())
          )
        );
      }
    }

    if (!activity.getStat(DataVerticalSpeedAvgFeetPerMinute.type)) {
      const verticalSpeedAvg = activity.getStat(DataVerticalSpeedAvg.type);
      if (verticalSpeedAvg) {
        activity.addStat(
          new DataVerticalSpeedAvgFeetPerMinute(convertSpeedToSpeedInFeetPerMinute(<number>verticalSpeedAvg.getValue()))
        );
      }
    }

    if (!activity.getStat(DataVerticalSpeedAvgMetersPerHour.type)) {
      const verticalSpeedAvg = activity.getStat(DataVerticalSpeedAvg.type);
      if (verticalSpeedAvg) {
        activity.addStat(
          new DataVerticalSpeedAvgMetersPerHour(convertSpeedToSpeedInMetersPerHour(<number>verticalSpeedAvg.getValue()))
        );
      }
    }

    if (!activity.getStat(DataVerticalSpeedAvgFeetPerHour.type)) {
      const verticalSpeedAvg = activity.getStat(DataVerticalSpeedAvg.type);
      if (verticalSpeedAvg) {
        activity.addStat(
          new DataVerticalSpeedAvgFeetPerHour(convertSpeedToSpeedInFeetPerHour(<number>verticalSpeedAvg.getValue()))
        );
      }
    }

    if (!activity.getStat(DataVerticalSpeedAvgKilometerPerHour.type)) {
      const verticalSpeedAvg = activity.getStat(DataVerticalSpeedAvg.type);
      if (verticalSpeedAvg) {
        activity.addStat(
          new DataVerticalSpeedAvgKilometerPerHour(
            convertSpeedToSpeedInKilometersPerHour(<number>verticalSpeedAvg.getValue())
          )
        );
      }
    }

    if (!activity.getStat(DataVerticalSpeedAvgMilesPerHour.type)) {
      const verticalSpeedAvg = activity.getStat(DataVerticalSpeedAvg.type);
      if (verticalSpeedAvg) {
        activity.addStat(
          new DataVerticalSpeedAvgMilesPerHour(convertSpeedToSpeedInMilesPerHour(<number>verticalSpeedAvg.getValue()))
        );
      }
    }

    if (!activity.getStat(DataVerticalSpeedMaxFeetPerSecond.type)) {
      const verticalSpeedMax = activity.getStat(DataVerticalSpeedMax.type);
      if (verticalSpeedMax) {
        activity.addStat(
          new DataVerticalSpeedMaxFeetPerSecond(convertSpeedToSpeedInFeetPerSecond(<number>verticalSpeedMax.getValue()))
        );
      }
    }

    if (!activity.getStat(DataVerticalSpeedMaxMetersPerMinute.type)) {
      const verticalSpeedMax = activity.getStat(DataVerticalSpeedMax.type);
      if (verticalSpeedMax) {
        activity.addStat(
          new DataVerticalSpeedMaxMetersPerMinute(
            convertSpeedToSpeedInMetersPerMinute(<number>verticalSpeedMax.getValue())
          )
        );
      }
    }

    if (!activity.getStat(DataVerticalSpeedMaxFeetPerMinute.type)) {
      const verticalSpeedMax = activity.getStat(DataVerticalSpeedMax.type);
      if (verticalSpeedMax) {
        activity.addStat(
          new DataVerticalSpeedMaxFeetPerMinute(convertSpeedToSpeedInFeetPerMinute(<number>verticalSpeedMax.getValue()))
        );
      }
    }

    if (!activity.getStat(DataVerticalSpeedMaxMetersPerHour.type)) {
      const verticalSpeedMax = activity.getStat(DataVerticalSpeedMax.type);
      if (verticalSpeedMax) {
        activity.addStat(
          new DataVerticalSpeedMaxMetersPerHour(convertSpeedToSpeedInMetersPerHour(<number>verticalSpeedMax.getValue()))
        );
      }
    }

    if (!activity.getStat(DataVerticalSpeedMaxFeetPerHour.type)) {
      const verticalSpeedMax = activity.getStat(DataVerticalSpeedMax.type);
      if (verticalSpeedMax) {
        activity.addStat(
          new DataVerticalSpeedMaxFeetPerHour(convertSpeedToSpeedInFeetPerHour(<number>verticalSpeedMax.getValue()))
        );
      }
    }

    if (!activity.getStat(DataVerticalSpeedMaxKilometerPerHour.type)) {
      const verticalSpeedMax = activity.getStat(DataVerticalSpeedMax.type);
      if (verticalSpeedMax) {
        activity.addStat(
          new DataVerticalSpeedMaxKilometerPerHour(
            convertSpeedToSpeedInKilometersPerHour(<number>verticalSpeedMax.getValue())
          )
        );
      }
    }

    if (!activity.getStat(DataVerticalSpeedMaxMilesPerHour.type)) {
      const verticalSpeedMax = activity.getStat(DataVerticalSpeedMax.type);
      if (verticalSpeedMax) {
        activity.addStat(
          new DataVerticalSpeedMaxMilesPerHour(convertSpeedToSpeedInMilesPerHour(<number>verticalSpeedMax.getValue()))
        );
      }
    }

    if (!activity.getStat(DataVerticalSpeedMinFeetPerSecond.type)) {
      const verticalSpeedMin = activity.getStat(DataVerticalSpeedMin.type);
      if (verticalSpeedMin) {
        activity.addStat(
          new DataVerticalSpeedMinFeetPerSecond(convertSpeedToSpeedInFeetPerSecond(<number>verticalSpeedMin.getValue()))
        );
      }
    }

    if (!activity.getStat(DataVerticalSpeedMinMetersPerMinute.type)) {
      const verticalSpeedMin = activity.getStat(DataVerticalSpeedMin.type);
      if (verticalSpeedMin) {
        activity.addStat(
          new DataVerticalSpeedMinMetersPerMinute(
            convertSpeedToSpeedInMetersPerMinute(<number>verticalSpeedMin.getValue())
          )
        );
      }
    }

    if (!activity.getStat(DataVerticalSpeedMinFeetPerMinute.type)) {
      const verticalSpeedMin = activity.getStat(DataVerticalSpeedMin.type);
      if (verticalSpeedMin) {
        activity.addStat(
          new DataVerticalSpeedMinFeetPerMinute(convertSpeedToSpeedInFeetPerMinute(<number>verticalSpeedMin.getValue()))
        );
      }
    }

    if (!activity.getStat(DataVerticalSpeedMinMetersPerHour.type)) {
      const verticalSpeedMin = activity.getStat(DataVerticalSpeedMin.type);
      if (verticalSpeedMin) {
        activity.addStat(
          new DataVerticalSpeedMinMetersPerHour(convertSpeedToSpeedInMetersPerHour(<number>verticalSpeedMin.getValue()))
        );
      }
    }

    if (!activity.getStat(DataVerticalSpeedMinFeetPerHour.type)) {
      const verticalSpeedMin = activity.getStat(DataVerticalSpeedMin.type);
      if (verticalSpeedMin) {
        activity.addStat(
          new DataVerticalSpeedMinFeetPerHour(convertSpeedToSpeedInFeetPerHour(<number>verticalSpeedMin.getValue()))
        );
      }
    }

    if (!activity.getStat(DataVerticalSpeedMinKilometerPerHour.type)) {
      const verticalSpeedMin = activity.getStat(DataVerticalSpeedMin.type);
      if (verticalSpeedMin) {
        activity.addStat(
          new DataVerticalSpeedMinKilometerPerHour(
            convertSpeedToSpeedInKilometersPerHour(<number>verticalSpeedMin.getValue())
          )
        );
      }
    }

    if (!activity.getStat(DataVerticalSpeedMinMilesPerHour.type)) {
      const verticalSpeedMin = activity.getStat(DataVerticalSpeedMin.type);
      if (verticalSpeedMin) {
        activity.addStat(
          new DataVerticalSpeedMinMilesPerHour(convertSpeedToSpeedInMilesPerHour(<number>verticalSpeedMin.getValue()))
        );
      }
    }

    if (!activity.getStat(DataDuration.type)) {
      activity.addStat(new DataDuration((activity.endDate.getTime() - activity.startDate.getTime()) / 1000));
    }

    // If timer time not set, then assign elapsed time by default (e.g. GPX file dont support timer time)
    if (!activity.getStat(DataTimerTime.type)) {
      activity.addStat(new DataTimerTime(this.round(activity.getDuration().getValue(), 2)));
    }

    // If missing moving time
    // Or moving time equals duration, then try to build real moving from laps if available
    if (!activity.getStat(DataMovingTime.type)) {
      let movingTime = 0;

      // First try to compute moving time from laps
      const laps = activity.getLaps();
      if (laps && laps.length > 0) {
        activity.getLaps().forEach(lap => {
          const stat = <DataMovingTime>lap.getStat(DataMovingTime.type);
          if (stat) {
            movingTime += stat.getValue();
          }
        });
      }

      // Get timer time...
      const timerTime = (<DataTimerTime>activity.getStat(DataTimerTime.type))?.getValue();

      // ... and compare with moving time and determine moving time validity
      const lapsMovingTimeValid = movingTime > 0 && movingTime <= timerTime;

      // If moving time from laps is not valid
      if (!lapsMovingTimeValid) {
        // ...then re-compute moving time but using global records.
        movingTime = 0;
        const speedByDurationStream = activity.getStreamDataByDuration(DataSpeed.type, true, true);

        const speedThreshold = ActivityTypesMoving.getSpeedThreshold(activity.type);
        speedByDurationStream.forEach((speedItem: StreamDataItem, index: number) => {
          if (speedItem.value !== null && speedItem.value > speedThreshold) {
            movingTime += (speedByDurationStream[index].time - (speedByDurationStream[index - 1]?.time || 0)) / 1000;
          }
        });
      }

      // In case moving time would be invalid, set it to timer time "at max"
      if (!movingTime || movingTime > timerTime) {
        movingTime = timerTime;
      }

      activity.addStat(new DataMovingTime(movingTime));
    }

    // If there is no pause defined then get it from duration and moving time (if available)
    if (!activity.getStat(DataPause.type) || !(<DataPause>activity.getStat(DataPause.type)).getValue()) {
      const movingTimeStat = <DataMovingTime>activity.getStat(DataMovingTime.type);
      const pauseTime =
        movingTimeStat && movingTimeStat.getValue() ? activity.getDuration().getValue() - movingTimeStat.getValue() : 0;
      activity.addStat(new DataPause(this.round(pauseTime, 2)));
    }
  }
}
