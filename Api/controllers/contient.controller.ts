import { Request, Response } from "express";
import * as ContientService from "../services/contient.service";

export const createContient = async (req: Request, res: Response) => {
    try {
        const contient = await ContientService.createContient(req.body);
        res.status(201).send(contient);
    } catch (error) {
        res.status(400).send(error);
    }
};

export const getContients = async (req: Request, res: Response) => {
    try {
        const contients = await ContientService.getContients();
        res.status(200).send(contients);
    } catch (error) {
        res.status(500).send(error);
    }
};

export const getContientById = async (req: Request, res: Response) => {
    try {
        const contient = await ContientService.getContientById(req.params.id);
        if (!contient) {
            return res.status(404).send();
        }
        res.status(200).send(contient);
    } catch (error) {
        res.status(500).send(error);
    }
};

export const updateContient = async (req: Request, res: Response) => {
    try {
        const contient = await ContientService.updateContient(req.params.id, req.body);
        if (!contient) {
            return res.status(404).send();
        }
        res.status(200).send(contient);
    } catch (error) {
        res.status(400).send(error);
    }
};

export const deleteContient = async (req: Request, res: Response) => {
    try {
        const contient = await ContientService.deleteContient(req.params.id);
        if (!contient) {
            return res.status(404).send();
        }
        res.status(200).send(contient);
    } catch (error) {
        res.status(500).send(error);
    }
};