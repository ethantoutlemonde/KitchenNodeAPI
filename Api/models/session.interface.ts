import { Types } from "mongoose";
import { IUser } from "./user.interface";

export interface ISession {
    _id?: string;
    Token: string; // 🔥 Vérifie bien que ce champ existe
    user: Types.ObjectId | IUser;
    createdAt?: Date;
    updatedAt?: Date;
}
