import { Model } from "mongoose";
import { IAdresse } from "../../models";
import { adresseSchema } from "./schema";
import mongoose from "mongoose";

export class AdresseService {
    private model: Model<IAdresse>;

    constructor() {
        this.model = mongoose.model<IAdresse>("Adresse", adresseSchema);
    }

    async createAdresse(user: string, street: string, city: string, postalCode: string, country: string): Promise<IAdresse> {
        const adresse = new this.model({ User: user, Street: street, City: city, PostalCode: postalCode, Country: country });
        return await adresse.save();
    }

    async getAdresses(): Promise<IAdresse[]> {
        return await this.model.find().populate("User").exec();
    }

    async getAdresseById(id: string): Promise<IAdresse | null> {
        return await this.model.findById(id).populate("User").exec();
    }

    async updateAdresse(id: string, data: Partial<IAdresse>): Promise<IAdresse | null> {
        return await this.model.findByIdAndUpdate(id, data, { new: true }).exec();
    }

    async deleteAdresse(id: string): Promise<IAdresse | null> {
        return await this.model.findByIdAndDelete(id).exec();
    }
}