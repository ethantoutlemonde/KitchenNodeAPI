import { Schema } from "mongoose";
import { IPromotion } from "../../../models";

export const promotionSchema = new Schema<IPromotion>({
    Nom: {
        type: String,
        required: true
    },
    Description: {
        type: String,
        required: true
    },
    OffrePourcent: {
        type: Number
    },
    OffrePrix: {
        type: Number
    },
    Debut: {
        type: Date,
        required: true
    },
    Fin: {
        type: Date,
        required: true
    }
}, {
    timestamps: true,
    collection: 'promotions',
    versionKey: false
});