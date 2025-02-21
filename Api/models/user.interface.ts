import { Types } from "mongoose";

export interface IUser {
    Mail?: string;
    Password?: string;
    Salt?: string;
    Nom: string;
    Prenom: string;
    Tel?: string;
    Role: 'Bigboss' | 'Admin' | 'Customer' | 'Preparateur' | 'Livreur';
    Adresse: Types.ObjectId; // Référence à la collection Adresse
}