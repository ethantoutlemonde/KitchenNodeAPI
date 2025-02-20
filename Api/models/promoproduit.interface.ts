import { Types } from "mongoose";

export interface IPromoProduit {
    Produit: Types.ObjectId; // Référence à la collection Produit
    Promotion: Types.ObjectId; // Référence à la collection Promotion
}