import { Request, Response } from "express";
import {PromoproduitService} from "../services";


export const createPromoproduit = async (req: Request, res: Response) => {
    try {
        const promoproduit = await PromoproduitService.createPromoproduit(req.body);
        res.status(201).send(promoproduit);
    } catch (error) {
        res.status(400).send(error);
    }
};

export const getPromoproduits = async (req: Request, res: Response) => {
    try {
        const promoproduits = await PromoproduitService.getPromoproduits();
        res.status(200).send(promoproduits);
    } catch (error) {
        res.status(500).send(error);
    }
};

export const getPromoproduitById = async (req: Request, res: Response) => {
    try {
        const promoproduit = await PromoproduitService.getPromoproduitById(req.params.id);
        if (!promoproduit) {
            return res.status(404).send();
        }
        res.status(200).send(promoproduit);
    } catch (error) {
        res.status(500).send(error);
    }
};

export const updatePromoproduit = async (req: Request, res: Response) => {
    try {
        const promoproduit = await PromoproduitService.updatePromoproduit(req.params.id, req.body);
        if (!promoproduit) {
            return res.status(404).send();
        }
        res.status(200).send(promoproduit);
    } catch (error) {
        res.status(400).send(error);
    }
};

export const deletePromoproduit = async (req: Request, res: Response) => {
    try {
        const promoproduit = await PromoproduitService.deletePromoproduit(req.params.id);
        if (!promoproduit) {
            return res.status(404).send();
        }
        res.status(200).send(promoproduit);
    } catch (error) {
        res.status(500).send(error);
    }
};