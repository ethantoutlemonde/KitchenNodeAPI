import express from "express";
import { MongooseService } from "../services";

export class VendController {
    private static instance?: VendController;

    static getInstance(): VendController {
        if (!VendController.instance) {
            VendController.instance = new VendController();
        }
        return VendController.instance;
    }

    async create(req: express.Request, res: express.Response): Promise<void> {
        try {
            if (!req.body || !req.body.nom || !req.body.prix || req.body.quantite === undefined) {
                res.status(400).json({ error: "Missing required fields: nom, prix, quantite" });
                return;
            }

            const mongooseService = await MongooseService.getInstance();
            const vendService = mongooseService.vendreService;
            const vend = await vendService.createVendre(req.body.nom, req.body.prix, req.body.quantite);
            res.status(201).json(vend);
        } catch (error) {
            res.status(500).json({ error: "Internal server error" });
        }
    }

    async getAll(req: express.Request, res: express.Response): Promise<void> {
        try {
            const mongooseService = await MongooseService.getInstance();
            const vendService = mongooseService.vendreService;
            const vends = await vendService.getVentes();
            res.status(200).json(vends);
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
            const vendService = mongooseService.vendreService;
            const vend = await vendService.getVendreById(req.params.id);
            if (!vend) {
                res.status(404).json({ error: "Not found" });
                return;
            }
            res.status(200).json(vend);
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
            const vendService = mongooseService.vendreService;
            const updatedVend = await vendService.updateVendre(req.params.id, req.body);
            if (!updatedVend) {
                res.status(404).json({ error: "Not found" });
                return;
            }
            res.status(200).json(updatedVend);
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
            const vendService = mongooseService.vendreService;
            const deletedVend = await vendService.deleteVendre(req.params.id);
            if (!deletedVend) {
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
        router.get("/vends", express.json(), this.getAll.bind(this));
        router.get("/vends/:id", express.json(), this.getById.bind(this));
        router.post("/vends", express.json(), this.create.bind(this));
        router.put("/vends/:id", express.json(), this.update.bind(this));
        router.delete("/vends/:id", this.delete.bind(this));
        return router;
    }
}
