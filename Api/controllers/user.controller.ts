import express from "express";
import {roleMiddleware, sessionMiddleware} from "../middlewares";
import {IUserRole} from "../models";
import {MongooseService} from "../services";

export class UserController {

    private static instance?: UserController;

    static getInstance(): UserController {
        if (!UserController.instance) {
            UserController.instance = new UserController();
        }
        return UserController.instance;
    }

    private async createUser(role: IUserRole, req: express.Request, res: express.Response) {
        if(!req.body
            || typeof req.body.zoo !== 'string'
            || typeof req.body.lastName !== 'string'
            || typeof req.body.firstName !== 'string'
            || typeof req.body.login !== 'string'
            || typeof req.body.password !== 'string'
            || typeof req.body.email !== 'string'
        ) {
            res.status(400).end();
            return;
        }
        const mongooseService = await MongooseService.getInstance();
        const userService = mongooseService.userService;
        const user = await userService.createUser({
            zoo: req.body.zoo,
            login: req.body.login,
            password: req.body.password,
            lastName: req.body.lastName,
            firstName: req.body.firstName,
            email: req.body.email,
            role: role
        });
        res.json(user);
    }

    async createAdmin(req: express.Request, res: express.Response) {
        return this.createUser(IUserRole.Admin, req, res);
    }

    async createEmployee(req: express.Request, res: express.Response) {
        return this.createUser(IUserRole.Employee, req, res);
    }

    buildRouter(): express.Router {
        const router = express.Router();
        router.post("/admin",
            sessionMiddleware(),
            roleMiddleware(IUserRole.SuperAdmin),
            express.json(),
            this.createAdmin.bind(this));
        router.post("/employee",
            sessionMiddleware(),
            roleMiddleware(IUserRole.Admin),
            express.json(),
            this.createEmployee.bind(this));
        return router;
    }
}