import { Types } from "mongoose";

export interface ISession {
    Token: string;
    DATEHEURE: Date;
    User: Types.ObjectId; // Référence à la collection User
}