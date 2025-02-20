import { Types } from "mongoose";

export interface IPromoPanier {
    Promotion: Types.ObjectId; // Référence à la collection Promotion
    Panier: Types.ObjectId; // Référence à la collection Panier
}