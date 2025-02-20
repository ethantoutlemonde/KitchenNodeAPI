import express from "express";
import { MongooseService } from "../services";
// import { sessionMiddleware, roleMiddleware } from "../middleware";
// import { IEmployeeRole } from "../models";

export class IngredientController {
    private static instance?: IngredientController;

    static getInstance(): IngredientController {
        if (!IngredientController.instance) {
            IngredientController.instance = new IngredientController();
        }
        return IngredientController.instance;
    }

    async create(req: express.Request, res: express.Response): Promise<void> {
        try {
            if (!req.body || !req.body.name || !req.body.quantity) {
                res.status(400).json({ error: "Missing required fields" });
                return;
            }
            
            const mongooseService = await MongooseService.getInstance();
            const ingredientService = mongooseService.ingredientService;
            const ingredient = await ingredientService.createIngredient(req.body.name, req.body.quantity);
            res.status(201).json(ingredient);
        } catch (error) {
            res.status(500).json({ error: "Internal server error" });
        }
    }

    async getAll(req: express.Request, res: express.Response): Promise<void> {
        try {
            const mongooseService = await MongooseService.getInstance();
            const ingredientService = mongooseService.ingredientService;
            const ingredients = await ingredientService.getIngredients();
            res.status(200).json(ingredients);
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
            const ingredientService = mongooseService.ingredientService;
            const ingredient = await ingredientService.getIngredientById(req.params.id);
            if (!ingredient) {
                res.status(404).json({ error: "Not found" });
                return;
            }
            res.status(200).json(ingredient);
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
            const ingredientService = mongooseService.ingredientService;
            const updatedIngredient = await ingredientService.updateIngredient(req.params.id, req.body);
            if (!updatedIngredient) {
                res.status(404).json({ error: "Not found" });
                return;
            }
            res.status(200).json(updatedIngredient);
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
            const ingredientService = mongooseService.ingredientService;
            const deletedIngredient = await ingredientService.deleteIngredient(req.params.id);
            if (!deletedIngredient) {
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
        router.get("/ingredients", express.json(), this.getAll.bind(this));
        router.get("/ingredients/:id", express.json(), this.getById.bind(this));
        router.post(
            "/ingredients",
            // sessionMiddleware(),
            express.json(),
            // roleMiddleware(IEmployeeRole.ADMIN),
            this.create.bind(this)
        );
        router.put(
            "/ingredients/:id",
            // sessionMiddleware(),
            express.json(),
            // roleMiddleware(IEmployeeRole.ADMIN),
            this.update.bind(this)
        );
        router.delete(
            "/ingredients/:id",
            // sessionMiddleware(),
            // roleMiddleware(IEmployeeRole.ADMIN),
            this.delete.bind(this)
        );
        return router;
    }
}
