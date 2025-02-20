import express from "express";
import { MongooseService } from "../services";

export class UserController {
    private static instance?: UserController;

    static getInstance(): UserController {
        if (!UserController.instance) {
            UserController.instance = new UserController();
        }
        return UserController.instance;
    }

    async create(req: express.Request, res: express.Response): Promise<void> {
        try {
            const { nom, email, motDePasse } = req.body;

            // Vérification des champs requis
            if (!nom || !email || !motDePasse) {
                res.status(400).json({ error: "Missing required fields: nom, email, motDePasse" });
                return;
            }

            const userService = (await MongooseService.getInstance()).userService;
            const user = await userService.createUser(nom, email, motDePasse);

            res.status(201).json(user);
        } catch (error) {
            res.status(400).json({ error: "Failed to create user" });
        }
    }

    async getAll(req: express.Request, res: express.Response): Promise<void> {
        try {
            const userService = (await MongooseService.getInstance()).userService;
            const users = await userService.getUsers();
            res.status(200).json(users);
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

            const userService = (await MongooseService.getInstance()).userService;
            const user = await userService.getUserById(req.params.id);

            if (!user) {
                res.status(404).json({ error: "User not found" });
                return;
            }

            res.status(200).json(user);
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

            const userService = (await MongooseService.getInstance()).userService;
            const updatedUser = await userService.updateUser(req.params.id, req.body);

            if (!updatedUser) {
                res.status(404).json({ error: "User not found" });
                return;
            }

            res.status(200).json(updatedUser);
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

            const userService = (await MongooseService.getInstance()).userService;
            const deletedUser = await userService.deleteUser(req.params.id);

            if (!deletedUser) {
                res.status(404).json({ error: "User not found" });
                return;
            }

            res.status(204).end();
        } catch (error) {
            res.status(500).json({ error: "Internal server error" });
        }
    }

    buildRouter(): express.Router {
        const router = express.Router();
        router.get("/users", express.json(), this.getAll.bind(this));
        router.get("/users/:id", express.json(), this.getById.bind(this));
        router.post("/users", express.json(), this.create.bind(this));
        router.put("/users/:id", express.json(), this.update.bind(this));
        router.delete("/users/:id", this.delete.bind(this));
        return router;
    }
}
