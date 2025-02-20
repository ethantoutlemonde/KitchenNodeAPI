import { Schema } from "mongoose";
import { IPromoPanier } from "../../../models";

export const promoPanierSchema = new Schema<IPromoPanier>({
    Promotion: {
        type: Schema.Types.ObjectId,
        ref: 'Promotion',
        required: true
    },
    Panier: {
        type: Schema.Types.ObjectId,
        ref: 'Panier',
        required: true
    }
}, {
    timestamps: true,
    collection: 'promoPaniers',
    versionKey: false
});