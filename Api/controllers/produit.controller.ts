import express from "express";
import { MongooseService } from "../services";

export class ProduitController {
    private static instance?: ProduitController;

    static getInstance(): ProduitController {
        if (!ProduitController.instance) {
            ProduitController.instance = new ProduitController();
        }
        return ProduitController.instance;
    }

    async createProduit(req: express.Request, res: express.Response): Promise<void> {
        try {
            // Vérification des champs requis
            const { nom, description, prix, image, disponible } = req.body;
    
            if (!nom || !description || !prix || !image || disponible === undefined) {
                res.status(400).json({ error: "Missing required fields: nom, description, prix, image, disponible" });
                return;
            }
    
            // Création d'un produit via le service
            const mongooseService = await MongooseService.getInstance();
            const produitService = mongooseService.produitService;
            const produit = await produitService.createProduit(nom, description, prix, image, disponible);
    
            res.status(201).json(produit);
        } catch (error) {
            console.error(error); // Pour aider au débogage
            res.status(400).json({ error: "Failed to create product" });
        }
    }
    

    async getAll(req: express.Request, res: express.Response): Promise<void> {
        try {
            const mongooseService = await MongooseService.getInstance();
            const produitService = mongooseService.produitService;
            const produits = await produitService.getProduits();
            res.status(200).json(produits);
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
            const produitService = mongooseService.produitService;
            const produit = await produitService.getProduitById(req.params.id);
            if (!produit) {
                res.status(404).json({ error: "Not found" });
                return;
            }
            res.status(200).json(produit);
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
            const produitService = mongooseService.produitService;
            const updatedProduit = await produitService.updateProduit(req.params.id, req.body);
            if (!updatedProduit) {
                res.status(404).json({ error: "Not found" });
                return;
            }
            res.status(200).json(updatedProduit);
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
            const produitService = mongooseService.produitService;
            const deletedProduit = await produitService.deleteProduit(req.params.id);
            if (!deletedProduit) {
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
        router.get("/produits", express.json(), this.getAll.bind(this));
        router.get("/produits/:id", express.json(), this.getById.bind(this));
        router.post("/produits", express.json(), this.createProduit.bind(this));
        router.put("/produits/:id", express.json(), this.update.bind(this));
        router.delete("/produits/:id", this.delete.bind(this));
        return router;
    }
}
