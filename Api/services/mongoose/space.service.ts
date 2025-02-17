import {Model} from "mongoose";
import {MongooseService} from "./mongoose.service";
import {ISpace} from "../../models";
import {spaceSchema} from "./schema";
import {Models} from "./mongoose.models";

// Partial -> Rendre toutes les clés d'un type optionnel
// Pick -> Permet de selectionner des clés dans un type
export type ICreateSpace = Omit<ISpace, '_id' | 'createdAt' | 'updatedAt' | 'images' | 'disabled' | 'accessibility'> &
                            Partial<Pick<ISpace, 'images' | 'disabled' | 'accessibility'>>

export class SpaceService {

    readonly mongooseService: MongooseService;
    readonly spaceModel: Model<ISpace>;

    constructor(mongooseService: MongooseService) {
        this.mongooseService = mongooseService;
        // création du Model à partir de mongoose et d'un schema
        this.spaceModel = this.mongooseService.mongoose.model(Models.Space, spaceSchema);
    }

    createSpace(space: ICreateSpace): Promise<ISpace> {
        return this.spaceModel.create(space);
    }
}