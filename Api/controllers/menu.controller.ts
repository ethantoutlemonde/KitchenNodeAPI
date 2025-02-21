import express from "express";
import { MongooseService } from "../services";
// import { sessionMiddleware, roleMiddleware } from "../middleware";
// import { IEmployeeRole } from "../models";

export class MenuController {
    private static instance?: MenuController;

    static getInstance(): MenuController {
        if (!MenuController.instance) {
            MenuController.instance = new MenuController();
        }
        return MenuController.instance;
    }

    async createMenu(req: express.Request, res: express.Response): Promise<void> {
        try {
            // Vérification des champs requis
            const { nom, description, prix, disponible, image, produits } = req.body;
    
            if (!nom || !description || !prix || !disponible || !image || !produits) {
                res.status(400).json({ error: "Missing required fields: nom, description, prix, disponible, image, produits" });
                return;
            }
    
            // Création du menu via le service
            const mongooseService = await MongooseService.getInstance();
            const menuService = mongooseService.menuService;
            const menu = await menuService.createMenu(nom, description, prix, disponible, image, produits);
    
            res.status(201).json(menu);
        } catch (error) {
            console.error(error); // Pour aider au débogage
            res.status(400).json({ error: "Failed to create menu" });
        }
    }
    

    async getAll(req: express.Request, res: express.Response): Promise<void> {
        try {
            const mongooseService = await MongooseService.getInstance();
            const menuService = mongooseService.menuService;
            const menus = await menuService.getMenus();
            res.status(200).json(menus);
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
            const menuService = mongooseService.menuService;
            const menu = await menuService.getMenuById(req.params.id);
            if (!menu) {
                res.status(404).json({ error: "Not found" });
                return;
            }
            res.status(200).json(menu);
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
            const menuService = mongooseService.menuService;
            const updatedMenu = await menuService.updateMenu(req.params.id, req.body);
            if (!updatedMenu) {
                res.status(404).json({ error: "Not found" });
                return;
            }
            res.status(200).json(updatedMenu);
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
            const menuService = mongooseService.menuService;
            const deletedMenu = await menuService.deleteMenu(req.params.id);
            if (!deletedMenu) {
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
        router.get("/menus", express.json(), this.getAll.bind(this));
        router.get("/menus/:id", express.json(), this.getById.bind(this));
        router.post(
            "/menus",
            // sessionMiddleware(),
            express.json(),
            // roleMiddleware(IEmployeeRole.ADMIN),
            this.createMenu.bind(this)
        );
        router.put(
            "/menus/:id",
            // sessionMiddleware(),
            express.json(),
            // roleMiddleware(IEmployeeRole.ADMIN),
            this.update.bind(this)
        );
        router.delete(
            "/menus/:id",
            // sessionMiddleware(),
            // roleMiddleware(IEmployeeRole.ADMIN),
            this.delete.bind(this)
        );
        return router;
    }
}