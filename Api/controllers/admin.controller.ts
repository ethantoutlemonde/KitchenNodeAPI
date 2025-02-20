import express from "express";
import { MongooseService } from "../services";
// import { sessionMiddleware, roleMiddleware } from "../middleware";

export class AdminController {
    private static instance?: AdminController;

    static getInstance(): AdminController {
        if (!AdminController.instance) {
            AdminController.instance = new AdminController();
        }
        return AdminController.instance;
    }

    async createAdmin(req: express.Request, res: express.Response): Promise<void> {
        if (!req.body || !req.body.user || !req.body.restaurant) {
            res.status(400).end();
            return;
        }
        
        const mongooseService = await MongooseService.getInstance();
        const adminService = mongooseService.adminService;
        const admin = await adminService.createAdmin(req.body.user, req.body.restaurant);
        res.status(201).json(admin);
    }

    async getAdmins(req: express.Request, res: express.Response): Promise<void> {
        const mongooseService = await MongooseService.getInstance();
        const adminService = mongooseService.adminService;
        const admins = await adminService.getAdmins();
        res.json(admins);
    }

    async getAdminById(req: express.Request, res: express.Response): Promise<void> {
        if (!req.params.id) {
            res.status(400).end();
            return;
        }
        
        const mongooseService = await MongooseService.getInstance();
        const adminService = mongooseService.adminService;
        const admin = await adminService.getAdminById(req.params.id);
        if (!admin) {
            res.status(404).end();
            return;
        }
        res.json(admin);
    }

    async updateAdmin(req: express.Request, res: express.Response): Promise<void> {
        if (!req.params.id || !req.body) {
            res.status(400).end();
            return;
        }
        
        const mongooseService = await MongooseService.getInstance();
        const adminService = mongooseService.adminService;
        const updatedAdmin = await adminService.updateAdmin(req.params.id, req.body);
        if (!updatedAdmin) {
            res.status(404).end();
            return;
        }
        res.json(updatedAdmin);
    }

    async deleteAdmin(req: express.Request, res: express.Response): Promise<void> {
        if (!req.params.id) {
            res.status(400).end();
            return;
        }
        
        const mongooseService = await MongooseService.getInstance();
        const adminService = mongooseService.adminService;
        const deletedAdmin = await adminService.deleteAdmin(req.params.id);
        if (!deletedAdmin) {
            res.status(404).end();
            return;
        }
        res.status(204).end();
    }

    buildRouter(): express.Router {
        const router = express.Router();
        router.get("/admins", express.json(), this.getAdmins.bind(this));
        router.get("/admins/:id", express.json(), this.getAdminById.bind(this));
        router.post(
            "/admins",
            // sessionMiddleware(),
            express.json(),
            // roleMiddleware(IEmployeeRole.ADMIN),
            this.createAdmin.bind(this)
        );
        router.put(
            "/admins/:id",
            // sessionMiddleware(),
            express.json(),
            // roleMiddleware(IEmployeeRole.ADMIN),
            this.updateAdmin.bind(this)
        );
        router.delete(
            "/admins/:id",
            // sessionMiddleware(),
            // roleMiddleware(IEmployeeRole.ADMIN),
            this.deleteAdmin.bind(this)
        );
        return router;
    }
}
