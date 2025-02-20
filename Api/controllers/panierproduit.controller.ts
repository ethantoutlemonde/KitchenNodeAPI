import { Request, Response } from "express";
import * as PanierproduitService from "../services/panierproduit.service";

export const createPanierproduit = async (req: Request, res: Response) => {
    try {
        const panierproduit = await PanierproduitService.createPanierproduit(req.body);
        res.status(201).send(panierproduit);
    } catch (error) {
        res.status(400).send(error);
    }
};

export const getPanierproduits = async (req: Request, res: Response) => {
    try {
        const panierproduits = await PanierproduitService.getPanierproduits();
        res.status(200).send(panierproduits);
    } catch (error) {
        res.status(500).send(error);
    }
};

export const getPanierproduitById = async (req: Request, res: Response) => {
    try {
        const panierproduit = await PanierproduitService.getPanierproduitById(req.params.id);
        if (!panierproduit) {
            return res.status(404).send();
        }
        res.status(200).send(panierproduit);
    } catch (error) {
        res.status(500).send(error);
    }
};

export const updatePanierproduit = async (req: Request, res: Response) => {
    try {
        const panierproduit = await PanierproduitService.updatePanierproduit(req.params.id, req.body);
        if (!panierproduit) {
            return res.status(404).send();
        }
        res.status(200).send(panierproduit);
    } catch (error) {
        res.status(400).send(error);
    }
};

export const deletePanierproduit = async (req: Request, res: Response) => {
    try {
        const panierproduit = await PanierproduitService.deletePanierproduit(req.params.id);
        if (!panierproduit) {
            return res.status(404).send();
        }
        res.status(200).send(panierproduit);
    } catch (error) {
        res.status(500).send(error);
    }
};