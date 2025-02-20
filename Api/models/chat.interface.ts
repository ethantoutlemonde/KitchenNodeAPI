import { Types } from "mongoose";

export interface IChat {
    User1: Types.ObjectId; // Référence à la collection User
    User2: Types.ObjectId; // Référence à la collection User
    Message?: string;
    DateEnvoie: Date;
}