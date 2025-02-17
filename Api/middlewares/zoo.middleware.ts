import express from "express";
import {IUser, IUserRole} from "../models";

export const kZooKeys = ["zoo", "zoo_id", "zooId"];

export function zooMiddleware(): express.RequestHandler {

    return async (req: express.Request, res: express.Response, next: express.NextFunction) => {
        if(req.user) {
            let userZooId = req.user.zoo;
            if(!userZooId) {
                if(req.user.role === IUserRole.SuperAdmin) {
                    next();
                    return
                }
            } else {
                if(typeof userZooId !== "string") {
                    userZooId = userZooId._id;
                }
                userZooId = userZooId.toString(); // evite les effets de bord sur ObjectId != string
                if(req.body) {
                    for(const key of kZooKeys) {
                        if(typeof req.body[key] === "string") {
                            if(userZooId === req.body[key]) {
                                next();
                                return
                            }
                        }
                    }
                }
                if(req.query) { // ?zoo=XXX
                    for(const key of kZooKeys) {
                        if(typeof req.query[key] === "string") {
                            if(userZooId === req.query[key]) {
                                next();
                                return
                            }
                        }
                    }
                }
                if(req.params) { // url/XXX
                    for(const key of kZooKeys) {
                        if(typeof req.params[key] === "string") {
                            if(userZooId === req.params[key]) {
                                next();
                                return
                            }
                        }
                    }
                }
            }
        }
        res.status(403).end();
    }
}