import express from "express";
import {config} from "dotenv";
config()
import {AssetController, AuthController, SpaceController, UserController, ZooController} from './controllers';
import {MongooseService} from "./services";
import {IUserRole} from "./models";
import {stat, mkdir} from "fs/promises";

function launchAPI() {
    const app = express();
    app.use('/asset', AssetController.getInstance().buildRouter());
    app.use('/auth', AuthController.getInstance().buildRouter());
    app.use('/zoo', ZooController.getInstance().buildRouter());
    app.use('/user', UserController.getInstance().buildRouter());
    app.use('/space', SpaceController.getInstance().buildRouter());
    app.listen(process.env.PORT, () => console.log(`Listening on port ${process.env.PORT}`));
}

async function setupAPI(): Promise<void> {
    const mongooseService = await MongooseService.getInstance();
    const userService = mongooseService.userService;
    const rootUser = await userService.findUserByLogin("root");
    if(!rootUser) {
        await userService.createUser({
            login: "root",
            role: IUserRole.SuperAdmin,
            password: "root",
            email: "root@zoo.fr",
            firstName: "Super",
            lastName: "Admin"
        });
    }
}

async function createUploadDir(): Promise<void> {
    try {
        await stat(process.env.UPLOAD_DIR as string);
        return;
    } catch(err) {
        await mkdir(process.env.UPLOAD_DIR as string, { recursive: true });
    }
}

async function main(): Promise<void> {
    await createUploadDir();
    await setupAPI();
    launchAPI();
}

main().catch(console.error);