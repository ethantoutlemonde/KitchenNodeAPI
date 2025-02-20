import { Model } from "mongoose";
import { IRestaurant } from "../../models";
import { restaurantSchema } from "./schema";
import mongoose from "mongoose";

export class RestaurantService {
    private model: Model<IRestaurant>;

    constructor() {
        this.model = mongoose.model<IRestaurant>("Restaurant", restaurantSchema);
    }

    // Créer un restaurant
    async createRestaurant(nom: string, adresse: string, telephone: string): Promise<IRestaurant> {
        const restaurant = new this.model({ Nom: nom, Adresse: adresse, Telephone: telephone });
        return await restaurant.save();
    }

    // Obtenir tous les restaurants
    async getRestaurants(): Promise<IRestaurant[]> {
        return await this.model.find().exec();
    }

    // Obtenir un restaurant par ID
    async getRestaurantById(id: string): Promise<IRestaurant | null> {
        return await this.model.findById(id).exec();
    }

    // Mettre à jour un restaurant
    async updateRestaurant(id: string, data: Partial<IRestaurant>): Promise<IRestaurant | null> {
        return await this.model.findByIdAndUpdate(id, data, { new: true }).exec();
    }

    // Supprimer un restaurant
    async deleteRestaurant(id: string): Promise<IRestaurant | null> {
        return await this.model.findByIdAndDelete(id).exec();
    }
}
