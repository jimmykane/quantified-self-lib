import {LapInterface} from './lap.interface';
import {Lap} from './lap';
import {LapTypes} from './lap.types';

describe('Lap', () => {

  let lap: LapInterface;

  beforeEach(() => {
    lap = new Lap(new Date(0), new Date(100));
    lap.type = LapTypes.AutoLap;
    lap.setID('123')
  });

  // Todo should test stats

  it('should export correctly to JSON', () => {
    expect(lap.toJSON()).toEqual({
      'id': '123',
      'startDate': '1970-01-01T00:00:00.000Z',
      'endDate': '1970-01-01T00:00:00.100Z',
      'type': 'Auto lap',
      'stats': [],
    });

  });
});
