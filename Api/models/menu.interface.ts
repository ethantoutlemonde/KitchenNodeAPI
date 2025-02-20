import { Types } from "mongoose";

export interface IMenu {
    Nom: string;
    Description: string;
    Prix: number;
    Disponible: boolean;
    Image: string;
    Produits: Types.ObjectId[]; // Référence à la collection Produits
}