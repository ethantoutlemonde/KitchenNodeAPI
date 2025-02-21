import { Model } from "mongoose";
import { IVend } from "../../models";
import { vendreSchema } from "./schema";
import mongoose from "mongoose";

export class VendreService {
    private model: Model<IVend>;

    constructor() {
        this.model = mongoose.model<IVend>("Vendre", vendreSchema);
    }

    // Créer une vente
    async createVendre(Restaurant: string, Produit: string): Promise<IVend> {
        const vente = new this.model({ Restaurant, Produit });
        return await vente.save();
    }

    // Obtenir toutes les ventes
    async getVentes(): Promise<IVend[]> {
        return await this.model.find().populate("User").populate("Produit").exec();
    }

    // Obtenir une vente par ID
    async getVendreById(id: string): Promise<IVend | null> {
        return await this.model.findById(id).populate("User").populate("Produit").exec();
    }

    // Mettre à jour une vente
    async updateVendre(id: string, data: Partial<IVend>): Promise<IVend | null> {
        return await this.model.findByIdAndUpdate(id, data, { new: true }).exec();
    }

    // Supprimer une vente
    async deleteVendre(id: string): Promise<IVend | null> {
        return await this.model.findByIdAndDelete(id).exec();
    }
}
