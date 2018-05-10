import {GeoLibAdapterInterface} from './adapter.interface';
import {DistanceSimple} from './distance/distance.geolib.simple.adapter';
import {DistanceVincenty} from './distance/distance.geolib.vincenty.adapter';
import {DistanceAdapterInterface} from './distance/distance.adapter.interface';
import {PointInterface} from '../../points/point.interface';

export class GeoLibAdapter implements GeoLibAdapterInterface {

  public distanceAdapter: DistanceAdapterInterface;

  constructor(useSimpleDistance?: boolean) {
    this.distanceAdapter = useSimpleDistance ? new DistanceSimple() : new DistanceVincenty();
  }

  getDistance(points: PointInterface[], accuracyInMeters?: number, precision?: number): number {
    return this.distanceAdapter.getDistance(points, accuracyInMeters, precision);
  }
}
