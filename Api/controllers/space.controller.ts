import express from "express";
import {roleMiddleware, sessionMiddleware, zooMiddleware} from "../middlewares";
import {IUserRole} from "../models";
import {MongooseService} from "../services";
import {AssetUtils} from "../utils/asset.utils";

export class SpaceController {

    private static instance?: SpaceController;

    static getInstance(): SpaceController {
        if (!SpaceController.instance) {
            SpaceController.instance = new SpaceController();
        }
        return SpaceController.instance;
    }

    async createSpace(req: express.Request, res: express.Response) {
        if(!req.body
            || typeof req.body.zoo !== 'string'
            || typeof req.body.name !== 'string'
            || typeof req.body.description !== 'string'
            || !Array.isArray(req.body.types)
            || typeof req.body.capacity !== 'number'
            || typeof req.body.visitorDuration !== 'number'
            || typeof req.body.openingHours !== 'number'
            || typeof req.body.closingHours !== 'number'
        ) {
            res.status(400).end();
            return;
        }
        if(Array.isArray(req.body.images)) {
            const allAssetExists = await AssetUtils.assetsExists(req.body.images);
            if(!allAssetExists) {
                res.status(400).end();
                return;
            }
        }
        const mongooseService = await MongooseService.getInstance();
        const spaceService = mongooseService.spaceService;
        try {
            const space = await spaceService.createSpace(req.body);
            res.json(space);
        } catch(err: unknown) {
            if (err instanceof Error && err.name === 'ValidationError') {
                res.status(400).end();
            } else {
                throw err;
            }
        }
    }

    buildRouter(): express.Router {
        const router = express.Router();
        router.post("/",
                    sessionMiddleware(),
                    roleMiddleware(IUserRole.Admin),
                    zooMiddleware(),
                    express.json(),
                    this.createSpace.bind(this));
        return router;
    }
}