import { Model } from "mongoose";
import { IPromoProduit } from "../../models";
import { promoProduitSchema } from "./schema";
import mongoose from "mongoose";

export class PromoProduitService {
    private model: Model<IPromoProduit>;

    constructor() {
        this.model = mongoose.model<IPromoProduit>("PromoProduit", promoProduitSchema);
    }

    // Créer un promo-produit
    async createPromoProduit(produit: string, promotion: string): Promise<IPromoProduit> {
        const promoProduit = new this.model({ Produit: produit, Promotion: promotion });
        return await promoProduit.save();
    }

    // Obtenir tous les promo-produits
    async getPromoProduits(): Promise<IPromoProduit[]> {
        return await this.model.find().populate("Produit").populate("Promotion").exec();
    }

    // Obtenir un promo-produit par ID
    async getPromoProduitById(id: string): Promise<IPromoProduit | null> {
        return await this.model.findById(id).populate("Produit").populate("Promotion").exec();
    }

    // Mettre à jour un promo-produit
    async updatePromoProduit(id: string, data: Partial<IPromoProduit>): Promise<IPromoProduit | null> {
        return await this.model.findByIdAndUpdate(id, data, { new: true }).exec();
    }

    // Supprimer un promo-produit
    async deletePromoProduit(id: string): Promise<IPromoProduit | null> {
        return await this.model.findByIdAndDelete(id).exec();
    }
}
