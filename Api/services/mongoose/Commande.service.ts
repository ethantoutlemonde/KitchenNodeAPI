import { Schema } from "mongoose";
import { ICommande } from "../../../models";

export const commandeSchema = new Schema<ICommande>({
    Numero: {
        type: Number,
        required: true
    },
    Status: {
        type: String,
        enum: ['Paye', 'en cours de preparation', 'en cours de livaison', 'livre'],
        required: true
    },
    Latitude: {
        type: Number,
        required: true
    },
    Longitude: {
        type: Number,
        required: true
    },
    Adresse: {
        type: Schema.Types.ObjectId,
        ref: 'Adresse',
        required: true
    },
    User: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        unique: true
    },
    Panier: {
        type: Schema.Types.ObjectId,
        ref: 'Panier',
        required: true,
        unique: true
    }
}, {
    timestamps: true,
    collection: 'commandes',
    versionKey: false
});