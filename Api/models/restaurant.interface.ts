import { Types } from "mongoose";

export interface IRestaurant {
    Nom: string;
    Tel?: string;
    Adresse: Types.ObjectId; // Référence à la collection Adresse
}