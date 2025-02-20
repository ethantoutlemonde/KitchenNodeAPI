import {IUserSchema} from "../../../models";
import {Schema} from "mongoose";

export const UserSchema = new Schema({
    mail: String,
    password: String,
    nom: { type: String, required: true },
    prenom: { type: String, required: true },
    tel: String,
    role: { type: String, enum: ['Bigboss', 'Admin', 'Customer', 'Preparateur', 'Livreur'], required: true },
    adresse: { type: Schema.Types.ObjectId, ref: 'Adresse', required: true }
  }, {
    timestamps: true,
    collection: 'users',
    versionKey: false,
  });