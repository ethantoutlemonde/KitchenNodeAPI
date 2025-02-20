import { Model } from "mongoose";
import { IChat } from "../../models";
import { chatSchema } from "./schema";
import mongoose from "mongoose";

export class ChatService {
    private model: Model<IChat>;

    constructor() {
        this.model = mongoose.model<IChat>("Chat", chatSchema);
    }

    // Créer un chat
    async createChat(user: string, message: string, restaurant: string): Promise<IChat> {
        const chat = new this.model({ User: user, Message: message, Restaurant: restaurant });
        return await chat.save();
    }

    // Obtenir tous les chats
    async getChats(): Promise<IChat[]> {
        return await this.model.find().populate("User").populate("Restaurant").exec();
    }

    // Obtenir un chat par ID
    async getChatById(id: string): Promise<IChat | null> {
        return await this.model.findById(id).populate("User").populate("Restaurant").exec();
    }

    // Mettre à jour un chat
    async updateChat(id: string, data: Partial<IChat>): Promise<IChat | null> {
        return await this.model.findByIdAndUpdate(id, data, { new: true }).exec();
    }

    // Supprimer un chat
    async deleteChat(id: string): Promise<IChat | null> {
        return await this.model.findByIdAndDelete(id).exec();
    }
}
