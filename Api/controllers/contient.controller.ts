import express from "express";
import { MongooseService } from "../services";
// import { sessionMiddleware, roleMiddleware } from "../middleware";
// import { IEmployeeRole } from "../models";

export class ContientController {
    private static instance?: ContientController;

    static getInstance(): ContientController {
        if (!ContientController.instance) {
            ContientController.instance = new ContientController();
        }
        return ContientController.instance;
    }

    async createContient(req: express.Request, res: express.Response): Promise<void> {
        try {
            // Vérification des champs requis
            const { produitId, ingredientId, quantite } = req.body;
    
            if (!produitId || !ingredientId || !quantite) {
                res.status(400).json({ error: "Missing required fields: produitId, ingredientId, quantite" });
                return;
            }
    
            // Création de l'entrée 'contient' via le service
            const mongooseService = await MongooseService.getInstance();
            const contientService = mongooseService.contientService;
            const contient = await contientService.createContient(produitId, ingredientId, quantite);
    
            res.status(201).json(contient);
        } catch (error) {
            console.error(error); // Pour aider au débogage
            res.status(400).json({ error: "Failed to create contient" });
        }
    }
    

    async getAll(req: express.Request, res: express.Response): Promise<void> {
        try {
            const mongooseService = await MongooseService.getInstance();
            const contientService = mongooseService.contientService;
            const contients = await contientService.getContients();
            res.status(200).json(contients);
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
            const contientService = mongooseService.contientService;
            const contient = await contientService.getContientById(req.params.id);
            if (!contient) {
                res.status(404).json({ error: "Not found" });
                return;
            }
            res.status(200).json(contient);
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
            const contientService = mongooseService.contientService;
            const updatedContient = await contientService.updateContient(req.params.id, req.body);
            if (!updatedContient) {
                res.status(404).json({ error: "Not found" });
                return;
            }
            res.status(200).json(updatedContient);
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
            const contientService = mongooseService.contientService;
            const deletedContient = await contientService.deleteContient(req.params.id);
            if (!deletedContient) {
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
        router.get("/contients", express.json(), this.getAll.bind(this));
        router.get("/contients/:id", express.json(), this.getById.bind(this));
        router.post(
            "/contients",
            // sessionMiddleware(),
            express.json(),
            // roleMiddleware(IEmployeeRole.ADMIN),
            this.createContient.bind(this)
        );
        router.put(
            "/contients/:id",
            // sessionMiddleware(),
            express.json(),
            // roleMiddleware(IEmployeeRole.ADMIN),
            this.update.bind(this)
        );
        router.delete(
            "/contients/:id",
            // sessionMiddleware(),
            // roleMiddleware(IEmployeeRole.ADMIN),
            this.delete.bind(this)
        );
        return router;
    }
}
