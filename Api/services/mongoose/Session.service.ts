import { Model } from "mongoose";
import { ISession } from "../../models";
import { sessionSchema } from "./schema";
import mongoose from "mongoose";

export class SessionService {
    private model: Model<ISession>;

    constructor() {
        this.model = mongoose.model<ISession>("Session", sessionSchema);
    }

    // Créer une session
    async createSession(token: string, user: string, dateHeure: Date): Promise<ISession> {
        const session = new this.model({Token: token,  User: user, DATEHEURE: dateHeure});
        return await session.save();
    }

    // Obtenir toutes les sessions
    async getSessions(): Promise<ISession[]> {
        return await this.model.find().exec();
    }

    // Obtenir une session par ID
    async getSessionById(id: string): Promise<ISession | null> {
        return await this.model.findById(id).exec();
    }

    // Mettre à jour une session
    async updateSession(id: string, data: Partial<ISession>): Promise<ISession | null> {
        return await this.model.findByIdAndUpdate(id, data, { new: true }).exec();
    }

    // Supprimer une session
    async deleteSession(id: string): Promise<ISession | null> {
        return await this.model.findByIdAndDelete(id).exec();
    }
}
