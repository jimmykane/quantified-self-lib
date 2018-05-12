import {StatsClassInterface} from './stats.class.interface';
import {IDClass} from '../id/id.abstract.class';
import {DataDuration} from '../data/data.duration';
import {DataDistance} from '../data/data.distance';
import {DataInterface} from '../data/data.interface';
import {DataPause} from '../data/data.pause';

export abstract class StatsClassAbstract extends IDClass implements StatsClassInterface {
  public stats = new Map<string, DataInterface>();

  getDistance(): DataDistance {
    return <DataDistance>this.stats.get(DataDistance.className);
  }

  getDuration(): DataDuration {
    return <DataDuration>this.stats.get(DataDuration.className);
  }

  getPause(): DataPause {
    return <DataPause>this.stats.get(DataPause.className);
  }

  getStat(statType: string): DataInterface | void {
    return this.stats.get(statType);
  }

  getStats(): Map<string, DataInterface> {
    return this.stats;
  }

  removeStat(statType: string) {
    this.stats.delete(statType);
  }

  setDistance(distance: DataDistance) {
    this.stats.set(DataDistance.className, distance);
  }

  setDuration(duration: DataDuration) {
    this.stats.set(DataDuration.className, duration);
  }

  setPause(pause: DataPause) {
    this.stats.set(DataPause.className, pause);
  }

  addStat(stat: DataInterface) {
    this.stats.set(stat.getClassName(), stat);
  }
}
