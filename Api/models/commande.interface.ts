import { Types } from "mongoose";

export interface ICommande {
    Numero: number;
    Status: 'Paye' | 'en cours de preparation' | 'en cours de livaison' | 'livre';
    Latitude: number;
    Longitude: number;
    Adresse: Types.ObjectId; // Référence à la collection Adresse
    User: Types.ObjectId; // Référence à la collection User
    Panier: Types.ObjectId; // Référence à la collection Panier
}