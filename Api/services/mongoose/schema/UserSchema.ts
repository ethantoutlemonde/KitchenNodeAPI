import { Schema } from "mongoose";
import { IUser } from "../../../models";

export const userSchema = new Schema<IUser>({
    Mail: {
        type: String
    },
    Password: {
        type: String
    },
    Nom: {
        type: String,
        required: true
    },
    Prenom: {
        type: String,
        required: true
    },
    Tel: {
        type: String
    },
    Role: {
        type: String,
        enum: ['Bigboss', 'Admin', 'Customer', 'Preparateur', 'Livreur'],
        required: true
    },
    Adresse: {
        type: Schema.Types.ObjectId,
        ref: 'Adresse',
        required: true
    }
}, {
    timestamps: true,
    collection: 'users',
    versionKey: false
});