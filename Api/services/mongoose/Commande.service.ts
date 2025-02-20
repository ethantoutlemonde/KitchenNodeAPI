import { Request, Response } from "express";
import { ICommande } from "../models/commande.interface";

export const createCommande = async (req: Request, res: Response) => {
    try {
        const commande = new Commande(req.body);
        await commande.save();
        res.status(201).send(commande);
    } catch (error) {
        res.status(400).send(error);
    }
};

export const getCommandes = async (req: Request, res: Response) => {
    try {
        const commandes = await commande.find()
            .populate('Adresse')
            .populate('User')
            .populate('Panier');
        res.status(200).send(commandes);
    } catch (error) {
        res.status(500).send(error);
    }
};

export const getCommandeById = async (req: Request, res: Response) => {
    try {
        const commande = await Commande.findById(req.params.id)
            .populate('Adresse')
            .populate('User')
            .populate('Panier');
        if (!commande) {
            return res.status(404).send