import { Schema } from "mongoose";
import { IContient } from "../../../models";

export const contientSchema = new Schema<IContient>({
    Produit: {
        type: Schema.Types.ObjectId,
        ref: 'Produit',
        required: true
    },
    Ingredient: {
        type: Schema.Types.ObjectId,
        ref: 'Ingredient',
        required: true
    },
    Quantite: {
        type: Number,
        required: true
    }
}, {
    timestamps: true,
    collection: 'contients',
    versionKey: false
});