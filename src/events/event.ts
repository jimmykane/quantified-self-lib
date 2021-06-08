import { EventInterface } from './event.interface';
import { ActivityInterface } from '../activities/activity.interface';
import { DataInterface } from '../data/data.interface';
import { DurationClassAbstract } from '../duration/duration.class.abstract';
import { EventJSONInterface } from './event.json.interface';
import { Privacy } from '../privacy/privacy.class.interface';
import { ActivityTypes } from '../activities/activity.types';
import { DataActivityTypes } from '../data/data.activity-types';
import { DataDeviceNames } from '../data/data.device-names';

export class Event extends DurationClassAbstract implements EventInterface {
  public name: string;
  public description?: string;
  public privacy: Privacy = Privacy.Private;
  public isMerge: boolean;

  private activities: ActivityInterface[] = [];

  constructor(name: string, startDate: Date, endDate: Date, privacy?: Privacy, description?: string, isMerge = false) {
    super(startDate, endDate);
    this.name = name;
    if (privacy) {
      this.privacy = privacy;
    }
    if (description) {
      this.description = description;
    }
    this.isMerge = isMerge;
  }

  addActivity(activity: ActivityInterface) {
    this.activities.push(activity);
  }

  addActivities(activities: ActivityInterface[]): void {
    activities.forEach(activity => this.addActivity(activity));
  }

  clearActivities(): void {
    this.activities = [];
  }

  removeActivity(activityToRemove: ActivityInterface) {
    this.activities = this.activities.filter(activity => activityToRemove.getID() !== activity.getID());
  }

  getActivities(): ActivityInterface[] {
    this.sortActivities(); // PErhaps move on adding ? Lets check performance
    return this.activities;
  }

  getFirstActivity(): ActivityInterface {
    return this.getActivities().reduce((activityA: ActivityInterface, activityB: ActivityInterface) => {
      return activityA.startDate < activityB.startDate ? activityA : activityB;
    });
  }

  getLastActivity(): ActivityInterface {
    return this.getActivities().reduce((activityA: ActivityInterface, activityB: ActivityInterface) => {
      return activityA.startDate < activityB.startDate ? activityB : activityA;
    });
  }

  getActivityTypesAsArray(): string[] {
    const activityTypesStat = <DataActivityTypes>this.getStat(DataActivityTypes.type);
    if (!activityTypesStat) {
      throw new Error(`Event with id ${this.getID()} has no activity types`);
    }
    return activityTypesStat.getValue();
  }

  getActivityTypesAsString(): string {
    const activityTypesStat = <DataActivityTypes>this.getStat(DataActivityTypes.type);
    if (!activityTypesStat) {
      throw new Error(`Event with id ${this.getID()} has no activity types`);
    }
    return activityTypesStat.getValue().length > 1
      ? `${this.getUniqueStringWithMultiplier(
          activityTypesStat
            .getValue()
            .map((activityType: string) => ActivityTypes[<keyof typeof ActivityTypes>activityType])
        )}`
      : ActivityTypes[<keyof typeof ActivityTypes>activityTypesStat.getDisplayValue()];
  }

  getDeviceNamesAsString(): string {
    const deviceNamesStat = <DataDeviceNames>this.getStat(DataDeviceNames.type);
    if (!deviceNamesStat) {
      throw new Error(`Event with id ${this.getID()} has no device names`);
    }
    return `${this.getUniqueStringWithMultiplier(deviceNamesStat.getValue())}`;
  }

  private sortActivities() {
    this.activities.sort((activityA: ActivityInterface, activityB: ActivityInterface) => {
      return +activityA.startDate - +activityB.startDate;
    });
  }

  private getUniqueStringWithMultiplier(arrayOfStrings: string[]) {
    const uniqueObject = arrayOfStrings.reduce((uniqueObj: any, type, index) => {
      if (!uniqueObj[type]) {
        uniqueObj[type] = 1;
      } else {
        uniqueObj[type] += 1;
      }
      return uniqueObj;
    }, {});
    return Object.keys(uniqueObject)
      .reduce((uniqueArray: any[], key, index, object) => {
        if (uniqueObject[key] === 1) {
          uniqueArray.push(key);
        } else {
          uniqueArray.push(uniqueObject[key] + 'x ' + key);
        }
        return uniqueArray;
      }, [])
      .join(', ');
  }

  isMultiSport(): boolean {
    return !this.isMerge && this.getActivities().length > 1;
  }

  toJSON(): EventJSONInterface {
    const stats = {};
    this.stats.forEach((value: DataInterface, key: string) => {
      Object.assign(stats, value.toJSON());
    });
    return {
      name: this.name,
      description: this.description || null,
      privacy: this.privacy,
      startDate: this.startDate.getTime(),
      endDate: this.endDate.getTime(),
      stats: stats,
      isMerge: this.isMerge
    };
  }
}
