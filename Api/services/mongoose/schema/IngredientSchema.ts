import { Schema } from "mongoose";
import { IIngredient } from "../../../models";

export const ingredientSchema = new Schema<IIngredient>({
    Nom: {
        type: String,
        required: true
    }
}, {
    timestamps: true,
    collection: 'ingredients',
    versionKey: false
});