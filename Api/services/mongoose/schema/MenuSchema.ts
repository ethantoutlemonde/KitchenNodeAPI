import { Schema } from "mongoose";
import { IMenu } from "../../../models";

export const menuSchema = new Schema<IMenu>({
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
    Disponible: {
        type: Boolean,
        required: true
    },
    Image: {
        type: String,
        required: true
    },
    Produits: [{
        type: Schema.Types.ObjectId,
        ref: 'Produit'
    }]
}, {
    timestamps: true,
    collection: 'menus',
    versionKey: false
});