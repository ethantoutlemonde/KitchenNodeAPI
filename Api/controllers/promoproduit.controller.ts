import express from "express";
import { MongooseService } from "../services";

export class PromoproduitController {
    private static instance?: PromoproduitController;

    static getInstance(): PromoproduitController {
        if (!PromoproduitController.instance) {
            PromoproduitController.instance = new PromoproduitController();
        }
        return PromoproduitController.instance;
    }

    async createPromoProduit(req: express.Request, res: express.Response): Promise<void> {
        try {
            // Vérification des champs requis
            const { produit, promotion } = req.body;
    
            if (!produit || !promotion) {
                res.status(400).json({ error: "Missing required fields: produit, promotion" });
                return;
            }
    
            // Création de la promoProduit via le service
            const mongooseService = await MongooseService.getInstance();
            const promoProduitService = mongooseService.promoProduitService;
            const promoProduit = await promoProduitService.createPromoProduit(produit, promotion);
    
            res.status(201).json(promoProduit);
        } catch (error) {
            console.error(error); // Pour le débogage
            res.status(400).json({ error: "Failed to create promoProduit" });
        }
    }
    

    async getAll(req: express.Request, res: express.Response): Promise<void> {
        try {
            const mongooseService = await MongooseService.getInstance();
            const promoproduitService = mongooseService.promoProduitService;
            const promoproduits = await promoproduitService.getPromoProduits();
            
            res.status(200).json(promoproduits);
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
            const promoproduitService = mongooseService.promoProduitService;
            const promoproduit = await promoproduitService.getPromoProduitById(req.params.id);

            if (!promoproduit) {
                res.status(404).json({ error: "Not found" });
                return;
            }

            res.status(200).json(promoproduit);
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
            const promoproduitService = mongooseService.promoProduitService;
            const updatedPromoproduit = await promoproduitService.updatePromoProduit(req.params.id, req.body);

            if (!updatedPromoproduit) {
                res.status(404).json({ error: "Not found" });
                return;
            }

            res.status(200).json(updatedPromoproduit);
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
            const promoproduitService = mongooseService.promoProduitService;
            const deletedPromoproduit = await promoproduitService.deletePromoProduit(req.params.id);

            if (!deletedPromoproduit) {
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
        router.get("/promoproduits", express.json(), this.getAll.bind(this));
        router.get("/promoproduits/:id", express.json(), this.getById.bind(this));
        router.post("/promoproduits", express.json(), this.createPromoProduit.bind(this));
        router.put("/promoproduits/:id", express.json(), this.update.bind(this));
        router.delete("/promoproduits/:id", this.delete.bind(this));
        return router;
    }
}
