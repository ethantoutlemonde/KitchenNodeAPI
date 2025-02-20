import { Document } from "mongoose";

export interface IProduit extends Document {
    Nom: string;
    Description: string;
    Prix: number;
    Image: string;
    Disponible: boolean;
}