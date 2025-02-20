import { Request, Response } from "express";
import * as MenuService from "../services/menu.service";

export const createMenu = async (req: Request, res: Response) => {
    try {
        const menu = await MenuService.createMenu(req.body);
        res.status(201).send(menu);
    } catch (error) {
        res.status(400).send(error);
    }
};

export const getMenus = async (req: Request, res: Response) => {
    try {
        const menus = await MenuService.getMenus();
        res.status(200).send(menus);
    } catch (error) {
        res.status(500).send(error);
    }
};

export const getMenuById = async (req: Request, res: Response) => {
    try {
        const menu = await MenuService.getMenuById(req.params.id);
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
        const menu = await MenuService.updateMenu(req.params.id, req.body);
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
        const menu = await MenuService.deleteMenu(req.params.id);
        if (!menu) {
            return res.status(404).send();
        }
        res.status(200).send(menu);
    } catch (error) {
        res.status(500).send(error);
    }
};