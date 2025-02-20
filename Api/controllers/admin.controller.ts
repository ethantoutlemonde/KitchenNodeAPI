import { Request, Response } from "express";
import {AdminService} from "../services";

export const createAdmin = async (req: Request, res: Response) => {
    try {
        const admin = await AdminService.createAdmin(req.body);
        res.status(201).send(admin);
    } catch (error) {
        res.status(400).send(error);
    }
};

export const getAdmins = async (req: Request, res: Response) => {
    try {
        const admins = await AdminService.getAdmins();
        res.status(200).send(admins);
    } catch (error) {
        res.status(500).send(error);
    }
};

export const getAdminById = async (req: Request, res: Response) => {
    try {
        const admin = await AdminService.getAdminById(req.params.id);
        if (!admin) {
            return res.status(404).send();
        }
        res.status(200).send(admin);
    } catch (error) {
        res.status(500).send(error);
    }
};

export const updateAdmin = async (req: Request, res: Response) => {
    try {
        const admin = await AdminService.updateAdmin(req.params.id, req.body);
        if (!admin) {
            return res.status(404).send();
        }
        res.status(200).send(admin);
    } catch (error) {
        res.status(400).send(error);
    }
};

export const deleteAdmin = async (req: Request, res: Response) => {
    try {
        const admin = await AdminService.deleteAdmin(req.params.id);
        if (!admin) {
            return res.status(404).send();
        }
        res.status(200).send(admin);
    } catch (error) {
        res.status(500).send(error);
    }
};