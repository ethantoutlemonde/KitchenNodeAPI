import { Model } from "mongoose";
import { IIngredient } from "../../models";
import { ingredientSchema } from "./schema";
import mongoose from "mongoose";

export class IngredientService {
    private model: Model<IIngredient>;

    constructor() {
        this.model = mongoose.model<IIngredient>("Ingredient", ingredientSchema);
    }

    // Créer un ingrédient
    async createIngredient(nom: string): Promise<IIngredient> {
        const ingredient = new this.model({ Nom: nom});
        return await ingredient.save();
    }

    // Obtenir tous les ingrédients
    async getIngredients(): Promise<IIngredient[]> {
        return await this.model.find().exec();
    }

    // Obtenir un ingrédient par ID
    async getIngredientById(id: string): Promise<IIngredient | null> {
        return await this.model.findById(id).exec();
    }

    // Mettre à jour un ingrédient
    async updateIngredient(id: string, data: Partial<IIngredient>): Promise<IIngredient | null> {
        return await this.model.findByIdAndUpdate(id, data, { new: true }).exec();
    }

    // Supprimer un ingrédient
    async deleteIngredient(id: string): Promise<IIngredient | null> {
        return await this.model.findByIdAndDelete(id).exec();
    }
}
