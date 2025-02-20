import { Types } from "mongoose";

export interface IPromoMenu {
    Menu: Types.ObjectId; // Référence à la collection Menu
    Promotion: Types.ObjectId; // Référence à la collection Promotion
}