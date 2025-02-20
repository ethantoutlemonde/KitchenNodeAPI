import { Request, Response } from "express";
import {ConfectionneService} from "../services";


export const createConfectionne = async (req: Request, res: Response) => {
    try {
        const confectionne = await ConfectionneService.createConfectionne(req.body);
        res.status(201).send(confectionne);
    } catch (error) {
        res.status(400).send(error);
    }
};

export const getConfectionnes = async (req: Request, res: Response) => {
    try {
        const confectionnes = await ConfectionneService.getConfectionnes();
        res.status(200).send(confectionnes);
    } catch (error) {
        res.status(500).send(error);
    }
};

export const getConfectionneById = async (req: Request, res: Response) => {
    try {
        const confectionne = await ConfectionneService.getConfectionneById(req.params.id);
        if (!confectionne) {
            return res.status(404).send();
        }
        res.status(200).send(confectionne);
    } catch (error) {
        res.status(500).send(error);
    }
};

export const updateConfectionne = async (req: Request, res: Response) => {
    try {
        const confectionne = await ConfectionneService.updateConfectionne(req.params.id, req.body);
        if (!confectionne) {
            return res.status(404).send();
        }
        res.status(200).send(confectionne);
    } catch (error) {
        res.status(400).send(error);
    }
};

export const deleteConfectionne = async (req: Request, res: Response) => {
    try {
        const confectionne = await ConfectionneService.deleteConfectionne(req.params.id);
        if (!confectionne) {
            return res.status(404).send();
        }
        res.status(200).send(confectionne);
    } catch (error) {
        res.status(500).send(error);
    }
};