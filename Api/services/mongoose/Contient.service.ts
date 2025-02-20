import { Model } from "mongoose";
import { IContient } from "../../models";
import { contientSchema } from "./schema";
import mongoose from "mongoose";

export class ContientService {
    private model: Model<IContient>;

    constructor() {
        this.model = mongoose.model<IContient>("Contient", contientSchema);
    }

    // Créer un contient
    async createContient(menu: string, ingredient: string): Promise<IContient> {
        const contient = new this.model({ Menu: menu, Ingredient: ingredient });
        return await contient.save();
    }

    // Obtenir tous les contient
    async getContients(): Promise<IContient[]> {
        return await this.model.find().populate("Menu").populate("Ingredient").exec();
    }

    // Obtenir un contient par ID
    async getContientById(id: string): Promise<IContient | null> {
        return await this.model.findById(id).populate("Menu").populate("Ingredient").exec();
    }

    // Mettre à jour un contient
    async updateContient(id: string, data: Partial<IContient>): Promise<IContient | null> {
        return await this.model.findByIdAndUpdate(id, data, { new: true }).exec();
    }

    // Supprimer un contient
    async deleteContient(id: string): Promise<IContient | null> {
        return await this.model.findByIdAndDelete(id).exec();
    }
}
