import { Request, Response } from "express";
import * as PresentService from "../services/present.service";

export const createPresent = async (req: Request, res: Response) => {
    try {
        const present = await PresentService.createPresent(req.body);
        res.status(201).send(present);
    } catch (error) {
        res.status(400).send(error);
    }
};

export const getPresents = async (req: Request, res: Response) => {
    try {
        const presents = await PresentService.getPresents();
        res.status(200).send(presents);
    } catch (error) {
        res.status(500).send(error);
    }
};

export const getPresentById = async (req: Request, res: Response) => {
    try {
        const present = await PresentService.getPresentById(req.params.id);
        if (!present) {
            return res.status(404).send();
        }
        res.status(200).send(present);
    } catch (error) {
        res.status(500).send(error);
    }
};

export const updatePresent = async (req: Request, res: Response) => {
    try {
        const present = await PresentService.updatePresent(req.params.id, req.body);
        if (!present) {
            return res.status(404).send();
        }
        res.status(200).send(present);
    } catch (error) {
        res.status(400).send(error);
    }
};

export const deletePresent = async (req: Request, res: Response) => {
    try {
        const present = await PresentService.deletePresent(req.params.id);
        if (!present) {
            return res.status(404).send();
        }
        res.status(200).send(present);
    } catch (error) {
        res.status(500).send(error);
    }
};