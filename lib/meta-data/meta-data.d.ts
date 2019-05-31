import { MetaDataInterface, ServiceNames } from './meta-data.interface';
import { MetaDataJsonInterface } from './meta-data.json.interface';
export declare class MetaData implements MetaDataInterface {
    date: Date;
    serviceWorkoutID: string;
    serviceName: ServiceNames;
    serviceUserName: string;
    constructor(service: ServiceNames, serviceWorkoutID: string, serviceUser: string, date: Date);
    toJSON(): MetaDataJsonInterface;
}
