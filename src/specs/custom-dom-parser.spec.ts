import fs from 'fs';
import { SportsLib } from '../index';
import { EventInterface } from '../events/event.interface';
import { ActivityTypes } from '../activities/activity.types';
import xmldom from 'xmldom';

describe('Parse using custom DOMParser (for node js)', () => {
  let domParser: DOMParser;

  beforeEach(() => {
    domParser = new xmldom.DOMParser();
  });

  it('should parse TCX file', done => {
    const path = __dirname + '/fixtures/rides/tcx/6791039036.tcx';
    const doc = domParser.parseFromString(fs.readFileSync(path).toString(), 'application/xml');

    // When
    const eventInterfacePromise = SportsLib.importFromTCX(doc);

    // Then
    eventInterfacePromise.then((event: EventInterface) => {
      const activity = event.getFirstActivity();
      expect(activity.type).toEqual(ActivityTypes.cycling);
      done();
    });
  });

  it('should parse GPX file', done => {
    const path = __dirname + '/fixtures/rides/gpx/3939576645.gpx';
    const gpxString = fs.readFileSync(path).toString();

    // When
    const eventInterfacePromise = SportsLib.importFromGPX(gpxString);

    // Then
    eventInterfacePromise.then((event: EventInterface) => {
      const activity = event.getFirstActivity();
      expect(activity.type).toEqual(ActivityTypes.cycling);
      done();
    });
  });
});
