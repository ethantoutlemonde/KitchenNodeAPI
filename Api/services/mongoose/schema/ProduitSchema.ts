import { Schema } from "mongoose";

export const ProduitSchema = new Schema({
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