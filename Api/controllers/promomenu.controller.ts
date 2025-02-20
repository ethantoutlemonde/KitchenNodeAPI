import { Request, Response } from "express";
import {PromomenuService} from "../services";


export const createPromomenu = async (req: Request, res: Response) => {
    try {
        const promomenu = await PromomenuService.createPromomenu(req.body);
        res.status(201).send(promomenu);
    } catch (error) {
        res.status(400).send(error);
    }
};

export const getPromomenus = async (req: Request, res: Response) => {
    try {
        const promomenus = await PromomenuService.getPromomenus();
        res.status(200).send(promomenus);
    } catch (error) {
        res.status(500).send(error);
    }
};

export const getPromomenuById = async (req: Request, res: Response) => {
    try {
        const promomenu = await PromomenuService.getPromomenuById(req.params.id);
        if (!promomenu) {
            return res.status(404).send();
        }
        res.status(200).send(promomenu);
    } catch (error) {
        res.status(500).send(error);
    }
};

export const updatePromomenu = async (req: Request, res: Response) => {
    try {
        const promomenu = await PromomenuService.updatePromomenu(req.params.id, req.body);
        if (!promomenu) {
            return res.status(404).send();
        }
        res.status(200).send(promomenu);
    } catch (error) {
        res.status(400).send(error);
    }
};

export const deletePromomenu = async (req: Request, res: Response) => {
    try {
        const promomenu = await PromomenuService.deletePromomenu(req.params.id);
        if (!promomenu) {
            return res.status(404).send();
        }
        res.status(200).send(promomenu);
    } catch (error) {
        res.status(500).send(error);
    }
};