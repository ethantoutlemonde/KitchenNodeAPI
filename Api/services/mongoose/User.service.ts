import { Model } from "mongoose";
import { IUser } from "../../models";
import { userSchema } from "./schema";
import mongoose from "mongoose";
import crypto from "crypto"; // ➜ Utilisation de `crypto` pour le hash

export class UserService {
    private model: Model<IUser>;

    constructor() {
        this.model = mongoose.model<IUser>("User", userSchema);
    }

    // Fonction pour hasher un mot de passe avec un sel aléatoire
    private generateSalt(): string {
        return crypto.randomBytes(16).toString("hex"); // Génère un sel aléatoire
    }

    private hashPassword(password: string, salt: string): string {
        return crypto.pbkdf2Sync(password, salt, 10000, 64, "sha256").toString("hex");
    }

    // Création d'un utilisateur avec hash sécurisé
    async createUser(nom: string, prenom: string, mail: string, motDePasse: string, tel: string, role: string, adresse: string): Promise<IUser | null> {
        try {
            const salt = this.generateSalt();
            const hashedPassword = this.hashPassword(motDePasse, salt);
    
            const user = new this.model({
                Nom: nom,
                Prenom: prenom,
                Mail: mail,
                Password: hashedPassword,
                Salt: salt,
                Tel: tel,
                Role: role,
                Adresse: adresse
            });
    
            return await user.save();
        } catch (error) {
            console.error("Erreur lors de la création de l'utilisateur:", error);
            return null; // ✅ Empêche l'API de crasher
        }
    }
    

    async createUserRoot(nom: string, prenom: string, mail: string, motDePasse: string, tel: string, role: string): Promise<IUser> {
        const salt = this.generateSalt();
        const hashedPassword = this.hashPassword(motDePasse, salt);

        const user = new this.model({
            Nom: nom,
            Prenom: prenom,
            Mail: mail,
            Password: hashedPassword, // ✅ Correction ici aussi !
            Salt: salt,
            Tel: tel,
            Role: role
        });

        return await user.save();
    }

    

    // Vérification de l'authentification
    async findValidUser(mail: string, motDePasse: string): Promise<IUser | null> {
        try {
            const user = await this.model.findOne({ Mail: mail }).exec();
            if (!user || !user.Salt) return null;  // ✅ Vérification améliorée
    
            const hashedInputPassword = this.hashPassword(motDePasse, user.Salt);
            if (hashedInputPassword !== user.Password) return null;
    
            return user;
        } catch (error) {
            console.error("Erreur lors de la recherche de l'utilisateur:", error);
            return null; // ✅ Évite de crasher l'API en cas d'erreur MongoDB
        }
    }
    
    
}
