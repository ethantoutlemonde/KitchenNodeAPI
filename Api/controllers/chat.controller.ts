import { Request, Response } from "express";
import {ChatService} from "../services";


export const createChat = async (req: Request, res: Response) => {
    try {
        const chat = await ChatService.createChat(req.body);
        res.status(201).send(chat);
    } catch (error) {
        res.status(400).send(error);
    }
};

export const getChats = async (req: Request, res: Response) => {
    try {
        const chats = await ChatService.getChats();
        res.status(200).send(chats);
    } catch (error) {
        res.status(500).send(error);
    }
};

export const getChatById = async (req: Request, res: Response) => {
    try {
        const chat = await ChatService.getChatById(req.params.id);
        if (!chat) {
            return res.status(404).send();
        }
        res.status(200).send(chat);
    } catch (error) {
        res.status(500).send(error);
    }
};

export const updateChat = async (req: Request, res: Response) => {
    try {
        const chat = await ChatService.updateChat(req.params.id, req.body);
        if (!chat) {
            return res.status(404).send();
        }
        res.status(200).send(chat);
    } catch (error) {
        res.status(400).send(error);
    }
};

export const deleteChat = async (req: Request, res: Response) => {
    try {
        const chat = await ChatService.deleteChat(req.params.id);
        if (!chat) {
            return res.status(404).send();
        }
        res.status(200).send(chat);
    } catch (error) {
        res.status(500).send(error);
    }
};