import {IAdresseSchema} from "../../../models";
import {Schema} from "mongoose";

export const AdresseSchema = new Schema({
    numero: Number,
    rue: { type: String, required: true },
    ville: { type: String, required: true },
    codePostal: { type: Number, required: true }
  }, {
    timestamps: true,
    collection: 'adresses',
    versionKey: false,
  });