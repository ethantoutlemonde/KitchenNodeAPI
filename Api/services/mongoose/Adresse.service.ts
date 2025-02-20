import { Request, Response } from "express";
import { Adresse } from "../models/adresseModel";

export const createAdresse = async (req: Request, res: Response) => {
    try {
        const adresse = new Adresse(req.body);
        await adresse.save();
        res.status(201).send(adresse);
    } catch (error) {
        res.status(400).send(error);
    }
};

export const getAdresses = async (req: Request, res: Response) => {
    try {
        const adresses = await Adresse.find();
        res.status(200).send(adresses);
    } catch (error) {
        res.status(500).send(error);
    }
};

export const getAdresseById = async (req: Request, res: Response) => {
    try {
        const adresse = await Adresse.findById(req.params.id);
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
        const adresse = await Adresse.findByIdAndUpdate(req.params.id, req.body, { new: true });
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
        const adresse = await Adresse.findByIdAndDelete(req.params.id);
        if (!adresse) {
            return res.status(404).send();
        }
        res.status(200).send(adresse);
    } catch (error) {
        res.status(500).send(error);
    }
};