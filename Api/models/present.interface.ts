import { Types } from "mongoose";

export interface IPresent {
    Restaurant: Types.ObjectId; // Référence à la collection Restaurant
    Promotion: Types.ObjectId; // Référence à la collection Promotion
}