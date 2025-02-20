import { Request, Response } from "express";
import {VendService} from "../services";


export const createVend = async (req: Request, res: Response) => {
    try {
        const vend = await VendService.createVend(req.body);
        res.status(201).send(vend);
    } catch (error) {
        res.status(400).send(error);
    }
};

export const getVends = async (req: Request, res: Response) => {
    try {
        const vends = await VendService.getVends();
        res.status(200).send(vends);
    } catch (error) {
        res.status(500).send(error);
    }
};

export const getVendById = async (req: Request, res: Response) => {
    try {
        const vend = await VendService.getVendById(req.params.id);
        if (!vend) {
            return res.status(404).send();
        }
        res.status(200).send(vend);
    } catch (error) {
        res.status(500).send(error);
    }
};

export const updateVend = async (req: Request, res: Response) => {
    try {
        const vend = await VendService.updateVend(req.params.id, req.body);
        if (!vend) {
            return res.status(404).send();
        }
        res.status(200).send(vend);
    } catch (error) {
        res.status(400).send(error);
    }
};

export const deleteVend = async (req: Request, res: Response) => {
    try {
        const vend = await VendService.deleteVend(req.params.id);
        if (!vend) {
            return res.status(404).send();
        }
        res.status(200).send(vend);
    } catch (error) {
        res.status(500).send(error);
    }
};