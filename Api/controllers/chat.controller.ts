import express from "express";
import { MongooseService } from "../services";
// import { sessionMiddleware, roleMiddleware } from "../middleware";
// import { IEmployeeRole } from "../models";

export class ChatController {
    private static instance?: ChatController;

    static getInstance(): ChatController {
        if (!ChatController.instance) {
            ChatController.instance = new ChatController();
        }
        return ChatController.instance;
    }

    async createChat(req: express.Request, res: express.Response): Promise<void> {
        if (!req.body || !req.body.user || !req.body.message) {
            res.status(400).end();
            return;
        }
        
        const mongooseService = await MongooseService.getInstance();
        const chatService = mongooseService.chatService;
        const chat = await chatService.createChat(req.body.user, req.body.message, req.body.restaurant);
        res.status(201).json(chat);
    }

    async getChats(req: express.Request, res: express.Response): Promise<void> {
        const mongooseService = await MongooseService.getInstance();
        const chatService = mongooseService.chatService;
        const chats = await chatService.getChats();
        res.json(chats);
    }

    async getChatById(req: express.Request, res: express.Response): Promise<void> {
        if (!req.params.id) {
            res.status(400).end();
            return;
        }
        
        const mongooseService = await MongooseService.getInstance();
        const chatService = mongooseService.chatService;
        const chat = await chatService.getChatById(req.params.id);
        if (!chat) {
            res.status(404).end();
            return;
        }
        res.json(chat);
    }

    async updateChat(req: express.Request, res: express.Response): Promise<void> {
        if (!req.params.id || !req.body) {
            res.status(400).end();
            return;
        }
        
        const mongooseService = await MongooseService.getInstance();
        const chatService = mongooseService.chatService;
        const updatedChat = await chatService.updateChat(req.params.id, req.body);
        if (!updatedChat) {
            res.status(404).end();
            return;
        }
        res.json(updatedChat);
    }

    async deleteChat(req: express.Request, res: express.Response): Promise<void> {
        if (!req.params.id) {
            res.status(400).end();
            return;
        }
        
        const mongooseService = await MongooseService.getInstance();
        const chatService = mongooseService.chatService;
        const deletedChat = await chatService.deleteChat(req.params.id);
        if (!deletedChat) {
            res.status(404).end();
            return;
        }
        res.status(204).end();
    }

    buildRouter(): express.Router {
        const router = express.Router();
        router.get("/chats", express.json(), this.getChats.bind(this));
        router.get("/chats/:id", express.json(), this.getChatById.bind(this));
        router.post(
            "/chats",
            // sessionMiddleware(),
            express.json(),
            // roleMiddleware(IEmployeeRole.ADMIN),
            this.createChat.bind(this)
        );
        router.put(
            "/chats/:id",
            // sessionMiddleware(),
            express.json(),
            // roleMiddleware(IEmployeeRole.ADMIN),
            this.updateChat.bind(this)
        );
        router.delete(
            "/chats/:id",
            // sessionMiddleware(),
            // roleMiddleware(IEmployeeRole.ADMIN),
            this.deleteChat.bind(this)
        );
        return router;
    }
}