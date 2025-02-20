import { Types } from "mongoose";

export interface IConfectionne {
    User: Types.ObjectId; // Référence à la collection User
    Commande: Types.ObjectId; // Référence à la collection Commande
}