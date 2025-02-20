import { Request, Response } from "express";
import {AdresseService} from "../services";

export const createAdresse = async (req: Request, res: Response) => {
    try {
        const adresse = await AdresseService.createAdresse(req.body);
        res.status(201).send(adresse);
    } catch (error) {
        res.status(400).send(error);
    }
};

export const getAdresses = async (req: Request, res: Response) => {
    try {
        const adresses = await AdresseService.getAdresses();
        res.status(200).send(adresses);
    } catch (error) {
        res.status(500).send(error);
    }
};

export const getAdresseById = async (req: Request, res: Response) => {
    try {
        const adresse = await AdresseService.getAdresseById(req.params.id);
        if (!adresse) {
            return res.status(404).send();
        }
        res.status(200).send(adresse);
    } catch (error) {
        res.status(500).send(error);
    }
};

export const updateAdresse = async (req: Request, res: Response) => {
    try {
        const adresse = await AdresseService.updateAdresse(req.params.id, req.body);
        if (!adresse) {
            return res.status(404).send();
        }
        res.status(200).send(adresse);
    } catch (error) {
        res.status(400).send(error);
    }
};

export const deleteAdresse = async (req: Request, res: Response) => {
    try {
        const adresse = await AdresseService.deleteAdresse(req.params.id);
        if (!adresse) {
            return res.status(404).send();
        }
        res.status(200).send(adresse);
    } catch (error) {
        res.status(500).send(error);
    }
};