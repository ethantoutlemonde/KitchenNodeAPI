import { Model } from "mongoose";
import { ICommande } from "../../models";
import { commandeSchema } from "./schema";
import mongoose from "mongoose";

export class CommandeService {
    private model: Model<ICommande>;

    constructor() {
        this.model = mongoose.model<ICommande>("Commande", commandeSchema);
    }

    // Créer une commande
    async createCommande(user: string, restaurant: string, items: string[]): Promise<ICommande> {
        const commande = new this.model({ User: user, Restaurant: restaurant, Items: items });
        return await commande.save();
    }

    // Obtenir toutes les commandes
    async getCommandes(): Promise<ICommande[]> {
        return await this.model.find().populate("User").populate("Restaurant").exec();
    }

    // Obtenir une commande par ID
    async getCommandeById(id: string): Promise<ICommande | null> {
        return await this.model.findById(id).populate("User").populate("Restaurant").exec();
    }

    // Mettre à jour une commande
    async updateCommande(id: string, data: Partial<ICommande>): Promise<ICommande | null> {
        return await this.model.findByIdAndUpdate(id, data, { new: true }).exec();
    }

    // Supprimer une commande
    async deleteCommande(id: string): Promise<ICommande | null> {
        return await this.model.findByIdAndDelete(id).exec();
    }
}
