import {IUser} from "./user.interface";
import {ITimestamp} from "./timestamp.interface";

export interface ISession extends ITimestamp {
    _id: string;
    user: string | IUser; // soit l'id du user soit l'objet
}