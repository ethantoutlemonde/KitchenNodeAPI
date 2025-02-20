import { Request, Response } from "express";
import * as UserService from "../services/user.service";

export const createUser = async (req: Request, res: Response) => {
    try {
        const user = await UserService.createUser(req.body);
        res.status(201).send(user);
    } catch (error) {
        res.status(400).send(error);
    }
};

export const getUsers = async (req: Request, res: Response) => {
    try {
        const users = await UserService.getUsers();
        res.status(200).send(users);
    } catch (error) {
        res.status(500).send(error);
    }
};

export const getUserById = async (req: Request, res: Response) => {
    try {
        const user = await UserService.getUserById(req.params.id);
        if (!user) {
            return res.status(404).send();
        }
        res.status(200).send(user);
    } catch (error) {
        res.status(500).send(error);
    }
};

export const updateUser = async (req: Request, res: Response) => {
    try {
        const user = await UserService.updateUser(req.params.id, req.body);
        if (!user) {
            return res.status(404).send();
        }
        res.status(200).send(user);
    } catch (error) {
        res.status(400).send(error);
    }
};

export const deleteUser = async (req: Request, res: Response) => {
    try {
        const user = await UserService.deleteUser(req.params.id);
        if (!user) {
            return res.status(404).send();
        }
        res.status(200).send(user);
    } catch (error) {
        res.status(500).send(error);
    }
};