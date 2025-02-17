import express from "express";
import {MongooseService} from "../services";
import {sessionMiddleware} from "../middlewares";

export class AuthController {

    private static instance?: AuthController;

    static getInstance(): AuthController {
        if (!AuthController.instance) {
            AuthController.instance = new AuthController();
        }
        return AuthController.instance;
    }

    async login(req: express.Request, res: express.Response) {
        // verification des parametres d'entrés
        if(!req.body
            || typeof req.body.login !== 'string'
            || typeof req.body.password !== 'string') {
            res.status(400).end();
            return;
        }
        const mongooseService = await MongooseService.getInstance();
        const userService = mongooseService.userService;
        const validUser = await userService.findValidUser(req.body.login, req.body.password);
        if(!validUser) {
            res.status(401).end();
            return;
        }
        const sessionService = mongooseService.sessionService;
        const session = await sessionService.createSession({
            user: validUser
        });
        res.json({session: session._id});
    }

    async me(req: express.Request, res: express.Response) {
        res.json(req.user);
    }

    buildRouter(): express.Router {
        const router = express.Router();
        router.post('/login', express.json(), this.login.bind(this));
        router.get('/me', sessionMiddleware(), this.me.bind(this));
        return router;
    }
}