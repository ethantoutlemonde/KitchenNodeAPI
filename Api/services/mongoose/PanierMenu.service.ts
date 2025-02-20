import { Model } from "mongoose";
import { IPanierMenu } from "../../models";
import { panierMenuSchema } from "./schema";
import mongoose from "mongoose";

export class PanierMenuService {
    private model: Model<IPanierMenu>;

    constructor() {
        this.model = mongoose.model<IPanierMenu>("PanierMenu", panierMenuSchema);
    }

    // Créer un panier-menu
    async createPanierMenu(panier: string, menu: string): Promise<IPanierMenu> {
        const panierMenu = new this.model({ Panier: panier, Menu: menu });
        return await panierMenu.save();
    }

    // Obtenir tous les panier-menus
    async getPanierMenus(): Promise<IPanierMenu[]> {
        return await this.model.find().populate("Panier").populate("Menu").exec();
    }

    // Obtenir un panier-menu par ID
    async getPanierMenuById(id: string): Promise<IPanierMenu | null> {
        return await this.model.findById(id).populate("Panier").populate("Menu").exec();
    }

    // Mettre à jour un panier-menu
    async updatePanierMenu(id: string, data: Partial<IPanierMenu>): Promise<IPanierMenu | null> {
        return await this.model.findByIdAndUpdate(id, data, { new: true }).exec();
    }

    // Supprimer un panier-menu
    async deletePanierMenu(id: string): Promise<IPanierMenu | null> {
        return await this.model.findByIdAndDelete(id).exec();
    }
}
