import { Event } from '../../../event';
import { Activity, MAX_ACTIVITY_DURATION } from '../../../../activities/activity';
import { Lap } from '../../../../laps/lap';
import { EventInterface } from '../../../event.interface';
import { Creator } from '../../../../creators/creator';
import { CreatorInterface } from '../../../../creators/creator.interface';
import { ActivityTypes, ActivityTypesMoving } from '../../../../activities/activity.types';
import { DataDuration } from '../../../../data/data.duration';
import { DataEnergy } from '../../../../data/data.energy';
import { ActivityInterface } from '../../../../activities/activity.interface';
import { LapInterface } from '../../../../laps/lap.interface';
import { DataDistance } from '../../../../data/data.distance';
import { ImporterFitGarminDeviceNames } from './importer.fit.garmin.device.names';
import { ImporterFitSuuntoDeviceNames } from './importer.fit.suunto.device.names';
import { ImporterZwiftDeviceNames } from './importer.fit.zwift.device.names';
import { DataPause } from '../../../../data/data.pause';
import { DataInterface } from '../../../../data/data.interface';
import { DataCadenceAvg } from '../../../../data/data.cadence-avg';
import { DataPowerAvg } from '../../../../data/data.power-avg';
import { DataSpeedAvg } from '../../../../data/data.speed-avg';
import { DataCadenceMax } from '../../../../data/data.cadence-max';
import { DataPowerMax } from '../../../../data/data.power-max';
import { DataAscent } from '../../../../data/data.ascent';
import { DataDescent } from '../../../../data/data.descent';
import { DataHeartRateAvg } from '../../../../data/data.heart-rate-avg';
import { DataHeartRateMax } from '../../../../data/data.heart-rate-max';
import { DataSpeedMax } from '../../../../data/data.speed-max';
import { LapTypes } from '../../../../laps/lap.types';
import { DataHeartRateMin } from '../../../../data/data.heart-rate-min';
import { DataPowerMin } from '../../../../data/data.power-min';
import { DataTotalTrainingEffect } from '../../../../data/data.total-training-effect';
import { FITSampleMapper } from './importer.fit.mapper';
import { isNumber, isNumberOrString } from '../../../utilities/helpers';
import { EventUtilities } from '../../../utilities/event.utilities';
import { IBIStream } from '../../../../streams/ibi-stream';
import { DeviceInterface } from '../../../../activities/devices/device.interface';
import { Device } from '../../../../activities/devices/device';
import { ImporterFitAntPlusDeviceNames } from './importer.fit.ant-plus.device.names';
import { DataRecoveryTime } from '../../../../data/data.recovery-time';
import { DataPeakEPOC } from '../../../../data/data.peak-epoc';
import { DataFeeling } from '../../../../data/data.feeling';
import { DataTemperatureMax } from '../../../../data/data.temperature-max';
import { DataTemperatureMin } from '../../../../data/data.temperature-min';
import { DataTemperatureAvg } from '../../../../data/data.temperature-avg';
import { DataSpeedMin } from '../../../../data/data.speed-min';
import { DataCadenceMin } from '../../../../data/data.cadence-min';
import { DataSWOLFAvg } from '../../../../data/data.swolf-avg';
import { DataDescription } from '../../../../data/data.description';
import { DataVO2Max } from '../../../../data/data.vo2-max';
import { IntensityZones } from '../../../../intensity-zones/intensity-zones';
import { DataHeartRate } from '../../../../data/data.heart-rate';
import { DataPower } from '../../../../data/data.power';
import { DataSpeed } from '../../../../data/data.speed';
import { DataHeartRateZoneOneDuration } from '../../../../data/data.heart-rate-zone-one-duration';
import { DataHeartRateZoneTwoDuration } from '../../../../data/data.heart-rate-zone-two-duration';
import { DataHeartRateZoneThreeDuration } from '../../../../data/data.heart-rate-zone-three-duration';
import { DataHeartRateZoneFourDuration } from '../../../../data/data.heart-rate-zone-four-duration';
import { DataHeartRateZoneFiveDuration } from '../../../../data/data.heart-rate-zone-five-duration';
import { DataPowerZoneOneDuration } from '../../../../data/data.power-zone-one-duration';
import { DataPowerZoneTwoDuration } from '../../../../data/data.power-zone-two-duration';
import { DataPowerZoneThreeDuration } from '../../../../data/data.power-zone-three-duration';
import { DataPowerZoneFourDuration } from '../../../../data/data.power-zone-four-duration';
import { DataPowerZoneFiveDuration } from '../../../../data/data.power-zone-five-duration';
import { DataSpeedZoneOneDuration } from '../../../../data/data.speed-zone-one-duration';
import { DataSpeedZoneTwoDuration } from '../../../../data/data.speed-zone-two-duration';
import { DataSpeedZoneThreeDuration } from '../../../../data/data.speed-zone-three-duration';
import { DataSpeedZoneFourDuration } from '../../../../data/data.speed-zone-four-duration';
import { DataSpeedZoneFiveDuration } from '../../../../data/data.speed-zone-five-duration';
import { EmptyEventLibError } from '../../../../errors/empty-event-sports-libs.error';
import { DataStartEvent } from '../../../../data/data.start-event';
import { DataStopEvent } from '../../../../data/data.stop-event';
import { DataStopAllEvent } from '../../../../data/data.stop-all-event';
import { DataMovingTime } from '../../../../data/data.moving-time';
import { ActivityUtilities } from '../../../utilities/activity.utilities';
import { DataTimerTime } from '../../../../data/data.timer-time';
import { DataTotalCycles } from '../../../../data/data-total.cycles';
import { DataPoolLength } from '../../../../data/data.pool-length';
import { DataActiveLengths } from '../../../../data/data-active.lengths';

const FitFileParser = require('fit-file-parser').default;

export class EventImporterFIT {
  static getFromArrayBuffer(arrayBuffer: ArrayBuffer, name = 'New Event'): Promise<EventInterface> {
    return new Promise((resolve, reject) => {
      const fitFileParser = new FitFileParser({
        force: true,
        speedUnit: 'm/s',
        lengthUnit: 'm',
        temperatureUnit: 'celsius',
        elapsedRecordField: false,
        mode: 'both'
      });

      fitFileParser.parse(arrayBuffer, (error: any, fitDataObject: any) => {
        // Iterate over the sessions and create their activities
        const activities: ActivityInterface[] = fitDataObject.sessions.map((sessionObject: any) => {
          // Get the activity from the sessionObject
          const activity = this.getActivityFromSessionObject(sessionObject, fitDataObject);
          // Go over the laps
          sessionObject.laps.forEach((sessionLapObject: any) => {
            activity.addLap(this.getLapFromSessionLapObject(sessionLapObject, activity));
          });

          // Go over the hr zone info
          if (sessionObject.time_in_hr_zone && sessionObject.time_in_hr_zone.length) {
            // Add the stats
            if (isNumber(sessionObject.time_in_hr_zone[0])) {
              activity.addStat(new DataHeartRateZoneOneDuration(sessionObject.time_in_hr_zone[0]));
            }
            if (isNumber(sessionObject.time_in_hr_zone[1])) {
              activity.addStat(new DataHeartRateZoneTwoDuration(sessionObject.time_in_hr_zone[1]));
            }
            if (isNumber(sessionObject.time_in_hr_zone[2])) {
              activity.addStat(new DataHeartRateZoneThreeDuration(sessionObject.time_in_hr_zone[2]));
            }
            if (isNumber(sessionObject.time_in_hr_zone[3])) {
              activity.addStat(new DataHeartRateZoneFourDuration(sessionObject.time_in_hr_zone[3]));
            }
            if (isNumber(sessionObject.time_in_hr_zone[4])) {
              activity.addStat(new DataHeartRateZoneFiveDuration(sessionObject.time_in_hr_zone[4]));
            }

            const hrIntensityZones = new IntensityZones(DataHeartRate.type);
            hrIntensityZones.zone1Duration = sessionObject.time_in_hr_zone[0] || 0;
            hrIntensityZones.zone2Duration = sessionObject.time_in_hr_zone[1] || 0;
            hrIntensityZones.zone3Duration = sessionObject.time_in_hr_zone[2] || 0;
            hrIntensityZones.zone4Duration = sessionObject.time_in_hr_zone[3] || 0;
            hrIntensityZones.zone5Duration = sessionObject.time_in_hr_zone[4] || 0;
            activity.intensityZones.push(hrIntensityZones);
          }

          // Go over the power zone info
          if (sessionObject.time_in_power_zone && sessionObject.time_in_power_zone.length) {
            if (isNumber(sessionObject.time_in_power_zone[0])) {
              activity.addStat(new DataPowerZoneOneDuration(sessionObject.time_in_power_zone[0]));
            }
            if (isNumber(sessionObject.time_in_power_zone[1])) {
              activity.addStat(new DataPowerZoneTwoDuration(sessionObject.time_in_power_zone[1]));
            }
            if (isNumber(sessionObject.time_in_power_zone[2])) {
              activity.addStat(new DataPowerZoneThreeDuration(sessionObject.time_in_power_zone[2]));
            }
            if (isNumber(sessionObject.time_in_power_zone[3])) {
              activity.addStat(new DataPowerZoneFourDuration(sessionObject.time_in_power_zone[3]));
            }
            if (isNumber(sessionObject.time_in_power_zone[4])) {
              activity.addStat(new DataPowerZoneFiveDuration(sessionObject.time_in_power_zone[4]));
            }

            const powerIntensityZones = new IntensityZones(DataPower.type);
            powerIntensityZones.zone1Duration = sessionObject.time_in_power_zone[0] || 0;
            powerIntensityZones.zone2Duration = sessionObject.time_in_power_zone[1] || 0;
            powerIntensityZones.zone3Duration = sessionObject.time_in_power_zone[2] || 0;
            powerIntensityZones.zone4Duration = sessionObject.time_in_power_zone[3] || 0;
            powerIntensityZones.zone5Duration = sessionObject.time_in_power_zone[4] || 0;
            activity.intensityZones.push(powerIntensityZones);
          }

          // Go over the speed zone info
          if (sessionObject.time_in_speed_zone && sessionObject.time_in_speed_zone.length) {
            if (isNumber(sessionObject.time_in_speed_zone[0])) {
              activity.addStat(new DataSpeedZoneOneDuration(sessionObject.time_in_speed_zone[0]));
            }
            if (isNumber(sessionObject.time_in_speed_zone[1])) {
              activity.addStat(new DataSpeedZoneTwoDuration(sessionObject.time_in_speed_zone[1]));
            }
            if (isNumber(sessionObject.time_in_speed_zone[2])) {
              activity.addStat(new DataSpeedZoneThreeDuration(sessionObject.time_in_speed_zone[2]));
            }
            if (isNumber(sessionObject.time_in_speed_zone[3])) {
              activity.addStat(new DataSpeedZoneFourDuration(sessionObject.time_in_speed_zone[3]));
            }
            if (isNumber(sessionObject.time_in_speed_zone[4])) {
              activity.addStat(new DataSpeedZoneFiveDuration(sessionObject.time_in_speed_zone[4]));
            }

            const speedIntensityZones = new IntensityZones(DataSpeed.type);
            speedIntensityZones.zone1Duration = sessionObject.time_in_speed_zone[0] || 0;
            speedIntensityZones.zone2Duration = sessionObject.time_in_speed_zone[1] || 0;
            speedIntensityZones.zone3Duration = sessionObject.time_in_speed_zone[2] || 0;
            speedIntensityZones.zone4Duration = sessionObject.time_in_speed_zone[3] || 0;
            speedIntensityZones.zone5Duration = sessionObject.time_in_speed_zone[4] || 0;
            activity.intensityZones.push(speedIntensityZones);
          }

          // Add the events
          fitDataObject.events
            .filter((activityEvent: FITFileActivityEvent) => {
              return (
                activityEvent.event === 'timer' &&
                activityEvent.timestamp >= activity.startDate &&
                activityEvent.timestamp <= activity.endDate
              );
            })
            .forEach((activityEvent: FITFileActivityEvent) => {
              switch (activityEvent.event_type) {
                case 'start':
                  activity.addEvent(new DataStartEvent(activity.getDateIndex(activityEvent.timestamp)));
                  break;
                case 'stop':
                  activity.addEvent(new DataStopEvent(activity.getDateIndex(activityEvent.timestamp)));
                  break;
                case 'stop_all':
                  activity.addEvent(new DataStopAllEvent(activity.getDateIndex(activityEvent.timestamp)));
                  break;
                default:
                  break;
              }
            });

          // Get the samples
          const samples = fitDataObject.records.filter((record: any) => {
            return record.timestamp >= activity.startDate && record.timestamp <= activity.endDate;
          });

          FITSampleMapper.forEach(sampleMapping => {
            // @todo not sure if we need to check for number only ...
            const subjectSamples = <any[]>(
              samples.filter((sample: any) => isNumber(sampleMapping.getSampleValue(sample)))
            );
            if (subjectSamples.length) {
              // When we create a stream here it has the length of the activity elapsed time (end-start) filled with nulls.
              // We keep nulls in order to preserve the array length.
              activity.addStream(activity.createStream(sampleMapping.dataType));
              subjectSamples.forEach(subjectSample => {
                activity.addDataToStream(
                  sampleMapping.dataType,
                  new Date(subjectSample.timestamp),
                  <number>sampleMapping.getSampleValue(subjectSample)
                );
              });
            }
          });

          return activity;
        });

        // If there are no activities to parse ....
        if (!activities.length) {
          reject(new EmptyEventLibError('Empty fit file'));
          return;
        }

        // Get the HRV to IBI if exist
        if (fitDataObject.hrv && fitDataObject.hrv.length) {
          activities.forEach((activity: ActivityInterface) => {
            let timeSum = 0;
            const ibiData = fitDataObject.hrv
              .reduce((ibiArray: any, hrvRecord: any) => ibiArray.concat(hrvRecord.time), [])
              .map((ibi: any) => ibi * 1000)
              .filter((ibi: number) => {
                // debugger;
                // Some Garmin devices return a record of 65.535 (65535) for some reason so exlcude those
                if (ibi === 65535) {
                  // timeSum += ibi;
                  return false;
                }
                timeSum += ibi;
                const ibiDataDate = new Date(activities[0].startDate.getTime() + timeSum);
                return ibiDataDate >= activity.startDate && ibiDataDate <= activity.endDate;
              });
            // set the IBI
            activity.addStream(new IBIStream(ibiData));
          });
        }

        // Parse the device infos
        if (fitDataObject.device_infos && fitDataObject.device_infos.length) {
          activities.forEach(activity => {
            activity.creator.devices = this.getDeviceInfos(fitDataObject.device_infos);
          });
        }

        // Create an event
        // @todo check if the start and end date can derive from the file
        const event = new Event(name, activities[0].startDate, activities[activities.length - 1].endDate);
        activities.forEach(activity => event.addActivity(activity));
        // debugger;
        EventUtilities.generateStatsForAll(event);
        // debugger;
        resolve(event);
      });
    });
  }

  private static getDeviceInfos(deviceInfos: any[]): DeviceInterface[] {
    return deviceInfos.map((deviceInfo: any) => {
      const device = new Device(deviceInfo.device_type);
      device.index = deviceInfo.device_index;
      device.name = ImporterFitAntPlusDeviceNames[deviceInfo.ant_device_number] || deviceInfo.ant_device_number;
      device.batteryStatus = deviceInfo.battery_status;
      device.batteryVoltage = deviceInfo.battery_voltage;
      device.manufacturer = deviceInfo.manufacturer;
      device.serialNumber = deviceInfo.serial_number;
      device.product = deviceInfo.product;
      device.swInfo = deviceInfo.software_version;
      device.hwInfo = deviceInfo.hardware_version;
      device.antDeviceNumber = deviceInfo.ant_device_number;
      device.antTransmissionType = deviceInfo.ant_transmission_type;
      device.antNetwork = deviceInfo.ant_network;
      device.sourceType = deviceInfo.source_type;
      device.cumOperatingTime = deviceInfo.cum_operating_time;
      return device;
    });
  }

  private static getLapFromSessionLapObject(sessionLapObject: any, activity: ActivityInterface): LapInterface {
    const lap = new Lap(
      sessionLapObject.start_time ||
        sessionLapObject.records[0].timestamp ||
        new Date(sessionLapObject.timestamp.getTime() - sessionLapObject.total_elapsed_time * 1000),
      sessionLapObject.timestamp ||
        new Date(sessionLapObject.start_time.getTime() + sessionLapObject.total_elapsed_time * 1000), // Some dont have a timestamp
      LapTypes[<keyof typeof LapTypes>sessionLapObject.lap_trigger] || LapTypes.unknown
    );
    // Set the calories
    if (sessionLapObject.total_calories) {
      lap.addStat(new DataEnergy(sessionLapObject.total_calories));
    }
    // Add stats to the lap
    this.getStatsFromObject(sessionLapObject, activity).forEach(stat => lap.addStat(stat));
    return lap;
  }

  private static getActivityFromSessionObject(sessionObject: any, fitDataObject: any): ActivityInterface {
    let startDate = sessionObject.start_time;
    const totalElapsedTime = sessionObject.total_elapsed_time || sessionObject.total_timer_time || 0;
    let endDate = sessionObject.timestamp || new Date(sessionObject.start_time.getTime() + totalElapsedTime * 1000);

    // Some fit files have wrong dates for session.timestamp && session.start_time and those miss an elapsed time
    if (
      !totalElapsedTime && // Elapsed time missing
      fitDataObject.sessions.length === 1 && // Has only one session
      fitDataObject.records &&
      fitDataObject.records.length // There are records to try to guess
    ) {
      startDate = fitDataObject.records[0].timestamp;
      endDate = fitDataObject.records[fitDataObject.records.length - 1].timestamp;
    } else if (endDate < startDate) {
      // If for some reason this happens
      if (!fitDataObject.records || !fitDataObject.records[0]) {
        throw new Error('Cannot parse dates. Start date is greater than the end date');
      }
      startDate = fitDataObject.records[0].timestamp;
      endDate = fitDataObject.records[fitDataObject.records.length - 1].timestamp;
    } else if (+endDate - +startDate > MAX_ACTIVITY_DURATION) {
      endDate = new Date(sessionObject.start_time.getTime() + totalElapsedTime * 1000);
    }

    // Create an activity
    const activity = new Activity(
      startDate,
      endDate,
      this.getActivityTypeFromSessionObject(sessionObject),
      this.getCreatorFromFitDataObject(fitDataObject)
    );
    // Set the activity stats
    this.getStatsFromObject(sessionObject, activity).forEach(stat => activity.addStat(stat));
    return activity;
  }

  private static getActivityTypeFromSessionObject(session: any): ActivityTypes {
    if (session.sub_sport && session.sub_sport !== 'generic') {
      return (
        ActivityTypes[<keyof typeof ActivityTypes>`${session.sport}_${session.sub_sport}`] ||
        `${session.sport}_${session.sub_sport}` ||
        session.sport ||
        ActivityTypes.unknown
      );
    }
    return ActivityTypes[<keyof typeof ActivityTypes>session.sport] || session.sport || ActivityTypes.unknown;
  }

  // @todo move this to a mapper
  private static getStatsFromObject(object: any, activity: ActivityInterface): DataInterface[] {
    const stats = [];

    // TOTAL ELAPSED TIME on Object (activity, lap...)
    let elapsedTime = 0;
    if (isNumber(object.total_elapsed_time)) {
      elapsedTime = object.total_elapsed_time;
    } else if ((object.timestamp - object.start_time) / 1000) {
      elapsedTime = (object.timestamp - object.start_time) / 1000;
    }

    // 0 should be not included aha it's not legit to have a 0 for total timer time
    // And that typically is a device error we should look at the samples
    // Since start and end date are inclusive for sample size eg at time [0] there can be a value
    if (!elapsedTime) {
      elapsedTime = ActivityUtilities.getDataLength(activity.startDate, activity.endDate) - 1;
    }

    stats.push(new DataDuration(Math.round(elapsedTime * 100) / 100));

    // TOTAL TIMER TIME on Object (activity, lap...)
    let timerTime = 0;
    if (isNumber(object.total_timer_time)) {
      timerTime = object.total_timer_time;
    }

    // If timer time is unknown then assign elapsedTime value
    if (!timerTime) {
      timerTime = elapsedTime;
    }

    stats.push(new DataTimerTime(Math.round(timerTime * 100) / 100));

    // Moving TIME on Object (activity, lap...)
    let movingTime = 0;
    if (object.lengths && object.lengths.length > 0) {
      object.lengths.forEach((lengthVal: any) => {
        if (lengthVal.length_type === 'active') {
          movingTime += lengthVal.total_timer_time;
        }
      });
    } else if (object.records && object.records.length > 0) {
      const speedThreshold = ActivityTypesMoving.getSpeedThreshold(activity.type);
      object.records.forEach((record: any, index: number) => {
        if ((record.speed || record.enhanced_speed) > speedThreshold) {
          const previousRecordTime = object.records[index - 1]?.timestamp || object.start_time;
          movingTime += (record.timestamp.getTime() - previousRecordTime.getTime()) / 1000;
        }
      });
    }

    // Append moving stat only if moving time has been detected
    // We need that to compute total global moving time later
    if (movingTime > 0) {
      stats.push(new DataMovingTime(Math.round(movingTime * 100) / 100));
    }

    // Pause TIME on Object (activity, lap...)
    const pause = elapsedTime > movingTime && movingTime > 0 ? Math.round((elapsedTime - movingTime) * 100) / 100 : 0;
    stats.push(new DataPause(pause));

    if (isNumberOrString(object.total_distance)) {
      stats.push(new DataDistance(object.total_distance));
    } else {
      stats.push(new DataDistance(0));
    }
    // Heart Rate
    if (isNumberOrString(object.avg_heart_rate)) {
      stats.push(new DataHeartRateAvg(object.avg_heart_rate));
    }
    if (isNumberOrString(object.min_heart_rate)) {
      stats.push(new DataHeartRateMin(object.min_heart_rate));
    }
    if (isNumberOrString(object.max_heart_rate)) {
      stats.push(new DataHeartRateMax(object.max_heart_rate));
    }
    // Cadence
    if (isNumberOrString(object.avg_cadence)) {
      stats.push(new DataCadenceAvg(object.avg_cadence));
    }
    if (isNumberOrString(object.min_cadence)) {
      stats.push(new DataCadenceMin(object.min_cadence));
    }
    if (isNumberOrString(object.max_cadence)) {
      stats.push(new DataCadenceMax(object.max_cadence));
    }
    // Power
    if (isNumberOrString(object.avg_power)) {
      stats.push(new DataPowerAvg(object.avg_power));
    }
    if (isNumberOrString(object.min_power)) {
      stats.push(new DataPowerMin(object.min_power));
    }
    if (isNumberOrString(object.max_power)) {
      stats.push(new DataPowerMax(object.max_power));
    }
    // Speed
    if (isNumberOrString(object.avg_speed)) {
      stats.push(new DataSpeedAvg(object.avg_speed));
    }
    if (isNumberOrString(object.min_speed)) {
      stats.push(new DataSpeedMin(object.min_speed));
    }
    if (isNumberOrString(object.max_speed)) {
      stats.push(new DataSpeedMax(object.max_speed));
    }
    // Keep latest , enhanced @todo this can create a bug
    if (isNumberOrString(object.enhanced_avg_speed)) {
      stats.push(new DataSpeedAvg(object.enhanced_avg_speed));
    }
    if (isNumberOrString(object.enhanced_min_speed)) {
      stats.push(new DataSpeedMin(object.enhanced_min_speed));
    }
    if (isNumberOrString(object.enhanced_max_speed)) {
      stats.push(new DataSpeedMax(object.enhanced_max_speed));
    }
    // Temperature
    if (isNumberOrString(object.avg_temperature)) {
      stats.push(new DataTemperatureAvg(object.avg_temperature));
    }
    if (isNumberOrString(object.min_temperature)) {
      stats.push(new DataTemperatureMin(object.min_temperature));
    }
    if (isNumberOrString(object.max_temperature)) {
      stats.push(new DataTemperatureMax(object.max_temperature));
    }
    // Ascent
    if (isNumberOrString(object.total_ascent)) {
      stats.push(new DataAscent(object.total_ascent));
    }
    // Descent
    if (isNumberOrString(object.total_descent)) {
      stats.push(new DataDescent(object.total_descent));
    }
    // Calories
    if (isNumberOrString(object.total_calories)) {
      stats.push(new DataEnergy(object.total_calories));
    }
    // Total training effect
    if (isNumberOrString(object.total_training_effect)) {
      stats.push(new DataTotalTrainingEffect(object.total_training_effect));
    }
    // Vo2Max
    if (isNumberOrString(object.estimated_vo2_max)) {
      stats.push(new DataVO2Max(object.estimated_vo2_max));
    }
    // Peak Epoc
    if (isNumberOrString(object.peak_epoc)) {
      stats.push(new DataPeakEPOC(object.peak_epoc));
    }
    // Recovery time
    if (isNumberOrString(object.recovery_time)) {
      stats.push(new DataRecoveryTime(object.recovery_time));
    }
    // Feeling
    if (isNumberOrString(object.feeling)) {
      stats.push(new DataFeeling(object.feeling));
    }
    // Average SWOLF
    if (isNumberOrString(object.avg_swolf)) {
      stats.push(new DataSWOLFAvg(object.avg_swolf));
    }

    // Pool length
    if (isNumberOrString(object.pool_length)) {
      const poolLength = object.pool_length_unit.match(/metric/i) ? object.pool_length : object.pool_length * 0.9144; // Convert to meters from yards when not metric
      stats.push(new DataPoolLength(poolLength));
    }

    // Active lengths
    if (isNumberOrString(object.num_active_lengths)) {
      stats.push(new DataActiveLengths(object.num_active_lengths));
    }

    // Total cycle
    if (isNumberOrString(object.total_cycles)) {
      stats.push(new DataTotalCycles(object.total_cycles));
    }

    // Description
    if (isNumberOrString(object.description)) {
      stats.push(new DataDescription(object.description));
    }

    return stats;
  }

  private static getCreatorFromFitDataObject(fitDataObject: any): CreatorInterface {
    let creator: CreatorInterface;
    switch (fitDataObject.file_ids[0].manufacturer) {
      case 'suunto': {
        creator = new Creator(
          ImporterFitSuuntoDeviceNames[<number>fitDataObject.file_ids[0].product] ||
            fitDataObject.file_ids[0].product_name ||
            'Suunto Unknown'
        );
        break;
      }
      case 'coros': {
        creator = new Creator(fitDataObject.file_ids[0].product_name || fitDataObject.file_ids[0].product || 'Unknown');
        break;
      }
      case 'garmin': {
        creator = new Creator(
          ImporterFitGarminDeviceNames[fitDataObject.file_ids[0].product] ||
            fitDataObject.file_ids[0].product_name ||
            'Garmin Unknown'
        );
        break;
      }
      case 'zwift': {
        creator = new Creator(
          ImporterZwiftDeviceNames[fitDataObject.file_ids[0].product] ||
            fitDataObject.file_ids[0].product_name ||
            'Zwift Unknown'
        );
        break;
      }
      case 'stryd': {
        creator = new Creator(
          'Stryd',
          fitDataObject.file_creator.software_version,
          fitDataObject.file_creator.hardware_version,
          fitDataObject.file_ids[0].serial_number
        );
        break;
      }
      case 'development': {
        creator = new Creator(fitDataObject.file_ids[0].product_name || fitDataObject.file_ids[0].product || 'Unknown');
        break;
      }
      default: {
        creator = new Creator(
          fitDataObject.file_ids[0].manufacturer
            ? fitDataObject.file_ids[0].manufacturer +
              ' ' +
              (fitDataObject.file_ids[0].product_name || fitDataObject.file_ids[0].product || 'Unknown')
            : fitDataObject.file_ids[0].product_name || fitDataObject.file_ids[0].product || 'Unknown'
        );
      }
    }

    if (fitDataObject.file_creator && isNumberOrString(fitDataObject.file_creator.hardware_version)) {
      creator.hwInfo = String(fitDataObject.file_creator.hardware_version);
    }
    if (fitDataObject.file_creator && isNumberOrString(fitDataObject.file_creator.software_version)) {
      creator.swInfo = String(fitDataObject.file_creator.software_version);
    } else if (fitDataObject.device_info && isNumberOrString(fitDataObject.device_info.software_version)) {
      creator.swInfo = String(fitDataObject.device_info.software_version);
    }
    if (fitDataObject.file_ids[0] && isNumberOrString(fitDataObject.file_ids[0].serial_number)) {
      creator.serialNumber = fitDataObject.file_ids[0].serial_number;
    }

    // If creator name is a number ONLY (e.g. product number), then flag it as 'Unknown'
    if (Number.isFinite(creator.name) || creator.name.match(/^\d+$/)) {
      creator.name = `Unknown`;
    }

    return creator;
  }
}

export interface FITFileActivityEvent {
  event: string;
  timestamp: Date;
  event_type: 'start' | 'stop' | 'stop_all';
  data: number;
}
