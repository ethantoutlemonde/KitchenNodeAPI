import {ITimestamp} from "./timestamp.interface";

export interface IZoo extends ITimestamp {
    _id: string;
    name: string;
}