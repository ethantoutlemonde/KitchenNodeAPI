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
        required: false
    },
    Tel: {
        type: String,
        required: false
    },
    Role: {
        type: String,
        enum: ['Bigboss', 'Admin', 'Customer', 'Preparateur', 'Livreur'],
        required: false
    },
    Adresse: {
        type: Schema.Types.ObjectId,
        ref: 'Adresse',
        required: false
    }
}, {
    timestamps: true,
    collection: 'users',
    versionKey: false
});