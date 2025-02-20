import { Types } from "mongoose";

export interface IContient {
    Produit: Types.ObjectId; // Référence à la collection Produit
    Ingredient: Types.ObjectId; // Référence à la collection Ingredient
    Quantite: number;
}