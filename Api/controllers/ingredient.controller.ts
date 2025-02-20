import { Request, Response } from "express";
import * as IngredientService from "../services/ingredient.service";

export const createIngredient = async (req: Request, res: Response) => {
    try {
        const ingredient = await IngredientService.createIngredient(req.body);
        res.status(201).send(ingredient);
    } catch (error) {
        res.status(400).send(error);
    }
};

export const getIngredients = async (req: Request, res: Response) => {
    try {
        const ingredients = await IngredientService.getIngredients();
        res.status(200).send(ingredients);
    } catch (error) {
        res.status(500).send(error);
    }
};

export const getIngredientById = async (req: Request, res: Response) => {
    try {
        const ingredient = await IngredientService.getIngredientById(req.params.id);
        if (!ingredient) {
            return res.status(404).send();
        }
        res.status(200).send(ingredient);
    } catch (error) {
        res.status(500).send(error);
    }
};

export const updateIngredient = async (req: Request, res: Response) => {
    try {
        const ingredient = await IngredientService.updateIngredient(req.params.id, req.body);
        if (!ingredient) {
            return res.status(404).send();
        }
        res.status(200).send(ingredient);
    } catch (error) {
        res.status(400).send(error);
    }
};

export const deleteIngredient = async (req: Request, res: Response) => {
    try {
        const ingredient = await IngredientService.deleteIngredient(req.params.id);
        if (!ingredient) {
            return res.status(404).send();
        }
        res.status(200).send(ingredient);
    } catch (error) {
        res.status(500).send(error);
    }
};