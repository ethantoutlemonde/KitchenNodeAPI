import express from "express";
import { MongooseService } from "../services";
// import { sessionMiddleware, roleMiddleware } from "../middleware";
// import { IEmployeeRole } from "../models";

export class PanierController {
    private static instance?: PanierController;

    static getInstance(): PanierController {
        if (!PanierController.instance) {
            PanierController.instance = new PanierController();
        }
        return PanierController.instance;
    }

    async createPanier(req: express.Request, res: express.Response): Promise<void> {
        try {
            // Vérification des champs requis
            const { user } = req.body;
    
            if (!user) {
                res.status(400).json({ error: "Missing required field: user" });
                return;
            }
    
            // Création du panier via le service
            const mongooseService = await MongooseService.getInstance();
            const panierService = mongooseService.panierService;
            const panier = await panierService.createPanier(user);
    
            res.status(201).json(panier);
        } catch (error) {
            console.error(error); // Pour aider au débogage
            res.status(400).json({ error: "Failed to create panier" });
        }
    }
    

    async getAll(req: express.Request, res: express.Response): Promise<void> {
        try {
            const mongooseService = await MongooseService.getInstance();
            const panierService = mongooseService.panierService;
            const paniers = await panierService.getPaniers();
            res.status(200).json(paniers);
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
            const panierService = mongooseService.panierService;
            const panier = await panierService.getPanierById(req.params.id);
            if (!panier) {
                res.status(404).json({ error: "Not found" });
                return;
            }
            res.status(200).json(panier);
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
            const panierService = mongooseService.panierService;
            const updatedPanier = await panierService.updatePanier(req.params.id, req.body);
            if (!updatedPanier) {
                res.status(404).json({ error: "Not found" });
                return;
            }
            res.status(200).json(updatedPanier);
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
            const panierService = mongooseService.panierService;
            const deletedPanier = await panierService.deletePanier(req.params.id);
            if (!deletedPanier) {
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
        router.get("/paniers", express.json(), this.getAll.bind(this));
        router.get("/paniers/:id", express.json(), this.getById.bind(this));
        router.post(
            "/paniers",
            // sessionMiddleware(),
            express.json(),
            // roleMiddleware(IEmployeeRole.ADMIN),
            this.createPanier.bind(this)
        );
        router.put(
            "/paniers/:id",
            // sessionMiddleware(),
            express.json(),
            // roleMiddleware(IEmployeeRole.ADMIN),
            this.update.bind(this)
        );
        router.delete(
            "/paniers/:id",
            // sessionMiddleware(),
            // roleMiddleware(IEmployeeRole.ADMIN),
            this.delete.bind(this)
        );
        return router;
    }
}
