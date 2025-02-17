import express from "express";
import {roleMiddleware, sessionMiddleware} from "../middlewares";
import {IUserRole} from "../models";
import {MongooseService} from "../services";

export class ZooController {

    private static instance?: ZooController;

    static getInstance(): ZooController {
        if (!ZooController.instance) {
            ZooController.instance = new ZooController();
        }
        return ZooController.instance;
    }

    async createZoo(req: express.Request, res: express.Response) {
        if(!req.body
            || typeof req.body.name !== 'string') {
            res.status(400).end();
            return;
        }
        const mongooseService = await MongooseService.getInstance();
        const zooService = mongooseService.zooService;
        const zoo = await zooService.createZoo(req.body);
        res.json(zoo);
    }

    buildRouter(): express.Router {
        const router = express.Router();
        router.post("/",
                    sessionMiddleware(),
                    roleMiddleware(IUserRole.SuperAdmin),
                    express.json(),
                    this.createZoo.bind(this));
        return router;
    }
}