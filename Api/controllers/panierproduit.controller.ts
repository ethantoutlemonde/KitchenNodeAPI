import express from "express";
import { MongooseService } from "../services";
// import { sessionMiddleware, roleMiddleware } from "../middleware";
// import { IEmployeeRole } from "../models";

export class PanierproduitController {
    private static instance?: PanierproduitController;

    static getInstance(): PanierproduitController {
        if (!PanierproduitController.instance) {
            PanierproduitController.instance = new PanierproduitController();
        }
        return PanierproduitController.instance;
    }

    async createPanierProduit(req: express.Request, res: express.Response): Promise<void> {
        try {
            // Vérification des champs requis
            const { produit, panier } = req.body;
    
            if (!produit || !panier) {
                res.status(400).json({ error: "Missing required fields: produit, panier" });
                return;
            }
    
            // Création de l'association entre un produit et un panier via le service
            const mongooseService = await MongooseService.getInstance();
            const panierProduitService = mongooseService.panierProduitService;
            const panierProduit = await panierProduitService.createPanierProduit(produit, panier);
    
            res.status(201).json(panierProduit);
        } catch (error) {
            console.error(error); // Pour aider au débogage
            res.status(400).json({ error: "Failed to create panierProduit" });
        }
    }
    

    async getAll(req: express.Request, res: express.Response): Promise<void> {
        try {
            const mongooseService = await MongooseService.getInstance();
            const panierproduitService = mongooseService.panierProduitService;
            const panierproduits = await panierproduitService.getPanierProduits();
            res.status(200).json(panierproduits);
        } catch (error) {
            res.status(500).json({ error: "Internal server error" });
        }
    }

    async getById(req: express.Request, res: express.Response): Promise<void> {
        try {
            if (!req.params.id) {
                res.status(400).json({ error: "Missing ID parameter" });
                return;
            }
            
            const mongooseService = await MongooseService.getInstance();
            const panierproduitService = mongooseService.panierProduitService;
            const panierproduit = await panierproduitService.getPanierProduitById(req.params.id);
            if (!panierproduit) {
                res.status(404).json({ error: "Not found" });
                return;
            }
            res.status(200).json(panierproduit);
        } catch (error) {
            res.status(500).json({ error: "Internal server error" });
        }
    }

    async update(req: express.Request, res: express.Response): Promise<void> {
        try {
            if (!req.params.id || !req.body) {
                res.status(400).json({ error: "Missing required fields" });
                return;
            }
            
            const mongooseService = await MongooseService.getInstance();
            const panierproduitService = mongooseService.panierProduitService;
            const updatedPanierproduit = await panierproduitService.updatePanierProduit(req.params.id, req.body);
            if (!updatedPanierproduit) {
                res.status(404).json({ error: "Not found" });
                return;
            }
            res.status(200).json(updatedPanierproduit);
        } catch (error) {
            res.status(500).json({ error: "Internal server error" });
        }
    }

    async delete(req: express.Request, res: express.Response): Promise<void> {
        try {
            if (!req.params.id) {
                res.status(400).json({ error: "Missing ID parameter" });
                return;
            }
            
            const mongooseService = await MongooseService.getInstance();
            const panierproduitService = mongooseService.panierProduitService;
            const deletedPanierproduit = await panierproduitService.deletePanierProduit(req.params.id);
            if (!deletedPanierproduit) {
                res.status(404).json({ error: "Not found" });
                return;
            }
            res.status(204).end();
        } catch (error) {
            res.status(500).json({ error: "Internal server error" });
        }
    }

    buildRouter(): express.Router {
        const router = express.Router();
        router.get("/paniersproduits", express.json(), this.getAll.bind(this));
        router.get("/paniersproduits/:id", express.json(), this.getById.bind(this));
        router.post(
            "/paniersproduits",
            // sessionMiddleware(),
            express.json(),
            // roleMiddleware(IEmployeeRole.ADMIN),
            this.createPanierProduit.bind(this)
        );
        router.put(
            "/paniersproduits/:id",
            // sessionMiddleware(),
            express.json(),
            // roleMiddleware(IEmployeeRole.ADMIN),
            this.update.bind(this)
        );
        router.delete(
            "/paniersproduits/:id",
            // sessionMiddleware(),
            // roleMiddleware(IEmployeeRole.ADMIN),
            this.delete.bind(this)
        );
        return router;
    }
}