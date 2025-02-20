import { Types } from "mongoose";

export interface IAdmin {
    User: Types.ObjectId; // Référence à la collection User
    Restaurant: Types.ObjectId; // Référence à la collection Restaurant
}