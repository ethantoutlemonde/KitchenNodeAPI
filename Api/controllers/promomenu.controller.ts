import express, { Request, Response } from "express";
import { MongooseService } from "../services";

export class PanierMenuController {
    private static instance?: PanierMenuController;

    static getInstance(): PanierMenuController {
        if (!PanierMenuController.instance) {
            PanierMenuController.instance = new PanierMenuController();
        }
        return PanierMenuController.instance;
    }

    async create(req: Request, res: Response): Promise<void> {
        try {
            if (!req.body || !req.body.panier || !req.body.menu) {
                res.status(400).json({ error: "Missing required fields" });
                return;
            }

            const mongooseService = await MongooseService.getInstance();
            const panierMenuService = mongooseService.panierMenuService;
            const panierMenu = await panierMenuService.createPanierMenu(req.body.panier, req.body.menu);
            res.status(201).json(panierMenu);
        } catch (error) {
            res.status(500).json({ error: "Internal server error" });
        }
    }

    async getAll(req: Request, res: Response): Promise<void> {
        try {
            const mongooseService = await MongooseService.getInstance();
            const panierMenuService = mongooseService.panierMenuService;
            const panierMenus = await panierMenuService.getPanierMenus();
            res.status(200).json(panierMenus);
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
            const panierMenuService = mongooseService.panierMenuService;
            const panierMenu = await panierMenuService.getPanierMenuById(req.params.id);
            if (!panierMenu) {
                res.status(404).json({ error: "Not found" });
                return;
            }
            res.status(200).json(panierMenu);
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
            const panierMenuService = mongooseService.panierMenuService;
            const updatedPanierMenu = await panierMenuService.updatePanierMenu(req.params.id, req.body);
            if (!updatedPanierMenu) {
                res.status(404).json({ error: "Not found" });
                return;
            }
            res.status(200).json(updatedPanierMenu);
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
            const panierMenuService = mongooseService.panierMenuService;
            const deletedPanierMenu = await panierMenuService.deletePanierMenu(req.params.id);
            if (!deletedPanierMenu) {
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
        router.get("/paniermenus", this.getAll.bind(this));
        router.get("/paniermenus/:id", this.getById.bind(this));
        router.post("/paniermenus", this.create.bind(this));
        router.put("/paniermenus/:id", this.update.bind(this));
        router.delete("/paniermenus/:id", this.delete.bind(this));
        return router;
    }
}
