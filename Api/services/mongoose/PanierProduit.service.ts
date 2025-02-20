import { Model } from "mongoose";
import { IPanierProduit } from "../../models";
import { panierProduitSchema } from "./schema";
import mongoose from "mongoose";

export class PanierProduitService {
    private model: Model<IPanierProduit>;

    constructor() {
        this.model = mongoose.model<IPanierProduit>("PanierProduit", panierProduitSchema);
    }

    // Créer un panier-produit
    async createPanierProduit(panier: string, produit: string): Promise<IPanierProduit> {
        const panierProduit = new this.model({ Panier: panier, Produit: produit });
        return await panierProduit.save();
    }

    // Obtenir tous les panier-produits
    async getPanierProduits(): Promise<IPanierProduit[]> {
        return await this.model.find().populate("Panier").populate("Produit").exec();
    }

    // Obtenir un panier-produit par ID
    async getPanierProduitById(id: string): Promise<IPanierProduit | null> {
        return await this.model.findById(id).populate("Panier").populate("Produit").exec();
    }

    // Mettre à jour un panier-produit
    async updatePanierProduit(id: string, data: Partial<IPanierProduit>): Promise<IPanierProduit | null> {
        return await this.model.findByIdAndUpdate(id, data, { new: true }).exec();
    }

    // Supprimer un panier-produit
    async deletePanierProduit(id: string): Promise<IPanierProduit | null> {
        return await this.model.findByIdAndDelete(id).exec();
    }
}
