import express from 'express';
import { MongooseService } from "../services";
import {IUser} from "../models";

declare global {
    namespace Express {
        interface Request {
            user?: IUser;
        }
    }
}


export default function RoleMiddleware(roles: IUser["Role"][]): express.RequestHandler {
    return (req: express.Request, res: express.Response, next: express.NextFunction) => {
        if (req.user && roles.includes(req.user.Role)) {
            next();
            return;
        }
        res.status(403).end();
    };
}

