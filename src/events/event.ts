import {EventInterface} from './event.interface';
import {ActivityInterface} from '../activities/activity.interface';
import {PointInterface} from '../points/point.interface';
import {StatsClassAbstract} from '../stats/stats.class.abstract';
import {DataInterface} from '../data/data.interface';

export class Event extends StatsClassAbstract implements EventInterface {

  public name: string;
  private activities: ActivityInterface[] = [];

  constructor(name: string) {
    super();
    this.name = name
  }

  addActivity(activity: ActivityInterface) {
    this.activities.push(activity);
  }

  removeActivity(activityToRemove: ActivityInterface) {
    this.getActivities().splice(this.getActivities().findIndex((activity: ActivityInterface) => {
      return activityToRemove.getID() === activity.getID();
    }), 1);
  }

  getActivities(): ActivityInterface[] {
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

  getPoints(startDate?: Date, endDate?: Date, activities?: ActivityInterface[]): PointInterface[] {
    return (activities || this.getActivities()).reduce((pointsArray: PointInterface[], activity: ActivityInterface) => {
      return pointsArray.concat(activity.getPoints(startDate, endDate));
    }, []);
  }

  getPointsWithPosition(startDate?: Date, endDate?: Date, activities?: ActivityInterface[]): PointInterface[] {
    return this.getPoints(startDate, endDate, activities)
      .reduce((pointsWithPosition: PointInterface[], point: PointInterface) => {
        if (point.getPosition()) {
          pointsWithPosition.push(point);
        }
        return pointsWithPosition;
      }, []);
  }

  toJSON(): any {
    const stats: any[] = [];
    this.stats.forEach((value: DataInterface, key: string) => {
      stats.push(value.toJSON());
    });
    return {
      id: this.getID(),
      name: this.name,
      stats: stats,
      activities: this.getActivities().reduce((jsonActivitiesArray: any[], activity: ActivityInterface) => {
        jsonActivitiesArray.push(activity.toJSON());
        return jsonActivitiesArray;
      }, []),
    };
  }
}
