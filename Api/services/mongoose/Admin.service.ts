import { Model } from "mongoose";
import { IAdmin } from "../../models";
import { adminSchema } from "./schema";
import mongoose from "mongoose";

export class AdminService {
    private model: Model<IAdmin>;

    constructor() {
        this.model = mongoose.model<IAdmin>("Admin", adminSchema);
    }

    async createAdmin(user: string, restaurant: string): Promise<IAdmin> {
        const admin = new this.model({ User: user, Restaurant: restaurant });
        return await admin.save();
    }

    async getAdmins(): Promise<IAdmin[]> {
        return await this.model.find().populate("User").populate("Restaurant").exec();
    }

    async getAdminById(id: string): Promise<IAdmin | null> {
        return await this.model.findById(id).populate("User").populate("Restaurant").exec();
    }

    async updateAdmin(id: string, data: Partial<IAdmin>): Promise<IAdmin | null> {
        return await this.model.findByIdAndUpdate(id, data, { new: true }).exec();
    }

    async deleteAdmin(id: string): Promise<IAdmin | null> {
        return await this.model.findByIdAndDelete(id).exec();
    }
}
