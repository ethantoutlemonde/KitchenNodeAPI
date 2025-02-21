import { Model } from "mongoose";
import { IPromotion } from "../../models";
import { promotionSchema } from "./schema";
import mongoose from "mongoose";

export class PromotionService {
    private model: Model<IPromotion>;

    constructor() {
        this.model = mongoose.model<IPromotion>("Promotion", promotionSchema);
    }

    // Créer une promotion
    async createPromotion(nom: string, description: string, offrePourcent: number, OffrePrix: number, Debut: Date, Fin: Date): Promise<IPromotion> {
        const promotion = new this.model({ Nom: nom, Description: description, Pourcentage: offrePourcent, Prix: OffrePrix, Debut, Fin });
        return await promotion.save();
    }

    // Obtenir toutes les promotions
    async getPromotions(): Promise<IPromotion[]> {
        return await this.model.find().exec();
    }

    // Obtenir une promotion par ID
    async getPromotionById(id: string): Promise<IPromotion | null> {
        return await this.model.findById(id).exec();
    }

    // Mettre à jour une promotion
    async updatePromotion(id: string, data: Partial<IPromotion>): Promise<IPromotion | null> {
        return await this.model.findByIdAndUpdate(id, data, { new: true }).exec();
    }

    // Supprimer une promotion
    async deletePromotion(id: string): Promise<IPromotion | null> {
        return await this.model.findByIdAndDelete(id).exec();
    }
}
