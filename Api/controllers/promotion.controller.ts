import { Request, Response } from "express";
import {PromotionService} from "../services";


export const createPromotion = async (req: Request, res: Response) => {
    try {
        const promotion = await PromotionService.createPromotion(req.body);
        res.status(201).send(promotion);
    } catch (error) {
        res.status(400).send(error);
    }
};

export const getPromotions = async (req: Request, res: Response) => {
    try {
        const promotions = await PromotionService.getPromotions();
        res.status(200).send(promotions);
    } catch (error) {
        res.status(500).send(error);
    }
};

export const getPromotionById = async (req: Request, res: Response) => {
    try {
        const promotion = await PromotionService.getPromotionById(req.params.id);
        if (!promotion) {
            return res.status(404).send();
        }
        res.status(200).send(promotion);
    } catch (error) {
        res.status(500).send(error);
    }
};

export const updatePromotion = async (req: Request, res: Response) => {
    try {
        const promotion = await PromotionService.updatePromotion(req.params.id, req.body);
        if (!promotion) {
            return res.status(404).send();
        }
        res.status(200).send(promotion);
    } catch (error) {
        res.status(400).send(error);
    }
};

export const deletePromotion = async (req: Request, res: Response) => {
    try {
        const promotion = await PromotionService.deletePromotion(req.params.id);
        if (!promotion) {
            return res.status(404).send();
        }
        res.status(200).send(promotion);
    } catch (error) {
        res.status(500).send(error);
    }
};
