import express from "express";
import { MongooseService } from "../services";
// import { sessionMiddleware, roleMiddleware } from "../middleware";
// import { IEmployeeRole } from "../models";

export class PaniermenuController {
    private static instance?: PaniermenuController;

    static getInstance(): PaniermenuController {
        if (!PaniermenuController.instance) {
            PaniermenuController.instance = new PaniermenuController();
        }
        return PaniermenuController.instance;
    }

    async createPanierMenu(req: express.Request, res: express.Response): Promise<void> {
        try {
            // Vérification des champs requis
            const { menu, panier } = req.body;
    
            if (!menu || !panier) {
                res.status(400).json({ error: "Missing required fields: menu, panier" });
                return;
            }
    
            // Création de l'association entre un menu et un panier via le service
            const mongooseService = await MongooseService.getInstance();
            const panierMenuService = mongooseService.panierMenuService;
            const panierMenu = await panierMenuService.createPanierMenu(menu, panier);
    
            res.status(201).json(panierMenu);
        } catch (error) {
            console.error(error); // Pour aider au débogage
            res.status(400).json({ error: "Failed to create panierMenu" });
        }
    }
    

    async getAll(req: express.Request, res: express.Response): Promise<void> {
        try {
            const mongooseService = await MongooseService.getInstance();
            const paniermenuService = mongooseService.panierMenuService;
            const paniermenus = await paniermenuService.getPanierMenus();
            res.status(200).json(paniermenus);
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
            const paniermenuService = mongooseService.panierMenuService;
            const paniermenu = await paniermenuService.getPanierMenuById(req.params.id);
            if (!paniermenu) {
                res.status(404).json({ error: "Not found" });
                return;
            }
            res.status(200).json(paniermenu);
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
            const paniermenuService = mongooseService.panierMenuService;
            const updatedPaniermenu = await paniermenuService.updatePanierMenu(req.params.id, req.body);
            if (!updatedPaniermenu) {
                res.status(404).json({ error: "Not found" });
                return;
            }
            res.status(200).json(updatedPaniermenu);
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
            const paniermenuService = mongooseService.panierMenuService;
            const deletedPaniermenu = await paniermenuService.deletePanierMenu(req.params.id);
            if (!deletedPaniermenu) {
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
        router.get("/paniersmenus", express.json(), this.getAll.bind(this));
        router.get("/paniersmenus/:id", express.json(), this.getById.bind(this));
        router.post(
            "/paniersmenus",
            // sessionMiddleware(),
            express.json(),
            // roleMiddleware(IEmployeeRole.ADMIN),
            this.createPanierMenu.bind(this)
        );
        router.put(
            "/paniersmenus/:id",
            // sessionMiddleware(),
            express.json(),
            // roleMiddleware(IEmployeeRole.ADMIN),
            this.update.bind(this)
        );
        router.delete(
            "/paniersmenus/:id",
            // sessionMiddleware(),
            // roleMiddleware(IEmployeeRole.ADMIN),
            this.delete.bind(this)
        );
        return router;
    }
}