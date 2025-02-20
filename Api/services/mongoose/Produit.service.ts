import { Request, Response } from "express";
import { Produit } from "../models/produitModel";

export const createProduit = async (req: Request, res: Response) => {
    try {
        const produit = new Produit(req.body);
        await produit.save();
        res.status(201).send(produit);
    } catch (error) {
        res.status(400).send(error);
    }
};

export const getProduits = async (req: Request, res: Response) => {
    try {
        const produits = await Produit.find();
        res.status(200).send(produits);
    } catch (error) {
        res.status(500).send(error);
    }
};

export const getProduitById = async (req: Request, res: Response) => {
    try {
        const produit = await Produit.findById(req.params.id);
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
        const produit = await Produit.findByIdAndUpdate(req.params.id, req.body, { new: true });
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
        const produit = await Produit.findByIdAndDelete(req.params.id);
        if (!produit) {
            return res.status(404).send();
        }
        res.status(200).send(produit);
    } catch (error) {
        res.status(500).send(error);
    }
};