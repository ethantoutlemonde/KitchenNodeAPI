import {createHash, randomBytes} from "crypto";

export class SecurityUtils {

    static sha256(str: string): string {
        return createHash("sha256").update(`${str}${process.env.SHA256_SALT}`).digest("hex");
    }

    static randomString(length: number): string {
        return randomBytes(length / 2).toString('hex');
    }

    static base64Encode(str: string): string {
        return btoa(str);
    }

    static base64Decode(str: string): string {
        return atob(str);
    }
}