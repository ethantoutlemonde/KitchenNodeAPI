import express from "express";
import { MongooseService } from "../services";

export class PromotionController {
    private static instance?: PromotionController;

    static getInstance(): PromotionController {
        if (!PromotionController.instance) {
            PromotionController.instance = new PromotionController();
        }
        return PromotionController.instance;
    }

    async createPromotion(req: express.Request, res: express.Response): Promise<void> {
        try {
            // Vérification des champs requis
            const { nom, description, offrePourcent, offrePrix, debut, fin } = req.body;
    
            if (!nom || !description || !debut || !fin) {
                res.status(400).json({ error: "Missing required fields: nom, description, debut, fin" });
                return;
            }
    
            // Création de la promotion via le service
            const mongooseService = await MongooseService.getInstance();
            const promotionService = mongooseService.promotionService;
            const promotion = await promotionService.createPromotion(nom, description, offrePourcent, offrePrix, debut, fin);
    
            res.status(201).json(promotion);
        } catch (error) {
            console.error(error); // Pour le débogage
            res.status(400).json({ error: "Failed to create promotion" });
        }
    }
    

    async getAll(req: express.Request, res: express.Response): Promise<void> {
        try {
            const mongooseService = await MongooseService.getInstance();
            const promotionService = mongooseService.promotionService;
            const promotions = await promotionService.getPromotions();

            res.status(200).json(promotions);
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
            const promotionService = mongooseService.promotionService;
            const promotion = await promotionService.getPromotionById(req.params.id);

            if (!promotion) {
                res.status(404).json({ error: "Not found" });
                return;
            }

            res.status(200).json(promotion);
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
            const promotionService = mongooseService.promotionService;
            const updatedPromotion = await promotionService.updatePromotion(req.params.id, req.body);

            if (!updatedPromotion) {
                res.status(404).json({ error: "Not found" });
                return;
            }

            res.status(200).json(updatedPromotion);
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
            const promotionService = mongooseService.promotionService;
            const deletedPromotion = await promotionService.deletePromotion(req.params.id);

            if (!deletedPromotion) {
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
        router.get("/promotions", express.json(), this.getAll.bind(this));
        router.get("/promotions/:id", express.json(), this.getById.bind(this));
        router.post("/promotions", express.json(), this.createPromotion.bind(this));
        router.put("/promotions/:id", express.json(), this.update.bind(this));
        router.delete("/promotions/:id", this.delete.bind(this));
        return router;
    }
}
