import express, {Request} from "express";
import {sessionMiddleware} from "../middlewares";
import multer, {Multer} from "multer";
import {SecurityUtils} from "../utils";
import {readFile} from "fs/promises";
import path from "path";
import {IUserRole} from "../models";
import {rm} from "node:fs/promises";

export class AssetController {

    private static instance?: AssetController;
    private uploadMiddleware: Multer;

    static getInstance(): AssetController {
        if (!AssetController.instance) {
            AssetController.instance = new AssetController();
        }
        return AssetController.instance;
    }

    constructor() {
        this.uploadMiddleware = multer({
            storage: multer.diskStorage({
                destination: (req, file, callback) => {
                    callback(null, process.env.UPLOAD_DIR as string);
                },
                filename: (req: Request, file, callback) => {
                    const randStart = SecurityUtils.randomString(8);
                    const randEnd = SecurityUtils.randomString(8);
                    const mimeTypeEncoded = SecurityUtils.base64Encode(file.mimetype);
                    callback(null, `${randStart}${req.user?._id}${randEnd}.${mimeTypeEncoded}`);
                }
            })
        });
    }

    async createAsset(req: express.Request, res: express.Response) {
       if(!req.file) {
           res.status(400).end();
           return;
       }
       res.status(201).json({asset: req.file.filename}).end();
    }

    async getAsset(req: express.Request, res: express.Response) {
        const assetId = req.params.asset_id;
        try {
            const file = await readFile(path.join(process.env.UPLOAD_DIR as string, assetId));
            const mimeTypeEncoded = assetId.split('.')[1];
            res.set("content-type", SecurityUtils.base64Decode(mimeTypeEncoded));
            res.set("content-length", `${file.length}`);
            res.send(file);
        } catch(err) {
            res.status(404).end();
        }
    }

    async deleteAsset(req: express.Request, res: express.Response) {
        const assetId = req.params.asset_id;
        const userId = assetId.slice(8, 32);
        if(req.user?._id.toString() === userId || req.user?.role === IUserRole.SuperAdmin) {
            try {
                await rm(path.join(process.env.UPLOAD_DIR as string, assetId))
                res.status(204).end();
            } catch(err) {
                res.status(400).end();
            }
        } else {
            res.status(403).end();
        }
    }

    buildRouter(): express.Router {
        const router = express.Router();
        router.post("/",
            sessionMiddleware(),
            this.uploadMiddleware.single('file'),
            this.createAsset.bind(this));
        router.get("/:asset_id",
            sessionMiddleware(),
            this.getAsset.bind(this));
        router.delete("/:asset_id",
            sessionMiddleware(),
            this.deleteAsset.bind(this));
        return router;
    }
}