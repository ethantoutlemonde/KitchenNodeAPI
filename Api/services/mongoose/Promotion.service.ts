import { Request, Response } from "express";
import { Promotion } from "../models/promotionModel";

export const createPromotion = async (req: Request, res: Response) => {
    try {
        const promotion = new Promotion(req.body);
        await promotion.save();
        res.status(201).send(promotion);
    } catch (error) {
        res.status(400).send(error);
    }
};

export const getPromotions = async (req: Request, res: Response) => {
    try {
        const promotions = await Promotion.find();
        res.status(200).send(promotions);
    } catch (error) {
        res.status(500).send(error);
    }
};

export const getPromotionById = async (req: Request, res: Response) => {
    try {
        const promotion = await Promotion.findById(req.params.id);
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
        const promotion = await Promotion.findByIdAndUpdate(req.params.id, req.body, { new: true });
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
        const promotion = await Promotion.findByIdAndDelete(req.params.id);
        if (!promotion) {
            return res.status(404).send();
        }
        res.status(200).send(promotion);
    } catch (error) {
        res.status(500).send(error);
    }
};