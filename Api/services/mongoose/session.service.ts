import {Model, isValidObjectId} from "mongoose";
import {MongooseService} from "./mongoose.service";
import {ISession} from "../../models";
import {sessionSchema} from "./schema";
import {Models} from "./mongoose.models";

// Omit permet de creer une nouveau type en se basant sur un autre en enlevant les clés necessaires.
export type ICreateSession = Omit<ISession, '_id' | 'createdAt' | 'updatedAt'>;

export class SessionService {

    readonly mongooseService: MongooseService;
    readonly sessionModel: Model<ISession>;

    constructor(mongooseService: MongooseService) {
        this.mongooseService = mongooseService;
        // création du Model à partir de mongoose et d'un schema
        this.sessionModel = this.mongooseService.mongoose.model(Models.Session, sessionSchema);
    }

    createSession(session: ICreateSession): Promise<ISession> {
        return this.sessionModel.create(session); // creer la session EN BASE
    }

    findActiveSession(token: string): Promise<ISession | null> {
        if(!isValidObjectId(token)) {
            return Promise.resolve(null);
        }
        // populate permet de charger l'objet d'une autre collection en utilisant son id
        return this.sessionModel.findById(token).populate("user");
    }
}