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

    async create(req: Request, res: Response): Promise<void> {
        try {
            if (!req.body || !req.body.promo || !req.body.menu) {
                res.status(400).json({ error: "Missing required fields: promo, menu" });
                return;
            }

            const mongooseService = await MongooseService.getInstance();
            const promoMenuService = mongooseService.promoMenuService;
            const promoMenu = await promoMenuService.createPromoMenu(req.body.promo, req.body.menu);
            res.status(201).json(promoMenu);
        } catch (error) {
            res.status(500).json({ error: "Internal server error" });
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
        router.post("/promomenus", this.create.bind(this));
        router.put("/promomenus/:id", this.update.bind(this));
        router.delete("/promomenus/:id", this.delete.bind(this));
        return router;
    }
}
