import { Request, Response } from "express";
import { Ingredient } from "../models/ingredientModel";

export const createIngredient = async (req: Request, res: Response) => {
    try {
        const ingredient = new Ingredient(req.body);
        await ingredient.save();
        res.status(201).send(ingredient);
    } catch (error) {
        res.status(400).send(error);
    }
};

export const getIngredients = async (req: Request, res: Response) => {
    try {
        const ingredients = await Ingredient.find();
        res.status(200).send(ingredients);
    } catch (error) {
        res.status(500).send(error);
    }
};

export const getIngredientById = async (req: Request, res: Response) => {
    try {
        const ingredient = await Ingredient.findById(req.params.id);
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
        const ingredient = await Ingredient.findByIdAndUpdate(req.params.id, req.body, { new: true });
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
        const ingredient = await Ingredient.findByIdAndDelete(req.params.id);
        if (!ingredient) {
            return res.status(404).send();
        }
        res.status(200).send(ingredient);
    } catch (error) {
        res.status(500).send(error);
    }
};