import { Model } from "mongoose";
import { IUser } from "../../models";
import { userSchema } from "./schema";
import mongoose from "mongoose";

export class UserService {
    private model: Model<IUser>;

    constructor() {
        this.model = mongoose.model<IUser>("User", userSchema);
    }

    // Créer un utilisateur
    async createUser(nom: string, email: string, motDePasse: string): Promise<IUser> {
        const user = new this.model({ Nom: nom, Email: email, MotDePasse: motDePasse });
        return await user.save();
    }

    // Obtenir tous les utilisateurs
    async getUsers(): Promise<IUser[]> {
        return await this.model.find().exec();
    }

    // Obtenir un utilisateur par ID
    async getUserById(id: string): Promise<IUser | null> {
        return await this.model.findById(id).exec();
    }

    // Mettre à jour un utilisateur
    async updateUser(id: string, data: Partial<IUser>): Promise<IUser | null> {
        return await this.model.findByIdAndUpdate(id, data, { new: true }).exec();
    }

    // Supprimer un utilisateur
    async deleteUser(id: string): Promise<IUser | null> {
        return await this.model.findByIdAndDelete(id).exec();
    }

    async findUserByLogin(login: string): Promise<IUser | null> {
        return await this.model.findOne({ login }).exec();
    }
    
}
