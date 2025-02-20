import {IPanierSchema} from "../../../models";
import {Schema} from "mongoose";

export const PanierSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User', unique: true }
  }, {
    timestamps: true,
    collection: 'paniers',
    versionKey: false,
  });