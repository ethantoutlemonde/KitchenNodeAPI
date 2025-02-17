import express from "express";
import {IUserRole, userRoleLevel} from "../models";

export function roleMiddleware(role: IUserRole): express.RequestHandler {

    return async (req: express.Request, res: express.Response, next: express.NextFunction) => {
        if(req.user) {
            const userLevel = userRoleLevel(req.user.role);
            const currentLevel = userRoleLevel(role);
            if(userLevel >= currentLevel) {
                next();
                return;
            }
        }
        res.status(403).end();
    }
}