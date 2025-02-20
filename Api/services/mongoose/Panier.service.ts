import { Model } from "mongoose";
import { IPanier } from "../../models";
import { panierSchema } from "./schema";
import mongoose from "mongoose";

export class PanierService {
    private model: Model<IPanier>;

    constructor() {
        this.model = mongoose.model<IPanier>("Panier", panierSchema);
    }

    // Créer un panier
    async createPanier(user: string, items: string[]): Promise<IPanier> {
        const panier = new this.model({ User: user, Items: items });
        return await panier.save();
    }

    // Obtenir tous les paniers
    async getPaniers(): Promise<IPanier[]> {
        return await this.model.find().populate("User").exec();
    }

    // Obtenir un panier par ID
    async getPanierById(id: string): Promise<IPanier | null> {
        return await this.model.findById(id).populate("User").exec();
    }

    // Mettre à jour un panier
    async updatePanier(id: string, data: Partial<IPanier>): Promise<IPanier | null> {
        return await this.model.findByIdAndUpdate(id, data, { new: true }).exec();
    }

    // Supprimer un panier
    async deletePanier(id: string): Promise<IPanier | null> {
        return await this.model.findByIdAndDelete(id).exec();
    }
}
