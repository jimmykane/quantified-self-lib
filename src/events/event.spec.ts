import { EventInterface } from './event.interface';
import { Event } from './event';
import { Activity } from '../activities/activity';
import { Creator } from '../creators/creator';
import { ActivityTypes } from '../activities/activity.types';
import { ActivityJSONInterface } from '../activities/activity.json.interface';

describe('Event', () => {
  let event: EventInterface;

  beforeEach(() => {
    event = new Event('Test', new Date(0), new Date(200));
    event.description = 'Test';
  });

  it('should add an activity', () => {
    expect(event.getActivities().length).toBe(0);
    event.addActivity(
      new Activity(new Date(0), new Date(new Date(0).getTime() + 10), ActivityTypes.Running, new Creator('Test'))
    );
    expect(event.getActivities().length).toBe(1);
  });

  it('should remove an activity', () => {
    const activity = new Activity(
      new Date(0),
      new Date(new Date(0).getTime() + 10),
      ActivityTypes.Running,
      new Creator('Test')
    );
    event.addActivity(activity);
    expect(event.getActivities().length).toBe(1);
    event.removeActivity(activity);
    expect(event.getActivities().length).toBe(0);
  });

  it('should get the first and the last activity', () => {
    const activityA = new Activity(new Date(20), new Date(30), ActivityTypes.Running, new Creator('Test'));
    const activityB = new Activity(new Date(0), new Date(10), ActivityTypes.Running, new Creator('Test'));

    event.addActivity(activityA);
    event.addActivity(activityB);

    // Should get them sorted by date
    expect(event.getFirstActivity()).toEqual(activityB);
    expect(event.getLastActivity()).toEqual(activityA);
  });

  it('should export correctly to JSON', () => {
    const d1 = new Date(0);
    const d2 = new Date(new Date(0).getTime() + 200);
    const activity = new Activity(d1, d2, ActivityTypes.Running, new Creator('Test'));
    event.addActivity(activity);
    event.setID('123');
    jest.spyOn(activity, 'toJSON').mockImplementation(() => {
      return <ActivityJSONInterface>{};
    });
    expect(event.toJSON()).toEqual({
      name: 'Test',
      description: 'Test',
      isMerge: false,
      privacy: 'private',
      stats: {},
      startDate: d1.getTime(),
      endDate: d2.getTime()
    });
  });
});
