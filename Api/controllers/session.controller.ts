import { Request, Response } from "express";
import {SessionService} from "../services";


export const createSession = async (req: Request, res: Response) => {
    try {
        const session = await SessionService.createSession(req.body);
        res.status(201).send(session);
    } catch (error) {
        res.status(400).send(error);
    }
};

export const getSessions = async (req: Request, res: Response) => {
    try {
        const sessions = await SessionService.getSessions();
        res.status(200).send(sessions);
    } catch (error) {
        res.status(500).send(error);
    }
};

export const getSessionById = async (req: Request, res: Response) => {
    try {
        const session = await SessionService.getSessionById(req.params.id);
        if (!session) {
            return res.status(404).send();
        }
        res.status(200).send(session);
    } catch (error) {
        res.status(500).send(error);
    }
};

export const updateSession = async (req: Request, res: Response) => {
    try {
        const session = await SessionService.updateSession(req.params.id, req.body);
        if (!session) {
            return res.status(404).send();
        }
        res.status(200).send(session);
    } catch (error) {
        res.status(400).send(error);
    }
};

export const deleteSession = async (req: Request, res: Response) => {
    try {
        const session = await SessionService.deleteSession(req.params.id);
        if (!session) {
            return res.status(404).send();
        }
        res.status(200).send(session);
    } catch (error) {
        res.status(500).send(error);
    }
};