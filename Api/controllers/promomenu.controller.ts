import express, { Request, Response } from "express";
import { MongooseService } from "../services";

export class PromoMenuController {
    private static instance?: PromoMenuController;

    static getInstance(): PromoMenuController {
        if (!PromoMenuController.instance) {
            PromoMenuController.instance = new PromoMenuController();
        }
        return PromoMenuController.instance;
    }

    async createPromoMenu(req: express.Request, res: express.Response): Promise<void> {
        try {
            // Vérification des champs requis
            const { menu, promotion } = req.body;
    
            if (!menu || !promotion) {
                res.status(400).json({ error: "Missing required fields: menu, promotion" });
                return;
            }
    
            // Création de la promoMenu via le service
            const mongooseService = await MongooseService.getInstance();
            const promoMenuService = mongooseService.promoMenuService;
            const promoMenu = await promoMenuService.createPromoMenu(menu, promotion);
    
            res.status(201).json(promoMenu);
        } catch (error) {
            console.error(error); // Pour le débogage
            res.status(400).json({ error: "Failed to create promoMenu" });
        }
    }
    

    async getAll(req: Request, res: Response): Promise<void> {
        try {
            const mongooseService = await MongooseService.getInstance();
            const promoMenuService = mongooseService.promoMenuService;
            const promoMenus = await promoMenuService.getPromoMenus();
            res.status(200).json(promoMenus);
        } catch (error) {
            res.status(500).json({ error: "Internal server error" });
        }
    }

    async getById(req: Request, res: Response): Promise<void> {
        try {
            if (!req.params.id) {
                res.status(400).json({ error: "Missing ID parameter" });
                return;
            }

            const mongooseService = await MongooseService.getInstance();
            const promoMenuService = mongooseService.promoMenuService;
            const promoMenu = await promoMenuService.getPromoMenuById(req.params.id);
            if (!promoMenu) {
                res.status(404).json({ error: "Not found" });
                return;
            }
            res.status(200).json(promoMenu);
        } catch (error) {
            res.status(500).json({ error: "Internal server error" });
        }
    }

    async update(req: Request, res: Response): Promise<void> {
        try {
            if (!req.params.id || !req.body) {
                res.status(400).json({ error: "Missing required fields" });
                return;
            }

            const mongooseService = await MongooseService.getInstance();
            const promoMenuService = mongooseService.promoMenuService;
            const updatedPromoMenu = await promoMenuService.updatePromoMenu(req.params.id, req.body);
            if (!updatedPromoMenu) {
                res.status(404).json({ error: "Not found" });
                return;
            }
            res.status(200).json(updatedPromoMenu);
        } catch (error) {
            res.status(500).json({ error: "Internal server error" });
        }
    }

    async delete(req: Request, res: Response): Promise<void> {
        try {
            if (!req.params.id) {
                res.status(400).json({ error: "Missing ID parameter" });
                return;
            }

            const mongooseService = await MongooseService.getInstance();
            const promoMenuService = mongooseService.promoMenuService;
            const deletedPromoMenu = await promoMenuService.deletePromoMenu(req.params.id);
            if (!deletedPromoMenu) {
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
        router.get("/promomenus", this.getAll.bind(this));
        router.get("/promomenus/:id", this.getById.bind(this));
        router.post("/promomenus", this.createPromoMenu.bind(this));
        router.put("/promomenus/:id", this.update.bind(this));
        router.delete("/promomenus/:id", this.delete.bind(this));
        return router;
    }
}
