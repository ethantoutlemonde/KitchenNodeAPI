import { Types } from "mongoose";

export interface IVend {
    Restaurant: Types.ObjectId; // Référence à la collection Restaurant
    Produit: Types.ObjectId; // Référence à la collection Produit
}