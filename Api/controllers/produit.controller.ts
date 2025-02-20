import { Request, Response } from "express";
import * as ProduitService from "../services/produit.service";

export const createProduit = async (req: Request, res: Response) => {
    try {
        const produit = await ProduitService.createProduit(req.body);
        res.status(201).send(produit);
    } catch (error) {
        res.status(400).send(error);
    }
};

export const getProduits = async (req: Request, res: Response) => {
    try {
        const produits = await ProduitService.getProduits();
        res.status(200).send(produits);
    } catch (error) {
        res.status(500).send(error);
    }
};

export const getProduitById = async (req: Request, res: Response) => {
    try {
        const produit = await ProduitService.getProduitById(req.params.id);
        if (!produit) {
            return res.status(404).send();
        }
        res.status(200).send(produit);
    } catch (error) {
        res.status(500).send(error);
    }
};

export const updateProduit = async (req: Request, res: Response) => {
    try {
        const produit = await ProduitService.updateProduit(req.params.id, req.body);
        if (!produit) {
            return res.status(404).send();
        }
        res.status(200).send(produit);
    } catch (error) {
        res.status(400).send(error);
    }
};

export const deleteProduit = async (req: Request, res: Response) => {
    try {
        const produit = await ProduitService.deleteProduit(req.params.id);
        if (!produit) {
            return res.status(404).send();
        }
        res.status(200).send(produit);
    } catch (error) {
        res.status(500).send(error);
    }
};