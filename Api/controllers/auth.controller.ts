import express from "express";
import {MongooseService} from "../services";
import { Request, Response } from "express";

// import {sessionMiddleware} from "../middlewares";

export class AuthController {


    async login(req: Request, res: Response) {
        try {
            if (!req.body || typeof req.body.mail !== "string" || typeof req.body.password !== "string") {
                return res.status(400).json({ error: "Mail et mot de passe requis" });
            }
    
            const mongooseService = await MongooseService.getInstance();
            if (!mongooseService) {
                return res.status(500).json({ error: "Service MongoDB indisponible" });
            }
    
            const userService = mongooseService.userService;
            if (!userService) {
                return res.status(500).json({ error: "Service utilisateur indisponible" });
            }
    
            const validUser = await userService.findValidUser(req.body.mail, req.body.password);
            if (!validUser) {
                return res.status(401).json({ error: "Identifiants incorrects" });
            }
    
            const sessionService = mongooseService.sessionService;
            if (!sessionService) {
                return res.status(500).json({ error: "Service de session non disponible" });
            }
    
            const session = await sessionService.createSession({ user: validUser._id });
    
            console.log("Session créée :", session); // Debug pour voir si Token existe
    
            return res.json({ sessionId: session.Token }); // Vérifie que Token existe
        } catch (error) {
            console.error("Erreur lors de la connexion:", error);
            return res.status(500).json({ error: "Erreur interne du serveur" });
        }
    }
    
    
    
}