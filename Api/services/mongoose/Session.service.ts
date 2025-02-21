import { Model } from "mongoose";
import { ISession } from "../../models/session.interface";
import SessionSchema from "../mongoose/schema/SessionSchema"; // 🔥 Correction de l'import
import mongoose from "mongoose";
import crypto from "crypto"; // 🔥 Pour générer un Token aléatoire

export class SessionService {
    private model: Model<ISession>;

    constructor() {
        this.model = mongoose.model<ISession>("Session", SessionSchema);
    }

    async createSession(data: { user: any }): Promise<ISession> {
        const token = crypto.randomBytes(32).toString("hex"); // 🔥 Génère un Token aléatoire
        const session = new this.model({ Token: token, user: data.user });
        return await session.save();
    }

    async getSessionById(sessionId: string): Promise<ISession | null> {
        return await this.model.findById(sessionId).populate("user").exec();
    }

    async deleteSession(sessionId: string): Promise<void> {
        await this.model.findByIdAndDelete(sessionId);
    }
}
