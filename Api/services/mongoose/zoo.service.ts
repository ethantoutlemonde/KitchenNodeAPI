import {Model} from "mongoose";
import {MongooseService} from "./mongoose.service";
import {zooSchema} from "./schema";
import {Models} from "./mongoose.models";
import {IZoo} from "../../models";

// Omit permet de creer une nouveau type en se basant sur un autre en enlevant les clés necessaires.
export type ICreateZoo = Omit<IZoo, '_id' | 'createdAt' | 'updatedAt'>;

export class ZooService {

    readonly mongooseService: MongooseService;
    readonly zooModel: Model<IZoo>;

    constructor(mongooseService: MongooseService) {
        this.mongooseService = mongooseService;
        // création du Model à partir de mongoose et d'un schema
        this.zooModel = this.mongooseService.mongoose.model(Models.Zoo, zooSchema);
    }

    createZoo(zoo: ICreateZoo): Promise<IZoo> {
        return this.zooModel.create(zoo); // creer la session EN BASE
    }
}