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

    async createConfectionne(req: express.Request, res: express.Response): Promise<void> {
        if (!req.body || !req.body.commande || !req.body.produit) {
            res.status(400).end();
            return;
        }
        
        const mongooseService = await MongooseService.getInstance();
        const confectionneService = mongooseService.confectionneService;
        const confectionne = await confectionneService.createConfectionne(req.body.commande, req.body.produit);
        res.status(201).json(confectionne);
    }

    async getConfectionnes(req: express.Request, res: express.Response): Promise<void> {
        const mongooseService = await MongooseService.getInstance();
        const confectionneService = mongooseService.confectionneService;
        const confectionnes = await confectionneService.getConfectionnes();
        res.json(confectionnes);
    }

    async getConfectionneById(req: express.Request, res: express.Response): Promise<void> {
        if (!req.params.id) {
            res.status(400).end();
            return;
        }
        
        const mongooseService = await MongooseService.getInstance();
        const confectionneService = mongooseService.confectionneService;
        const confectionne = await confectionneService.getConfectionneById(req.params.id);
        if (!confectionne) {
            res.status(404).end();
            return;
        }
        res.json(confectionne);
    }

    async updateConfectionne(req: express.Request, res: express.Response): Promise<void> {
        if (!req.params.id || !req.body) {
            res.status(400).end();
            return;
        }
        
        const mongooseService = await MongooseService.getInstance();
        const confectionneService = mongooseService.confectionneService;
        const updatedConfectionne = await confectionneService.updateConfectionne(req.params.id, req.body);
        if (!updatedConfectionne) {
            res.status(404).end();
            return;
        }
        res.json(updatedConfectionne);
    }

    async deleteConfectionne(req: express.Request, res: express.Response): Promise<void> {
        if (!req.params.id) {
            res.status(400).end();
            return;
        }
        
        const mongooseService = await MongooseService.getInstance();
        const confectionneService = mongooseService.confectionneService;
        const deletedConfectionne = await confectionneService.deleteConfectionne(req.params.id);
        if (!deletedConfectionne) {
            res.status(404).end();
            return;
        }
        res.status(204).end();
    }

    buildRouter(): express.Router {
        const router = express.Router();
        router.get("/confectionnes", express.json(), this.getConfectionnes.bind(this));
        router.get("/confectionnes/:id", express.json(), this.getConfectionneById.bind(this));
        router.post(
            "/confectionnes",
            // sessionMiddleware(),
            express.json(),
            // roleMiddleware(IEmployeeRole.ADMIN),
            this.createConfectionne.bind(this)
        );
        router.put(
            "/confectionnes/:id",
            // sessionMiddleware(),
            express.json(),
            // roleMiddleware(IEmployeeRole.ADMIN),
            this.updateConfectionne.bind(this)
        );
        router.delete(
            "/confectionnes/:id",
            // sessionMiddleware(),
            // roleMiddleware(IEmployeeRole.ADMIN),
            this.deleteConfectionne.bind(this)
        );
        return router;
    }
}
