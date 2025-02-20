import { Model } from "mongoose";
import { IPresent } from "../../models";
import { presentSchema } from "./schema";
import mongoose from "mongoose";

export class PresentService {
    private model: Model<IPresent>;

    constructor() {
        this.model = mongoose.model<IPresent>("Present", presentSchema);
    }

    // Créer un présent
    async createPresent(produit: string, promotion: string): Promise<IPresent> {
        const present = new this.model({ Produit: produit, Promotion: promotion });
        return await present.save();
    }

    // Obtenir tous les présents
    async getPresents(): Promise<IPresent[]> {
        return await this.model.find().populate("Produit").populate("Promotion").exec();
    }

    // Obtenir un présent par ID
    async getPresentById(id: string): Promise<IPresent | null> {
        return await this.model.findById(id).populate("Produit").populate("Promotion").exec();
    }

    // Mettre à jour un présent
    async updatePresent(id: string, data: Partial<IPresent>): Promise<IPresent | null> {
        return await this.model.findByIdAndUpdate(id, data, { new: true }).exec();
    }

    // Supprimer un présent
    async deletePresent(id: string): Promise<IPresent | null> {
        return await this.model.findByIdAndDelete(id).exec();
    }
}
