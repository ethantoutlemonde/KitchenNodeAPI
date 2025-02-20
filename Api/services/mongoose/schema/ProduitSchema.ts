import {IProduitSchema} from "../../../models";
import {Schema} from "mongoose";

export const ProduitSchema = new Schema({
    nom: { type: String, required: true },
    description: { type: String, required: true },
    prix: { type: Number, required: true },
    image: { type: String, required: true },
    disponible: { type: Boolean, required: true }
  }, {
    timestamps: true,
    collection: 'produits',
    versionKey: false,
  });