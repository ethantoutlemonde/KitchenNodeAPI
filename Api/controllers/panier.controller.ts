import { Request, Response } from "express";
import {PanierService} from "../services";


export const createPanier = async (req: Request, res: Response) => {
    try {
        const panier = await PanierService.createPanier(req.body);
        res.status(201).send(panier);
    } catch (error) {
        res.status(400).send(error);
    }
};

export const getPaniers = async (req: Request, res: Response) => {
    try {
        const paniers = await PanierService.getPaniers();
        res.status(200).send(paniers);
    } catch (error) {
        res.status(500).send(error);
    }
};

export const getPanierById = async (req: Request, res: Response) => {
    try {
        const panier = await PanierService.getPanierById(req.params.id);
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
        const panier = await PanierService.updatePanier(req.params.id, req.body);
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
        const panier = await PanierService.deletePanier(req.params.id);
        if (!panier) {
            return res.status(404).send();
        }
        res.status(200).send(panier);
    } catch (error) {
        res.status(500).send(error);
    }
};