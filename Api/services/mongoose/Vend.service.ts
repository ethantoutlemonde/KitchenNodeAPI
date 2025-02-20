import { Model } from "mongoose";
import { IVendre } from "../../models";
import { vendreSchema } from "./schema";
import mongoose from "mongoose";

export class VendreService {
    private model: Model<IVendre>;

    constructor() {
        this.model = mongoose.model<IVendre>("Vendre", vendreSchema);
    }

    // Créer une vente
    async createVendre(userId: string, produitId: string, quantite: number): Promise<IVendre> {
        const vente = new this.model({ User: userId, Produit: produitId, Quantite: quantite });
        return await vente.save();
    }

    // Obtenir toutes les ventes
    async getVentes(): Promise<IVendre[]> {
        return await this.model.find().populate("User").populate("Produit").exec();
    }

    // Obtenir une vente par ID
    async getVendreById(id: string): Promise<IVendre | null> {
        return await this.model.findById(id).populate("User").populate("Produit").exec();
    }

    // Mettre à jour une vente
    async updateVendre(id: string, data: Partial<IVendre>): Promise<IVendre | null> {
        return await this.model.findByIdAndUpdate(id, data, { new: true }).exec();
    }

    // Supprimer une vente
    async deleteVendre(id: string): Promise<IVendre | null> {
        return await this.model.findByIdAndDelete(id).exec();
    }
}
