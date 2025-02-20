import { Schema } from "mongoose";
import { IPanier } from "../../../models";

export const panierSchema = new Schema<IPanier>({
    User: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        unique: true
    }
}, {
    timestamps: true,
    collection: 'paniers',
    versionKey: false
});