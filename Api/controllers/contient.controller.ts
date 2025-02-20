import express from "express";
import { MongooseService } from "../services";
// import { sessionMiddleware, roleMiddleware } from "../middleware";
// import { IEmployeeRole } from "../models";

export class ConfectionneController {
    private static instance?: ConfectionneController;

    static getInstance(): ConfectionneController {
        if (!ConfectionneController.instance) {
            ConfectionneController.instance = new ConfectionneController();
        }
        return ConfectionneController.instance;
    }

    async create(req: express.Request, res: express.Response): Promise<void> {
        try {
            if (!req.body || !req.body.commande || !req.body.produit) {
                res.status(400).json({ error: "Missing required fields" });
                return;
            }
            
            const mongooseService = await MongooseService.getInstance();
            const confectionneService = mongooseService.confectionneService;
            const confectionne = await confectionneService.createConfectionne(req.body.commande, req.body.produit);
            res.status(201).json(confectionne);
        } catch (error) {
            res.status(500).json({ error: "Internal server error" });
        }
    }

    async getAll(req: express.Request, res: express.Response): Promise<void> {
        try {
            const mongooseService = await MongooseService.getInstance();
            const confectionneService = mongooseService.confectionneService;
            const confectionnes = await confectionneService.getConfectionnes();
            res.status(200).json(confectionnes);
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
            const confectionneService = mongooseService.confectionneService;
            const confectionne = await confectionneService.getConfectionneById(req.params.id);
            if (!confectionne) {
                res.status(404).json({ error: "Not found" });
                return;
            }
            res.status(200).json(confectionne);
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
            const confectionneService = mongooseService.confectionneService;
            const updatedConfectionne = await confectionneService.updateConfectionne(req.params.id, req.body);
            if (!updatedConfectionne) {
                res.status(404).json({ error: "Not found" });
                return;
            }
            res.status(200).json(updatedConfectionne);
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
            const confectionneService = mongooseService.confectionneService;
            const deletedConfectionne = await confectionneService.deleteConfectionne(req.params.id);
            if (!deletedConfectionne) {
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
        router.get("/confectionnes", express.json(), this.getAll.bind(this));
        router.get("/confectionnes/:id", express.json(), this.getById.bind(this));
        router.post(
            "/confectionnes",
            // sessionMiddleware(),
            express.json(),
            // roleMiddleware(IEmployeeRole.ADMIN),
            this.create.bind(this)
        );
        router.put(
            "/confectionnes/:id",
            // sessionMiddleware(),
            express.json(),
            // roleMiddleware(IEmployeeRole.ADMIN),
            this.update.bind(this)
        );
        router.delete(
            "/confectionnes/:id",
            // sessionMiddleware(),
            // roleMiddleware(IEmployeeRole.ADMIN),
            this.delete.bind(this)
        );
        return router;
    }
}