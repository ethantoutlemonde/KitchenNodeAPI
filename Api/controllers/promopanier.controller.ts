import { Request, Response } from "express";
import {PromopanierService} from "../services";


export const createPromopanier = async (req: Request, res: Response) => {
    try {
        const promopanier = await PromopanierService.createPromopanier(req.body);
        res.status(201).send(promopanier);
    } catch (error) {
        res.status(400).send(error);
    }
};

export const getPromopaniers = async (req: Request, res: Response) => {
    try {
        const promopaniers = await PromopanierService.getPromopaniers();
        res.status(200).send(promopaniers);
    } catch (error) {
        res.status(500).send(error);
    }
};

export const getPromopanierById = async (req: Request, res: Response) => {
    try {
        const promopanier = await PromopanierService.getPromopanierById(req.params.id);
        if (!promopanier) {
            return res.status(404).send();
        }
        res.status(200).send(promopanier);
    } catch (error) {
        res.status(500).send(error);
    }
};

export const updatePromopanier = async (req: Request, res: Response) => {
    try {
        const promopanier = await PromopanierService.updatePromopanier(req.params.id, req.body);
        if (!promopanier) {
            return res.status(404).send();
        }
        res.status(200).send(promopanier);
    } catch (error) {
        res.status(400).send(error);
    }
};

export const deletePromopanier = async (req: Request, res: Response) => {
    try {
        const promopanier = await PromopanierService.deletePromopanier(req.params.id);
        if (!promopanier) {
            return res.status(404).send();
        }
        res.status(200).send(promopanier);
    } catch (error) {
        res.status(500).send(error);
    }
};