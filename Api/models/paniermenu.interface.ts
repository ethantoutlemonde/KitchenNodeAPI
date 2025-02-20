import { Types } from "mongoose";

export interface IPanierMenu {
    Menu: Types.ObjectId; // Référence à la collection Menu
    Panier: Types.ObjectId; // Référence à la collection Panier
}