import { Schema } from "mongoose";
import { IPanierProduit } from "../../../models";

export const panierProduitSchema = new Schema<IPanierProduit>({
    Produit: {
        type: Schema.Types.ObjectId,
        ref: 'Produit',
        required: true
    },
    Panier: {
        type: Schema.Types.ObjectId,
        ref: 'Panier',
        required: true
    }
}, {
    timestamps: true,
    collection: 'panierProduits',
    versionKey: false
});