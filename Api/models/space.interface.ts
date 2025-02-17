import {ITimestamp} from "./timestamp.interface";
import {IZoo} from "./zoo.interface";

export enum ISpaceType {
    indoor = 'indoor',
    outdoor = 'outdoor',
}

export enum ISpaceAccessibility {
    handicapped = 'handicapped',
}

export interface ISpace extends ITimestamp {
    _id: string;
    zoo: string | IZoo;
    name: string;
    description: string;
    images: string[];
    types: ISpaceType[];
    capacity: number;
    visitorDuration: number;
    openingHours: number; // 10h25 -> 60*10 + 25
    closingHours: number; // 17h25 -> 60*17 + 25
    accessibility: ISpaceAccessibility[];
    disabled: boolean;
}