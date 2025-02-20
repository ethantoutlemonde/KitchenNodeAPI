import { Model } from "mongoose";
import { IPromoMenu } from "../../models";
import { promoMenuSchema } from "./schema";
import mongoose from "mongoose";

export class PromoMenuService {
    private model: Model<IPromoMenu>;

    constructor() {
        this.model = mongoose.model<IPromoMenu>("PromoMenu", promoMenuSchema);
    }

    // Créer un promo-menu
    async createPromoMenu(menu: string, promotion: string): Promise<IPromoMenu> {
        const promoMenu = new this.model({ Menu: menu, Promotion: promotion });
        return await promoMenu.save();
    }

    // Obtenir tous les promo-menus
    async getPromoMenus(): Promise<IPromoMenu[]> {
        return await this.model.find().populate("Menu").populate("Promotion").exec();
    }

    // Obtenir un promo-menu par ID
    async getPromoMenuById(id: string): Promise<IPromoMenu | null> {
        return await this.model.findById(id).populate("Menu").populate("Promotion").exec();
    }

    // Mettre à jour un promo-menu
    async updatePromoMenu(id: string, data: Partial<IPromoMenu>): Promise<IPromoMenu | null> {
        return await this.model.findByIdAndUpdate(id, data, { new: true }).exec();
    }

    // Supprimer un promo-menu
    async deletePromoMenu(id: string): Promise<IPromoMenu | null> {
        return await this.model.findByIdAndDelete(id).exec();
    }
}
