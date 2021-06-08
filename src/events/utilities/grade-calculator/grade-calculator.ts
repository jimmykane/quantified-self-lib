import { isNumber } from '../helpers';
import { LowPassFilter } from './low-pass-filter';

const KalmanFilter = require('kalmanjs');

export const CLAMP = 40;
export const LOOK_AHEAD_IN_SECONDS = 2;
export const LOOK_AHEAD_IN_METERS = 15;

export class GradeCalculator {
  public static computeGrade(
    previousDistance: number | null,
    currentDistance: number | null,
    previousAltitude: number | null,
    currentAltitude: number | null
  ): number {
    previousDistance = previousDistance !== null ? previousDistance : 0;
    currentDistance = currentDistance !== null ? currentDistance : 0;
    previousAltitude = previousAltitude !== null ? previousAltitude : 0;
    currentAltitude = currentAltitude !== null ? currentAltitude : 0;

    const distanceDelta = currentDistance - previousDistance;
    const altitudeDelta = currentAltitude - previousAltitude;
    if (distanceDelta === 0) {
      return 0;
    }
    let percentage: number = (altitudeDelta / distanceDelta) * 100;
    percentage = Math.min(Math.max(percentage, -CLAMP), CLAMP); // Clamp between -CLAMP% & CLAMP%
    return Math.round(percentage * 10) / 10;
  }

  // Find the next i for distance = prev distance + 5m
  // @todo perhaps this threshold should be per avg speed / activity type
  // Or just perhaps the speed?
  // Perhaps round
  public static computeGradeStream(
    distanceStream: (number | null)[],
    altitudeStream: (number | null)[],
    filterAltitude = true,
    filterGrade = true,
    basedOnAltitude = false,
    lookAhead = true,
    lookAheadInTime = false
  ): (number | null)[] {
    // First filter the altitude to remove any noise and predict
    if (filterAltitude) {
      const kf = new KalmanFilter();
      altitudeStream = altitudeStream.map(v => (v === null ? null : kf.filter(v)));
    }

    let gradeStream = basedOnAltitude
      ? this.computeGradeStreamBasedOnAltitude(distanceStream, altitudeStream, lookAhead, lookAheadInTime)
      : this.computeGradeStreamBasedOnDistance(distanceStream, altitudeStream, lookAhead, lookAheadInTime);

    if (filterGrade) {
      const kf = new KalmanFilter();
      gradeStream = gradeStream.map(v => (v === null ? null : kf.filter(v)));
      gradeStream = new LowPassFilter(0.5).smoothArray(gradeStream);
    }
    return gradeStream.map(v => (v === null ? null : Math.round(v * 10) / 10));
  }

  /**
   * Contains a 5th order equation which models the Strava GAP behavior described on picture "./fixture/strava_gap_modelization.png"
   *
   * This Strava GAP behavior is described by the below data
   * [{ grade: -34, speedFactor: 1.7 }, { grade: -32, speedFactor: 1.6 }, { grade: -30, speedFactor: 1.5 },
   * { grade: -28, speedFactor: 1.4 }, { grade: -26, speedFactor: 1.3 }, { grade: -24, speedFactor: 1.235 },
   * { grade: -22, speedFactor: 1.15 }, { grade: -20, speedFactor: 1.09 }, { grade: -18, speedFactor: 1.02 },
   * { grade: -16, speedFactor: 0.95 }, { grade: -14, speedFactor: 0.91 }, { grade: -12, speedFactor: 0.89 },
   * { grade: -10, speedFactor: 0.88 }, { grade: -8, speedFactor: 0.88 }, { grade: -6, speedFactor: 0.89 },
   * { grade: -4, speedFactor: 0.91 }, { grade: -2, speedFactor: 0.95 }, { grade: 0, speedFactor: 1 },
   * { grade: 2, speedFactor: 1.05 }, { grade: 4, speedFactor: 1.14 }, { grade: 6, speedFactor: 1.24 },
   * { grade: 8, speedFactor: 1.34 }, { grade: 10, speedFactor: 1.47 }, { grade: 12, speedFactor: 1.5 },
   * { grade: 14, speedFactor: 1.76 }, { grade: 16, speedFactor: 1.94 }, { grade: 18, speedFactor: 2.11 },
   * { grade: 20, speedFactor: 2.3 }, { grade: 22, speedFactor: 2.4 }, { grade: 24, speedFactor: 2.48 },
   * { grade: 26, speedFactor: 2.81 }, { grade: 28, speedFactor: 3 }, { grade: 30, speedFactor: 3.16 },
   * { grade: 32, speedFactor: 3.31 }, { grade: 34, speedFactor: 3.49 } ]
   *
   * The 5th order equation has been curve fitted using plot.ly
   */
  public static estimateAdjustedSpeed(speedMeterSeconds: number, grade: number): number {
    const kA = 0.9944001227713231;
    const kB = 0.029290920646623777;
    const kC = 0.0018083953212790634;
    const kD = 4.0662425671715924e-7;
    const kE = -3.686186584867523e-7;
    const kF = -2.6628107325930747e-9;
    const speedAdjust =
      kA +
      kB * grade +
      kC * Math.pow(grade, 2) +
      kD * Math.pow(grade, 3) +
      kE * Math.pow(grade, 4) +
      kF * Math.pow(grade, 5);
    return speedMeterSeconds * speedAdjust;
  }

  private static computeGradeStreamBasedOnDistance(
    distanceStream: (number | null)[],
    altitudeStream: (number | null)[],
    lookAhead: boolean,
    lookAheadInTime: boolean
  ): (number | null)[] {
    const numericAltitudeStream = this.getAltitudeStreamRepaired(altitudeStream);

    // Reset previous altitude to first element of the numeric array
    let previousAltitude = numericAltitudeStream[0];
    let previousDistance = 0;

    // Start
    const gradeStream = Array(altitudeStream.length).fill(null);
    for (let i = 0; i < distanceStream.length; i++) {
      let nextIndex = 0;
      if (lookAheadInTime && lookAhead) {
        nextIndex = LOOK_AHEAD_IN_SECONDS;
      } else if (lookAhead) {
        nextIndex = distanceStream
          .slice(i)
          .findIndex(d => (d === null ? false : d >= previousDistance + LOOK_AHEAD_IN_METERS));
      }
      nextIndex = nextIndex === -1 ? 0 : nextIndex;
      // Set the distance
      previousDistance = distanceStream[i - 1] || previousDistance;
      const currentDistance = distanceStream[i + nextIndex] || previousDistance; // If no distance current distance will be prev

      // Find the previous altitude if possible or use an older value
      previousAltitude = isNumber(numericAltitudeStream[i - 1]) ? numericAltitudeStream[i - 1] : previousAltitude;

      // If the current (real) distance is null return null and buffer the previous altitude till distance is not null
      if (distanceStream[i] === null) {
        numericAltitudeStream[i] = previousAltitude;
        gradeStream[i] = null;
        continue;
      }

      // perhaps the altitude based can benefit
      if (currentDistance - previousDistance === 0) {
        numericAltitudeStream[i] = previousAltitude;
        gradeStream[i] = 0;
        continue;
      }

      // Set the current altitude
      const currentAltitude = numericAltitudeStream[i + nextIndex] || previousDistance;

      // Calc
      gradeStream[i] = GradeCalculator.computeGrade(
        previousDistance,
        currentDistance,
        previousAltitude,
        currentAltitude
      );
    }
    return gradeStream;
  }

  private static computeGradeStreamBasedOnAltitude(
    distanceStream: (number | null)[],
    altitudeStream: (number | null)[],
    lookAhead: boolean,
    lookAheadInTime: boolean
  ): (number | null)[] {
    const numericAltitudeStream = this.getAltitudeStreamRepaired(altitudeStream);
    const numericDistanceStream = this.getDistanceStreamRepaired(distanceStream);

    // Reset previous altitude to first element of the numeric array
    let previousAltitude = numericAltitudeStream[0];
    let previousDistance = 0;

    // Start
    const gradeStream = Array(altitudeStream.length).fill(null);
    for (let i = 0; i < altitudeStream.length; i++) {
      let nextIndex = 0;
      if (lookAheadInTime && lookAhead) {
        nextIndex = LOOK_AHEAD_IN_SECONDS;
      } else if (lookAhead) {
        nextIndex = distanceStream
          .slice(i)
          .findIndex(d => (d === null ? false : d >= previousDistance + LOOK_AHEAD_IN_METERS));
      }
      nextIndex = nextIndex === -1 ? 0 : nextIndex;

      // We need to check against 0's with is number
      previousAltitude = isNumber(numericAltitudeStream[i - 1])
        ? <number>numericAltitudeStream[i - 1]
        : previousAltitude;
      const currentAltitude = numericAltitudeStream[i + nextIndex] || previousAltitude;

      previousDistance = isNumber(numericDistanceStream[i - 1]) ? numericDistanceStream[i - 1] : previousDistance;

      // If based on altitude return null where altitude is null
      if (altitudeStream[i] === null) {
        numericDistanceStream[i] = previousDistance;
        gradeStream[i] = null;
        continue;
      }

      previousDistance = numericDistanceStream[i - 1] || previousDistance;
      const currentDistance = numericDistanceStream[i + nextIndex] || previousDistance;

      // Calc
      gradeStream[i] = GradeCalculator.computeGrade(
        previousDistance,
        currentDistance,
        previousAltitude,
        currentAltitude
      );
    }
    return gradeStream;
  }

  private static getAltitudeStreamRepaired(altitudeStream: (number | null)[]): number[] {
    // Back and forth fill a new altitude stream.
    let altitudeSearch = <number>altitudeStream.find(v => v !== null);
    // @todo If there is no altitude in the altitude array we just should return an grade stream of 0's
    return altitudeStream.reduce((accu: number[], value) => {
      altitudeSearch = value !== null ? value : altitudeSearch;
      accu.push(altitudeSearch);
      return accu;
    }, []);
  }

  private static getDistanceStreamRepaired(distanceStream: (number | null)[]): number[] {
    // Back and forth fill a new Distance stream.
    let previousDistance = 0;
    return distanceStream.reduce((accu: number[], value) => {
      previousDistance = value !== null ? value : previousDistance;
      accu.push(previousDistance);
      return accu;
    }, []);
  }
}
