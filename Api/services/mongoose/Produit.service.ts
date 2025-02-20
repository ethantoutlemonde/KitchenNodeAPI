import { Schema } from "mongoose";
import { IProduit } from "../../../models";

export const produitSchema = new Schema<IProduit>({
    Nom: {
        type: String,
        required: true
    },
    Description: {
        type: String,
        required: true
    },
    Prix: {
        type: Number,
        required: true
    },
    Image: {
        type: String,
        required: true
    },
    Disponible: {
        type: Boolean,
        required: true
    }
}, {
    timestamps: true,
    collection: 'produits',
    versionKey: false
});