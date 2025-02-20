import {IRestaurantSchema} from "../../../models";
import {Schema} from "mongoose";

export const RestaurantSchema = new Schema({
    nom: { type: String, required: true },
    tel: String,
    adresse: { type: Schema.Types.ObjectId, ref: 'Adresse', required: true }
  }, {
    timestamps: true,
    collection: 'restaurants',
    versionKey: false,
  });