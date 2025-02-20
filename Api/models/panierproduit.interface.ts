import { Types } from "mongoose";

export interface IPanierProduit {
    Produit: Types.ObjectId; // Référence à la collection Produit
    Panier: Types.ObjectId; // Référence à la collection Panier
}