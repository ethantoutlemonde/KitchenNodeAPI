import { Request, Response } from "express";
import * as CommandeService from "../services/commande.service";

export const createCommande = async (req: Request, res: Response) => {
    try {
        const commande = await CommandeService.createCommande(req.body);
        res.status(201).send(commande);
    } catch (error) {
        res.status(400).send(error);
    }
};

export const getCommandes = async (req: Request, res: Response) => {
    try {
        const commandes = await CommandeService.getCommandes();
        res.status(200).send(commandes);
    } catch (error) {
        res.status(500).send(error);
    }
};

export const getCommandeById = async (req: Request, res: Response) => {
    try {
        const commande = await CommandeService.getCommandeById(req.params.id);
        if (!commande) {
            return res.status(404).send();
        }
        res.status(200).send(commande);
    } catch (error) {
        res.status(500).send(error);
    }
};

export const updateCommande = async (req: Request, res: Response) => {
    try {
        const commande = await CommandeService.updateCommande(req.params.id, req.body);
        if (!commande) {
            return res.status(404).send();
        }
        res.status(200).send(commande);
    } catch (error) {
        res.status(400).send(error);
    }
};

export const deleteCommande = async (req: Request, res: Response) => {
    try {
        const commande = await CommandeService.deleteCommande(req.params.id);
        if (!commande) {
            return res.status(404).send();
        }
        res.status(200).send(commande);
    } catch (error) {
        res.status(500).send(error);
    }
};