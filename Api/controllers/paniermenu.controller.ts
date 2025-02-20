import { Request, Response } from "express";
import * as PaniermenuService from "../services/paniermenu.service";

export const createPaniermenu = async (req: Request, res: Response) => {
    try {
        const paniermenu = await PaniermenuService.createPaniermenu(req.body);
        res.status(201).send(paniermenu);
    } catch (error) {
        res.status(400).send(error);
    }
};

export const getPaniermenus = async (req: Request, res: Response) => {
    try {
        const paniermenus = await PaniermenuService.getPaniermenus();
        res.status(200).send(paniermenus);
    } catch (error) {
        res.status(500).send(error);
    }
};

export const getPaniermenuById = async (req: Request, res: Response) => {
    try {
        const paniermenu = await PaniermenuService.getPaniermenuById(req.params.id);
        if (!paniermenu) {
            return res.status(404).send();
        }
        res.status(200).send(paniermenu);
    } catch (error) {
        res.status(500).send(error);
    }
};

export const updatePaniermenu = async (req: Request, res: Response) => {
    try {
        const paniermenu = await PaniermenuService.updatePaniermenu(req.params.id, req.body);
        if (!paniermenu) {
            return res.status(404).send();
        }
        res.status(200).send(paniermenu);
    } catch (error) {
        res.status(400).send(error);
    }
};

export const deletePaniermenu = async (req: Request, res: Response) => {
    try {
        const paniermenu = await PaniermenuService.deletePaniermenu(req.params.id);
        if (!paniermenu) {
            return res.status(404).send();
        }
        res.status(200).send(paniermenu);
    } catch (error) {
        res.status(500).send(error);
    }
};