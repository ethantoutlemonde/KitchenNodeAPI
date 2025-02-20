import express from "express";
import { MongooseService } from "../services";

export class PromopanierController {
    private static instance?: PromopanierController;

    static getInstance(): PromopanierController {
        if (!PromopanierController.instance) {
            PromopanierController.instance = new PromopanierController();
        }
        return PromopanierController.instance;
    }

    async create(req: express.Request, res: express.Response): Promise<void> {
        try {
            if (!req.body || !req.body.promopanier) {
                res.status(400).json({ error: "Missing required fields" });
                return;
            }
            
            const mongooseService = await MongooseService.getInstance();
            const promopanierService = mongooseService.promoPanierService;
            const promopanier = await promopanierService.createPromoPanier( req.body.promopanier, req.body.promotion);
            res.status(201).json(promopanier);
        } catch (error) {
            res.status(500).json({ error: "Internal server error" });
        }
    }

    async getAll(req: express.Request, res: express.Response): Promise<void> {
        try {
            const mongooseService = await MongooseService.getInstance();
            const promopanierService = mongooseService.promoPanierService;
            const promopaniers = await promopanierService.getPromoPaniers();
            res.status(200).json(promopaniers);
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
            const promopanierService = mongooseService.promoPanierService;
            const promopanier = await promopanierService.getPromoPanierById(req.params.id);
            if (!promopanier) {
                res.status(404).json({ error: "Not found" });
                return;
            }
            res.status(200).json(promopanier);
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
            const promopanierService = mongooseService.promoPanierService;
            const updatedPromopanier = await promopanierService.updatePromoPanier(req.params.id, req.body);
            if (!updatedPromopanier) {
                res.status(404).json({ error: "Not found" });
                return;
            }
            res.status(200).json(updatedPromopanier);
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
            const promopanierService = mongooseService.promoPanierService;
            const deletedPromopanier = await promopanierService.deletePromoPanier(req.params.id);
            if (!deletedPromopanier) {
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
        router.get("/promopaniers", express.json(), this.getAll.bind(this));
        router.get("/promopaniers/:id", express.json(), this.getById.bind(this));
        router.post("/promopaniers", express.json(), this.create.bind(this));
        router.put("/promopaniers/:id", express.json(), this.update.bind(this));
        router.delete("/promopaniers/:id", this.delete.bind(this));
        return router;
    }
}
