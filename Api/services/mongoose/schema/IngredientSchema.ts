import {IIngredientSchema} from "../../../models";
import {Schema} from "mongoose";

export const IngredientSchema = new Schema({
    nom: { type: String, required: true }
  }, {
    timestamps: true,
    collection: 'ingredients',
    versionKey: false,
  });