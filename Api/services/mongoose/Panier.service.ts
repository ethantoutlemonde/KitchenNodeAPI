import { Request, Response } from "express";
import { Panier } from "../models/panierModel";

export const createPanier = async (req: Request, res: Response) => {
    try {
        const panier = new Panier(req.body);
        await panier.save();
        res.status(201).send(panier);
    } catch (error) {
        res.status(400).send(error);
    }
};

export const getPaniers = async (req: Request, res: Response) => {
    try {
        const paniers = await Panier.find().populate('User');
        res.status(200).send(paniers);
    } catch (error) {
        res.status(500).send(error);
    }
};

export const getPanierById = async (req: Request, res: Response) => {
    try {
        const panier = await Panier.findById(req.params.id).populate('User');
        if (!panier) {
            return res.status(404).send();
        }
        res.status(200).send(panier);
    } catch (error) {
        res.status(500).send(error);
    }
};

export const updatePanier = async (req: Request, res: Response) => {
    try {
        const panier = await Panier.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!panier) {
            return res.status(404).send();
        }
        res.status(200).send(panier);
    } catch (error) {
        res.status(400).send(error);
    }
};

export const deletePanier = async (req: Request, res: Response) => {
    try {
        const panier = await Panier.findByIdAndDelete(req.params.id);
        if (!panier) {
            return res.status(404).send();
        }
        res.status(200).send(panier);
    } catch (error) {
        res.status(500).send(error);
    }
};