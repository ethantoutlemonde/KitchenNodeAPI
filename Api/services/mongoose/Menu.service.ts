import { Request, Response } from "express";
import { Menu } from "../models/menuModel";

export const createMenu = async (req: Request, res: Response) => {
    try {
        const menu = new Menu(req.body);
        await menu.save();
        res.status(201).send(menu);
    } catch (error) {
        res.status(400).send(error);
    }
};

export const getMenus = async (req: Request, res: Response) => {
    try {
        const menus = await Menu.find().populate('Produits');
        res.status(200).send(menus);
    } catch (error) {
        res.status(500).send(error);
    }
};

export const getMenuById = async (req: Request, res: Response) => {
    try {
        const menu = await Menu.findById(req.params.id).populate('Produits');
        if (!menu) {
            return res.status(404).send();
        }
        res.status(200).send(menu);
    } catch (error) {
        res.status(500).send(error);
    }
};

export const updateMenu = async (req: Request, res: Response) => {
    try {
        const menu = await Menu.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!menu) {
            return res.status(404).send();
        }
        res.status(200).send(menu);
    } catch (error) {
        res.status(400).send(error);
    }
};

export const deleteMenu = async (req: Request, res: Response) => {
    try {
        const menu = await Menu.findByIdAndDelete(req.params.id);
        if (!menu) {
            return res.status(404).send();
        }
        res.status(200).send(menu);
    } catch (error) {
        res.status(500).send(error);
    }
};