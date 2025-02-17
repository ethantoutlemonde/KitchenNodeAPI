import {ITimestamp} from "./timestamp.interface";
import {IZoo} from "./zoo.interface";

export enum IUserRole {
    SuperAdmin = "super_admin",
    Admin = "admin",
    Employee = "employee",
    Customer = "customer",
}

export function userRoleLevel(role: IUserRole): number {
    switch (role) {
        case IUserRole.SuperAdmin:
            return 4;
        case IUserRole.Admin:
            return 3;
        case IUserRole.Employee:
            return 2;
        case IUserRole.Customer:
            return 1;
        default:
            return 0
    }
}

export interface IUser extends ITimestamp {
    _id: string;
    zoo?: string | IZoo;
    role: IUserRole;
    lastName: string;
    firstName: string;
    login: string;
    password: string;
    email: string;
}