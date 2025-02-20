import { Request, Response } from "express";
import { Session } from "../models/sessionModel";

export const createSession = async (req: Request, res: Response) => {
    try {
        const session = new Session(req.body);
        await session.save();
        res.status(201).send(session);
    } catch (error) {
        res.status(400).send(error);
    }
};

export const getSessions = async (req: Request, res: Response) => {
    try {
        const sessions = await Session.find().populate('User');
        res.status(200).send(sessions);
    } catch (error) {
        res.status(500).send(error);
    }
};

export const getSessionById = async (req: Request, res: Response) => {
    try {
        const session = await Session.findById(req.params.id).populate('User');
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
        const session = await Session.findByIdAndUpdate(req.params.id, req.body, { new: true });
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
        const session = await Session.findByIdAndDelete(req.params.id);
        if (!session) {
            return res.status(404).send();
        }
        res.status(200).send(session);
    } catch (error) {
        res.status(500).send(error);
    }
};