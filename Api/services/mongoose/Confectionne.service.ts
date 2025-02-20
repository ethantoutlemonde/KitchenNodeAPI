import { Model } from "mongoose";
import { IConfectionne } from "../../models";
import { confectionneSchema } from "./schema";
import mongoose from "mongoose";

export class ConfectionneService {
    private model: Model<IConfectionne>;

    constructor() {
        this.model = mongoose.model<IConfectionne>("Confectionne", confectionneSchema);
    }

    // Créer une confectionne
    async createConfectionne(commande: string, produit: string): Promise<IConfectionne> {
        const confectionne = new this.model({ Commande: commande, Produit: produit });
        return await confectionne.save();
    }

    // Obtenir toutes les confectionnes
    async getConfectionnes(): Promise<IConfectionne[]> {
        return await this.model.find().populate("Commande").populate("Produit").exec();
    }

    // Obtenir une confectionne par ID
    async getConfectionneById(id: string): Promise<IConfectionne | null> {
        return await this.model.findById(id).populate("Commande").populate("Produit").exec();
    }

    // Mettre à jour une confectionne
    async updateConfectionne(id: string, data: Partial<IConfectionne>): Promise<IConfectionne | null> {
        return await this.model.findByIdAndUpdate(id, data, { new: true }).exec();
    }

    // Supprimer une confectionne
    async deleteConfectionne(id: string): Promise<IConfectionne | null> {
        return await this.model.findByIdAndDelete(id).exec();
    }
}
