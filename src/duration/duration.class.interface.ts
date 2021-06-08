import { DataPause } from '../data/data.pause';
import { DataDuration } from '../data/data.duration';
import { DataTimerTime } from '../data/data.timer-time';
import { DataMovingTime } from '../data/data.moving-time';

export interface DurationClassInterface {
  startDate: Date;
  endDate: Date;

  /**
   * Returns the duration in seconds
   * (This excludes pauses)
   */
  getDuration(): DataDuration;

  /**
   * Returns the timer in seconds
   * (This excludes pauses)
   */
  getTimer(): DataTimerTime;

  /**
   * Returns the moving time in seconds
   * (This excludes pauses)
   */
  getMovingTime(): DataMovingTime;

  /**
   * Returns the paused time
   */
  getPause(): DataPause;

  setDuration(duration: DataDuration): void;

  setTimer(duration: DataTimerTime): void;

  setMovingTime(duration: DataMovingTime): void;

  setPause(pause: DataPause): void;
}
