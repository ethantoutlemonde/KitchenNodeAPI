import { Schema } from "mongoose";
import { IPromoProduit } from "../../../models";

export const promoProduitSchema = new Schema<IPromoProduit>({
    Produit: {
        type: Schema.Types.ObjectId,
        ref: 'Produit',
        required: true
    },
    Promotion: {
        type: Schema.Types.ObjectId,
        ref: 'Promotion',
        required: true
    }
}, {
    timestamps: true,
    collection: 'promoProduits',
    versionKey: false
});