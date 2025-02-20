import express from "express";
import { MongooseService } from "../services";

export class RestaurantController {
    private static instance?: RestaurantController;

    static getInstance(): RestaurantController {
        if (!RestaurantController.instance) {
            RestaurantController.instance = new RestaurantController();
        }
        return RestaurantController.instance;
    }

    async create(req: express.Request, res: express.Response): Promise<void> {
        try {
            const { nom, description, adresse } = req.body;

            // Vérifier que tous les champs sont fournis
            if (!nom || !description || !adresse) {
                res.status(400).json({ error: "Missing required fields: nom, description, adresse" });
                return;
            }

            const mongooseService = await MongooseService.getInstance();
            const restaurantService = mongooseService.restaurantService;
            const restaurant = await restaurantService.createRestaurant(nom, description, adresse);

            res.status(201).json(restaurant);
        } catch (error) {
            res.status(500).json({ error: "Internal server error" });
        }
    }

    async getAll(req: express.Request, res: express.Response): Promise<void> {
        try {
            const mongooseService = await MongooseService.getInstance();
            const restaurantService = mongooseService.restaurantService;
            const restaurants = await restaurantService.getRestaurants();

            res.status(200).json(restaurants);
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
            const restaurantService = mongooseService.restaurantService;
            const restaurant = await restaurantService.getRestaurantById(req.params.id);

            if (!restaurant) {
                res.status(404).json({ error: "Not found" });
                return;
            }

            res.status(200).json(restaurant);
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
            const restaurantService = mongooseService.restaurantService;
            const updatedRestaurant = await restaurantService.updateRestaurant(req.params.id, req.body);

            if (!updatedRestaurant) {
                res.status(404).json({ error: "Not found" });
                return;
            }

            res.status(200).json(updatedRestaurant);
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
            const restaurantService = mongooseService.restaurantService;
            const deletedRestaurant = await restaurantService.deleteRestaurant(req.params.id);

            if (!deletedRestaurant) {
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
        router.get("/restaurants", express.json(), this.getAll.bind(this));
        router.get("/restaurants/:id", express.json(), this.getById.bind(this));
        router.post("/restaurants", express.json(), this.create.bind(this));
        router.put("/restaurants/:id", express.json(), this.update.bind(this));
        router.delete("/restaurants/:id", this.delete.bind(this));
        return router;
    }
}
