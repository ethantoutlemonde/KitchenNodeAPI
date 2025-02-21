import express from "express";
import { config } from "dotenv";
config();
import {
    AuthController,
    UserController,
    VendController,
    ProduitController,
    PromoMenuController,
    PromotionController,
    RestaurantController,
    SessionController,
    AdminController,
    AdresseController,
    ChatController,
    CommandeController,
    ConfectionneController,
    ContientController,
    IngredientController,
    MenuController,
    PanierController,
    PresentController,
    PromoproduitController,
    PromopanierController,
    PaniermenuController,
    PanierproduitController

} from "./controllers";
import { MongooseService } from "./services";
// import { IUserRole } from "./models";
import { stat, mkdir } from "fs/promises";

function launchAPI() {
    const app = express();

    app.use(express.json());

    // app.use('/auth', AuthController.getInstance().buildRouter());
    app.use('/user', UserController.getInstance().buildRouter());
    app.use('/vend', VendController.getInstance().buildRouter());
    app.use('/produit', ProduitController.getInstance().buildRouter());
    app.use('/promoproduit', PromoproduitController.getInstance().buildRouter());
    app.use('/promopanier', PromopanierController.getInstance().buildRouter());
    app.use('/promomenu', PromoMenuController.getInstance().buildRouter());
    app.use('/promotion', PromotionController.getInstance().buildRouter());
    app.use('/restaurant', RestaurantController.getInstance().buildRouter());
    app.use('/session', SessionController.getInstance().buildRouter());
    app.use('/admin', AdminController.getInstance().buildRouter());
    app.use('/adresse', AdresseController.getInstance().buildRouter());
    app.use('/chat', ChatController.getInstance().buildRouter());
    app.use('/commande', CommandeController.getInstance().buildRouter());
    app.use('/confectionne', ConfectionneController.getInstance().buildRouter());
    app.use('/contient', ContientController.getInstance().buildRouter());
    app.use('/ingredient', IngredientController.getInstance().buildRouter());
    app.use('/menu', MenuController.getInstance().buildRouter());
    app.use('/panier', PanierController.getInstance().buildRouter());
    app.use('/paniermenu', PaniermenuController.getInstance().buildRouter());
    app.use('/panierproduit', PanierproduitController.getInstance().buildRouter());
    app.use('/present', PresentController.getInstance().buildRouter());

    app.listen(process.env.PORT, () => console.log(`Listening on port ${process.env.PORT}`));
}

async function setupAPI(): Promise<void> {
    const mongooseService = await MongooseService.getInstance();
    const userService = mongooseService.userService;
    const rootUser = await userService.findUserByLogin("root");
    if (!rootUser) {
        const user = await userService.createUser(
            'employee',
            'root@esgiking.fr',
            'root'
        );
    }
}

async function createUploadDir(): Promise<void> {
    try {
        await stat(process.env.UPLOAD_DIR as string);
        return;
    } catch (err) {
        await mkdir(process.env.UPLOAD_DIR as string, { recursive: true });
    }
}

async function main(): Promise<void> {
    await createUploadDir();
    await setupAPI();
    launchAPI();
}

main().catch(console.error);
