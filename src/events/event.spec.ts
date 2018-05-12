import {EventInterface} from './event.interface';
import {Event} from './event';
import {Activity} from '../activities/activity';
import {Point} from '../points/point';
import {DataLatitudeDegrees} from '../data/data.latitude-degrees';
import {DataLongitudeDegrees} from '../data/data.longitude-degrees';
import {Creator} from '../creators/creator';
import {ActivityTypes} from '../activities/activity.types';

describe('Event', () => {

  let event: EventInterface;

  beforeEach(() => {
    event = new Event('Test');
  });

  it('should add an activity', () => {
    expect(event.getActivities().length).toBe(0);
    event.addActivity(new Activity(new Date(0), new Date((new Date(0)).getTime() + 10), ActivityTypes.Running, new Creator('Test')));
    expect(event.getActivities().length).toBe(1);
  });

  it('should remove an activity', () => {
    const activity = new Activity(new Date(0), new Date((new Date(0)).getTime() + 10), ActivityTypes.Running, new Creator('Test'));
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


  it('should get an empty point array if no activity points', () => {
    const activityA = new Activity(new Date(0), new Date((new Date(0)).getTime() + 10), ActivityTypes.Running, new Creator('Test'));
    const activityB = new Activity(new Date(20), new Date((new Date(20)).getTime() + 30), ActivityTypes.Running, new Creator('Test'));

    event.addActivity(activityA);
    event.addActivity(activityB);
    expect(event.getPoints().length).toBe(0);
    expect(event.getPoints(null, null, [activityA]).length).toBe(0);
    expect(event.getPoints(null, null, [activityB]).length).toBe(0);
  });


  it('should get the correct points', () => {
    const activityA = new Activity(new Date(0), new Date((new Date(0)).getTime() + 10), ActivityTypes.Running, new Creator('Test'));
    activityA.addPoint(new Point(new Date(0)));
    activityA.addPoint(new Point(new Date(10)));
    activityA.addPoint(new Point(new Date(20)));
    activityA.addPoint(new Point(new Date(30)));
    const activityB = new Activity(new Date(20), new Date((new Date(20)).getTime() + 30), ActivityTypes.Running, new Creator('Test'));
    activityB.addPoint(new Point(new Date(0)));
    activityB.addPoint(new Point(new Date(10)));
    activityB.addPoint(new Point(new Date(20)));

    const activityC = new Activity(new Date(30), new Date((new Date(30)).getTime() + 40), ActivityTypes.Running, new Creator('Test'));
    activityC.addPoint(new Point(new Date(40)));
    activityC.addPoint(new Point(new Date(50)));

    event.addActivity(activityA);
    event.addActivity(activityB);
    event.addActivity(activityC);
    expect(event.getPoints().length).toBe(9);
    expect(event.getPoints(null, null, [activityA]).length).toBe(4);
    expect(event.getPoints(null, null, [activityB]).length).toBe(3);
    expect(event.getPoints(null, null, [activityC]).length).toBe(2);
    expect(event.getPoints(null, null, [activityA, activityB]).length).toBe(7);
    expect(event.getPoints(null, null, [activityA, activityC]).length).toBe(6);
    expect(event.getPoints(null, null, [activityB, activityC]).length).toBe(5);
  });


  it('should get a zero array if no points with position', () => {
    expect(event.getPointsWithPosition().length).toBe(0);
  });

  it('should get the points with position', () => {
    const activity = new Activity(new Date(0), new Date((new Date(0)).getTime() + 10), ActivityTypes.Running, new Creator('Test'));
    let point = new Point(new Date(0));
    point.addData(new DataLatitudeDegrees(0));
    point.addData(new DataLongitudeDegrees(0));
    activity.addPoint(point);
    event.addActivity(activity);

    expect(event.getPointsWithPosition().length).toBe(1);
    // Add another point
    point = new Point(new Date(10));
    point.addData(new DataLatitudeDegrees(0));
    point.addData(new DataLongitudeDegrees(0));
    activity.addPoint(point);
    expect(event.getPointsWithPosition().length).toBe(2);
  });

  it('should export correctly to JSON', () => {
    const activity = new Activity(new Date(0), new Date((new Date(0)).getTime() + 10), ActivityTypes.Running, new Creator('Test'));
    event.addActivity(activity);
    event.setID('123');
    spyOn(activity, 'toJSON').and.returnValue({});
    expect(event.toJSON()).toEqual({
      'id': '123',
      'name': 'Test',
      'activities': [{}],
      'stats': [],
    });
  });
});
