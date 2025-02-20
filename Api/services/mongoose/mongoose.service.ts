import {Mongoose, connect} from "mongoose";
import { AdminService } from "./Admin.service";
import { AdresseService } from "./Adresse.service";
import { ChatService } from "./Chat.service";
import { CommandeService } from "./Commande.service";
import { ConfectionneService } from "./Confectionne.service";
import { ContientService } from "./Contient.service";
import { IngredientService } from "./Ingredient.service";
import { MenuService } from "./Menu.service";
import { PanierService } from "./Panier.service";
import { PanierMenuService } from "./PanierMenu.service";
import { PanierProduitService } from "./PanierProduit.service";
import { PresentService } from "./Present.service";
import { ProduitService } from "./Produit.service";
import { PromoMenuService } from "./PromoMenu.service";
import { PromoPanierService } from "./PromoPanier.service";
import { PromoProduitService } from "./PromoProduit.service";
import { PromotionService } from "./Promotion.service";
import { RestaurantService } from "./Restaurant.service";
import { SessionService } from "./Session.service";
import { UserService } from "./User.service";
import { VendreService } from "./Vend.service";

export class MongooseService {

    private static instance?: MongooseService;
    public mongoose: Mongoose;
    public adminService: AdminService;
    public adresseService: AdresseService;
    public chatService: ChatService;
    public commandeService: CommandeService;
    public confectionneService: ConfectionneService;
    public contientService: ContientService;
    public ingredientService: IngredientService;
    public menuService: MenuService;
    public panierService: PanierService;
    public panierMenuService: PanierMenuService;
    public panierProduitService: PanierProduitService;
    public presentService: PresentService;
    public produitService: ProduitService;
    public promoMenuService: PromoMenuService;
    public promoPanierService: PromoPanierService;
    public promoProduitService: PromoProduitService;
    public promotionService: PromotionService;
    public restaurantService: RestaurantService;
    public sessionService: SessionService;
    public userService: UserService;
    public vendreService: VendreService;

    private constructor(mongoose: Mongoose) {
        this.mongoose = mongoose;
        this.adminService = new AdminService();
        this.adresseService = new AdresseService();
        this.chatService = new ChatService();
        this.commandeService = new CommandeService();
        this.confectionneService = new ConfectionneService();
        this.contientService = new ContientService();
        this.ingredientService = new IngredientService();
        this.menuService = new MenuService();
        this.panierService = new PanierService();
        this.panierMenuService = new PanierMenuService();
        this.panierProduitService = new PanierProduitService();
        this.presentService = new PresentService();
        this.produitService = new ProduitService();
        this.promoMenuService = new PromoMenuService();
        this.promoPanierService = new PromoPanierService();
        this.promoProduitService = new PromoProduitService();
        this.promotionService = new PromotionService();
        this.restaurantService = new RestaurantService();
        this.sessionService = new SessionService();
        this.userService = new UserService();
        this.vendreService = new VendreService();
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