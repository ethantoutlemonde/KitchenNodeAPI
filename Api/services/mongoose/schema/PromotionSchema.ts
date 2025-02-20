import {IPromotionSchema} from "../../../models";
import {Schema} from "mongoose";

export const PromotionSchema = new Schema({
    nom: { type: String, required: true },
    description: { type: String, required: true },
    offrePourcent: Number,
    offrePrix: Number,
    debut: { type: Date, required: true },
    fin: { type: Date, required: true }
  }, {
    timestamps: true,
    collection: 'promotions',
    versionKey: false,
  });