import {IMenuSchema} from "../../../models";
import {Schema} from "mongoose";

export const MenuSchema = new Schema({
    nom: { type: String, required: true },
    description: { type: String, required: true },
    prix: { type: Number, required: true },
    image: { type: String, required: true },
    disponible: { type: Boolean, required: true },
    produits: [{ type: Schema.Types.ObjectId, ref: 'Produit' }]
  }, {
    timestamps: true,
    collection: 'menus',
    versionKey: false,
  });