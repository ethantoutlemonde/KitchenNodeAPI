import { Model } from "mongoose";
import { IMenu } from "../../models";
import { menuSchema } from "./schema";
import mongoose from "mongoose";

export class MenuService {
    private model: Model<IMenu>;

    constructor() {
        this.model = mongoose.model<IMenu>("Menu", menuSchema);
    }

    // Créer un menu
    async createMenu(nom: string, description: string, Prix: number, Disponible: boolean, Image: string ,Produits : number): Promise<IMenu> {
        const menu = new this.model({ Nom: nom, Description: description, Prix: Prix, Disponible: Disponible, Image: Image, Produits: Produits });
        return await menu.save();
    }

    // Obtenir tous les menus
    async getMenus(): Promise<IMenu[]> {
        return await this.model.find().exec();
    }

    // Obtenir un menu par ID
    async getMenuById(id: string): Promise<IMenu | null> {
        return await this.model.findById(id).exec();
    }

    // Mettre à jour un menu
    async updateMenu(id: string, data: Partial<IMenu>): Promise<IMenu | null> {
        return await this.model.findByIdAndUpdate(id, data, { new: true }).exec();
    }

    // Supprimer un menu
    async deleteMenu(id: string): Promise<IMenu | null> {
        return await this.model.findByIdAndDelete(id).exec();
    }
}
