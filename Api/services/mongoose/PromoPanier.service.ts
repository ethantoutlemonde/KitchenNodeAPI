import { Model } from "mongoose";
import { IPromoPanier } from "../../models";
import { promoPanierSchema } from "./schema";
import mongoose from "mongoose";

export class PromoPanierService {
    private model: Model<IPromoPanier>;

    constructor() {
        this.model = mongoose.model<IPromoPanier>("PromoPanier", promoPanierSchema);
    }

    // Créer un promo-panier
    async createPromoPanier(panier: string, promotion: string): Promise<IPromoPanier> {
        const promoPanier = new this.model({ Panier: panier, Promotion: promotion });
        return await promoPanier.save();
    }

    // Obtenir tous les promo-paniers
    async getPromoPaniers(): Promise<IPromoPanier[]> {
        return await this.model.find().populate("Panier").populate("Promotion").exec();
    }

    // Obtenir un promo-panier par ID
    async getPromoPanierById(id: string): Promise<IPromoPanier | null> {
        return await this.model.findById(id).populate("Panier").populate("Promotion").exec();
    }

    // Mettre à jour un promo-panier
    async updatePromoPanier(id: string, data: Partial<IPromoPanier>): Promise<IPromoPanier | null> {
        return await this.model.findByIdAndUpdate(id, data, { new: true }).exec();
    }

    // Supprimer un promo-panier
    async deletePromoPanier(id: string): Promise<IPromoPanier | null> {
        return await this.model.findByIdAndDelete(id).exec();
    }
}
