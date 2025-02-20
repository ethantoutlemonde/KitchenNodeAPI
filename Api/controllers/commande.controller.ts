import express from "express";
import { MongooseService } from "../services";
// import { sessionMiddleware, roleMiddleware } from "../middleware";
// import { IEmployeeRole } from "../models";

export class CommandeController {
    private static instance?: CommandeController;

    static getInstance(): CommandeController {
        if (!CommandeController.instance) {
            CommandeController.instance = new CommandeController();
        }
        return CommandeController.instance;
    }

    async createCommande(req: express.Request, res: express.Response): Promise<void> {
        if (!req.body || !req.body.user || !req.body.items || !req.body.total) {
            res.status(400).end();
            return;
        }
        
        const mongooseService = await MongooseService.getInstance();
        const commandeService = mongooseService.commandeService;
        const commande = await commandeService.createCommande(req.body.user, req.body.items, req.body.total);
        res.status(201).json(commande);
    }

    async getCommandes(req: express.Request, res: express.Response): Promise<void> {
        const mongooseService = await MongooseService.getInstance();
        const commandeService = mongooseService.commandeService;
        const commandes = await commandeService.getCommandes();
        res.json(commandes);
    }

    async getCommandeById(req: express.Request, res: express.Response): Promise<void> {
        if (!req.params.id) {
            res.status(400).end();
            return;
        }
        
        const mongooseService = await MongooseService.getInstance();
        const commandeService = mongooseService.commandeService;
        const commande = await commandeService.getCommandeById(req.params.id);
        if (!commande) {
            res.status(404).end();
            return;
        }
        res.json(commande);
    }

    async updateCommande(req: express.Request, res: express.Response): Promise<void> {
        if (!req.params.id || !req.body) {
            res.status(400).end();
            return;
        }
        
        const mongooseService = await MongooseService.getInstance();
        const commandeService = mongooseService.commandeService;
        const updatedCommande = await commandeService.updateCommande(req.params.id, req.body);
        if (!updatedCommande) {
            res.status(404).end();
            return;
        }
        res.json(updatedCommande);
    }

    async deleteCommande(req: express.Request, res: express.Response): Promise<void> {
        if (!req.params.id) {
            res.status(400).end();
            return;
        }
        
        const mongooseService = await MongooseService.getInstance();
        const commandeService = mongooseService.commandeService;
        const deletedCommande = await commandeService.deleteCommande(req.params.id);
        if (!deletedCommande) {
            res.status(404).end();
            return;
        }
        res.status(204).end();
    }

    buildRouter(): express.Router {
        const router = express.Router();
        router.get("/commandes", express.json(), this.getCommandes.bind(this));
        router.get("/commandes/:id", express.json(), this.getCommandeById.bind(this));
        router.post(
            "/commandes",
            // sessionMiddleware(),
            express.json(),
            // roleMiddleware(IEmployeeRole.ADMIN),
            this.createCommande.bind(this)
        );
        router.put(
            "/commandes/:id",
            // sessionMiddleware(),
            express.json(),
            // roleMiddleware(IEmployeeRole.ADMIN),
            this.updateCommande.bind(this)
        );
        router.delete(
            "/commandes/:id",
            // sessionMiddleware(),
            // roleMiddleware(IEmployeeRole.ADMIN),
            this.deleteCommande.bind(this)
        );
        return router;
    }
}
