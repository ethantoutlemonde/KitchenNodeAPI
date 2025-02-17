import {Model} from "mongoose";
import {MongooseService} from "./mongoose.service";
import {IUser} from "../../models";
import {userSchema} from "./schema";
import {Models} from "./mongoose.models";
import {SecurityUtils} from "../../utils";

// Omit permet de creer une nouveau type en se basant sur un autre en enlevant les clés necessaires.
export type ICreateUser = Omit<IUser, '_id' | 'createdAt' | 'updatedAt'>;

export class UserService {

    readonly mongooseService: MongooseService;
    readonly userModel: Model<IUser>;

    constructor(mongooseService: MongooseService) {
        this.mongooseService = mongooseService;
        // création du Model à partir de mongoose et d'un schema
        this.userModel = this.mongooseService.mongoose.model(Models.User, userSchema);
    }

    createUser(user: ICreateUser): Promise<IUser> {
        user.password = SecurityUtils.sha256(user.password);
        return this.userModel.create(user); // creer le USER EN BASE
    }

    findUserByLogin(login: string): Promise<IUser | null> {
        // findOne permet de recuperer 1 enregistrement avec un filtre
        // La condition du filtre utilise le mot clé AND entre chaque champs
        return this.userModel.findOne({ login: login });
    }

    findValidUser(login: string, password: string): Promise<IUser | null> {
        const encryptPassword = SecurityUtils.sha256(password);
        return this.userModel.findOne({
            login: login,
            password: encryptPassword,
        });
    }
}