import {Mongoose, connect} from "mongoose";
import {UserService} from "./user.service";
import {SessionService} from "./session.service";
import {ZooService} from "./zoo.service";
import {SpaceService} from "./space.service";

export class MongooseService {

    private static instance?: MongooseService;
    public mongoose: Mongoose;
    public userService: UserService;
    public sessionService: SessionService;
    public zooService: ZooService;
    public spaceService: SpaceService;

    private constructor(mongoose: Mongoose) {
        this.mongoose = mongoose;
        this.userService = new UserService(this);
        this.sessionService = new SessionService(this);
        this.zooService = new ZooService(this);
        this.spaceService = new SpaceService(this);
    }

    public static async getInstance(): Promise<MongooseService> {
        if (!MongooseService.instance) {
            const connection = await MongooseService.openConnection();
            MongooseService.instance = new MongooseService(connection);
        }
        return MongooseService.instance;
    }

    private static openConnection(): Promise<Mongoose> {
        return connect(process.env.MONGODB_URI as string, {
            auth: {
                username: process.env.MONGODB_USER,
                password: process.env.MONGODB_PWD,
            },
            authSource: 'admin',
            dbName: process.env.MONGODB_DB as string
        });
    }
}