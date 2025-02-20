import { Schema } from "mongoose";
import { IRestaurant } from "../../../models";

export const restaurantSchema = new Schema<IRestaurant>({
    Nom: {
        type: String,
        required: true
    },
    Tel: {
        type: String
    },
    Adresse: {
        type: Schema.Types.ObjectId,
        ref: 'Adresse',
        required: true,
        unique: true
    }
}, {
    timestamps: true,
    collection: 'restaurants',
    versionKey: false
});