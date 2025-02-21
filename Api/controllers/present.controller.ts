import express from "express";
import { MongooseService } from "../services";
// import { sessionMiddleware, roleMiddleware } from "../middleware";
// import { IEmployeeRole } from "../models";

export class PresentController {
    private static instance?: PresentController;

    static getInstance(): PresentController {
        if (!PresentController.instance) {
            PresentController.instance = new PresentController();
        }
        return PresentController.instance;
    }

    async createPresent(req: express.Request, res: express.Response): Promise<void> {
        try {
            // Vérification des champs requis
            const { restaurant, promotion } = req.body;
    
            if (!restaurant || !promotion) {
                res.status(400).json({ error: "Missing required fields: restaurant, promotion" });
                return;
            }
    
            // Création de l'association entre un restaurant et une promotion via le service
            const mongooseService = await MongooseService.getInstance();
            const presentService = mongooseService.presentService;
            const present = await presentService.createPresent(restaurant, promotion);
    
            res.status(201).json(present);
        } catch (error) {
            console.error(error); // Pour aider au débogage
            res.status(400).json({ error: "Failed to create present" });
        }
    }
    

    async getAll(req: express.Request, res: express.Response): Promise<void> {
        try {
            const mongooseService = await MongooseService.getInstance();
            const presentService = mongooseService.presentService;
            const presents = await presentService.getPresents();
            res.status(200).json(presents);
        } catch (error) {
            res.status(500).json({ error: "Internal server error" });
        }
    }

    async getById(req: express.Request, res: express.Response): Promise<void> {
        try {
            if (!req.params.id) {
                res.status(400).json({ error: "Missing ID parameter" });
                return;
            }
            
            const mongooseService = await MongooseService.getInstance();
            const presentService = mongooseService.presentService;
            const present = await presentService.getPresentById(req.params.id);
            if (!present) {
                res.status(404).json({ error: "Not found" });
                return;
            }
            res.status(200).json(present);
        } catch (error) {
            res.status(500).json({ error: "Internal server error" });
        }
    }

    async update(req: express.Request, res: express.Response): Promise<void> {
        try {
            if (!req.params.id || !req.body) {
                res.status(400).json({ error: "Missing required fields" });
                return;
            }
            
            const mongooseService = await MongooseService.getInstance();
            const presentService = mongooseService.presentService;
            const updatedPresent = await presentService.updatePresent(req.params.id, req.body);
            if (!updatedPresent) {
                res.status(404).json({ error: "Not found" });
                return;
            }
            res.status(200).json(updatedPresent);
        } catch (error) {
            res.status(500).json({ error: "Internal server error" });
        }
    }

    async delete(req: express.Request, res: express.Response): Promise<void> {
        try {
            if (!req.params.id) {
                res.status(400).json({ error: "Missing ID parameter" });
                return;
            }
            
            const mongooseService = await MongooseService.getInstance();
            const presentService = mongooseService.presentService;
            const deletedPresent = await presentService.deletePresent(req.params.id);
            if (!deletedPresent) {
                res.status(404).json({ error: "Not found" });
                return;
            }
            res.status(204).end();
        } catch (error) {
            res.status(500).json({ error: "Internal server error" });
        }
    }

    buildRouter(): express.Router {
        const router = express.Router();
        router.get("/presents", express.json(), this.getAll.bind(this));
        router.get("/presents/:id", express.json(), this.getById.bind(this));
        router.post(
            "/presents",
            // sessionMiddleware(),
            express.json(),
            // roleMiddleware(IEmployeeRole.ADMIN),
            this.createPresent.bind(this)
        );
        router.put(
            "/presents/:id",
            // sessionMiddleware(),
            express.json(),
            // roleMiddleware(IEmployeeRole.ADMIN),
            this.update.bind(this)
        );
        router.delete(
            "/presents/:id",
            // sessionMiddleware(),
            // roleMiddleware(IEmployeeRole.ADMIN),
            this.delete.bind(this)
        );
        return router;
    }
}