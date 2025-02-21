import express from "express";
import { MongooseService } from "../services";

export class SessionController {
    private static instance?: SessionController;

    static getInstance(): SessionController {
        if (!SessionController.instance) {
            SessionController.instance = new SessionController();
        }
        return SessionController.instance;
    }

    async createSession(req: express.Request, res: express.Response): Promise<void> {
        try {
            const { token, dateHeure, user } = req.body;
    
            if (!token || !dateHeure || !user) {
                res.status(400).json({ error: "Missing required fields: token, dateHeure, or user" });
                return;
            }
    
            // Créer une nouvelle session avec les données
            const mongooseService = await MongooseService.getInstance();
            const sessionService = mongooseService.sessionService;
            const session = await sessionService.createSession(token, dateHeure, user);
    
            res.status(201).json(session);
        } catch (error) {
            console.error(error); // Pour le débogage
            res.status(400).json({ error: "Failed to create session" });
        }
    }
    

    async getAll(req: express.Request, res: express.Response): Promise<void> {
        try {
            const mongooseService = await MongooseService.getInstance();
            const sessionService = mongooseService.sessionService;
            const sessions = await sessionService.getSessions();

            res.status(200).json(sessions);
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
            const sessionService = mongooseService.sessionService;
            const session = await sessionService.getSessionById(req.params.id);

            if (!session) {
                res.status(404).json({ error: "Not found" });
                return;
            }

            res.status(200).json(session);
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
            const sessionService = mongooseService.sessionService;
            const updatedSession = await sessionService.updateSession(req.params.id, req.body);

            if (!updatedSession) {
                res.status(404).json({ error: "Not found" });
                return;
            }

            res.status(200).json(updatedSession);
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
            const sessionService = mongooseService.sessionService;
            const deletedSession = await sessionService.deleteSession(req.params.id);

            if (!deletedSession) {
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
        router.get("/sessions", express.json(), this.getAll.bind(this));
        router.get("/sessions/:id", express.json(), this.getById.bind(this));
        router.post("/sessions", express.json(), this.createSession.bind(this));
        router.put("/sessions/:id", express.json(), this.update.bind(this));
        router.delete("/sessions/:id", this.delete.bind(this));
        return router;
    }
}
