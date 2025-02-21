import express from "express";
import { MongooseService } from "../services";
// import { sessionMiddleware, roleMiddleware } from "../middleware";
// import { IEmployeeRole } from "../models";

export class AdresseController {
    private static instance?: AdresseController;

    static getInstance(): AdresseController {
        if (!AdresseController.instance) {
            AdresseController.instance = new AdresseController();
        }
        return AdresseController.instance;
    }

    async createAdresse(req: express.Request, res: express.Response): Promise<void> {
        try {
            const { numero, rue, ville, codePostal, country } = req.body;
    
            // Vérification des champs requis
            if (!rue || !ville || !codePostal) {
                res.status(400).json({ error: "Missing required fields: rue, ville, codePostal" });
                return;
            }
    
            // Création de l'adresse via le service en utilisant les paramètres individuellement
            const mongooseService = await MongooseService.getInstance();
            const adresseService = mongooseService.adresseService;
            const adresse = await adresseService.createAdresse(numero, rue, ville, codePostal, country);
    
            res.status(201).json(adresse);
        } catch (error) {
            console.error(error); // Pour le débogage
            res.status(400).json({ error: "Failed to create address" });
        }
    }
    

    async getAdresses(req: express.Request, res: express.Response): Promise<void> {
        const mongooseService = await MongooseService.getInstance();
        const adresseService = mongooseService.adresseService;
        const adresses = await adresseService.getAdresses();
        res.json(adresses);
    }

    async getAdresseById(req: express.Request, res: express.Response): Promise<void> {
        if (!req.params.id) {
            res.status(400).end();
            return;
        }
        
        const mongooseService = await MongooseService.getInstance();
        const adresseService = mongooseService.adresseService;
        const adresse = await adresseService.getAdresseById(req.params.id);
        if (!adresse) {
            res.status(404).end();
            return;
        }
        res.json(adresse);
    }

    async updateAdresse(req: express.Request, res: express.Response): Promise<void> {
        if (!req.params.id || !req.body) {
            res.status(400).end();
            return;
        }
        
        const mongooseService = await MongooseService.getInstance();
        const adresseService = mongooseService.adresseService;
        const updatedAdresse = await adresseService.updateAdresse(req.params.id, req.body);
        if (!updatedAdresse) {
            res.status(404).end();
            return;
        }
        res.json(updatedAdresse);
    }

    async deleteAdresse(req: express.Request, res: express.Response): Promise<void> {
        if (!req.params.id) {
            res.status(400).end();
            return;
        }
        
        const mongooseService = await MongooseService.getInstance();
        const adresseService = mongooseService.adresseService;
        const deletedAdresse = await adresseService.deleteAdresse(req.params.id);
        if (!deletedAdresse) {
            res.status(404).end();
            return;
        }
        res.status(204).end();
    }

    buildRouter(): express.Router {
        const router = express.Router();
        router.get("/adresses", express.json(), this.getAdresses.bind(this));
        router.get("/adresses/:id", express.json(), this.getAdresseById.bind(this));
        router.post(
            "/adresses",
            // sessionMiddleware(),
            express.json(),
            // roleMiddleware(IEmployeeRole.ADMIN),
            this.createAdresse.bind(this)
        );
        router.put(
            "/adresses/:id",
            // sessionMiddleware(),
            express.json(),
            // roleMiddleware(IEmployeeRole.ADMIN),
            this.updateAdresse.bind(this)
        );
        router.delete(
            "/adresses/:id",
            // sessionMiddleware(),
            // roleMiddleware(IEmployeeRole.ADMIN),
            this.deleteAdresse.bind(this)
        );
        return router;
    }
}
