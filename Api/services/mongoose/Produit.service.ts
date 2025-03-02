import { Model } from "mongoose";
import { IProduit } from "../../models";
import { ProduitSchema } from "./schema";
import mongoose from "mongoose";

export class ProduitService {
    private model: Model<IProduit>;

    constructor() {
        this.model = mongoose.model<IProduit>("Produit", ProduitSchema);
    }

    // Créer un produit
    async createProduit(nom: string, prix: number, description : string, image: string, disponible:boolean): Promise<IProduit> {
        const produit = new this.model({ Nom: nom, Prix: prix, Description: description, Image: image, Disponible: disponible });
        return await produit.save();
    }

    // Obtenir tous les produits
    async getProduits(): Promise<IProduit[]> {
        return await this.model.find().exec();
    }

    // Obtenir un produit par ID
    async getProduitById(id: string): Promise<IProduit | null> {
        return await this.model.findById(id).exec();
    }

    // Mettre à jour un produit
    async updateProduit(id: string, data: Partial<IProduit>): Promise<IProduit | null> {
        return await this.model.findByIdAndUpdate(id, data, { new: true }).exec();
    }

    // Supprimer un produit
    async deleteProduit(id: string): Promise<IProduit | null> {
        return await this.model.findByIdAndDelete(id).exec();
    }
}
