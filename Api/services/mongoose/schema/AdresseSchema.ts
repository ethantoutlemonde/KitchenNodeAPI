import { Schema } from "mongoose";
import { IAdresse } from "../../../models";

export const adresseSchema = new Schema<IAdresse>({
    Numero: {
        type: Number
    },
    Rue: {
        type: String,
        required: true
    },
    Ville: {
        type: String,
        required: true
    },
    CodePostal: {
        type: Number,
        required: true
    }
}, {
    timestamps: true,
    collection: 'adresses',
    versionKey: false
});