import {stat} from "fs/promises";
import path from "path";

export class AssetUtils {

    public static async assetExists(assetId: string): Promise<boolean> {
        try {
            const stats = await stat(path.join(process.env.UPLOAD_DIR as string, assetId));
            return stats.isFile();
        } catch(err) {
            return false;
        }
    }

    public static async assetsExists(assetIds: string[]): Promise<boolean> {
        const filesExists = await Promise.all(assetIds.map(AssetUtils.assetExists));
        for(const fileExists of filesExists) {
            if(fileExists === false) {
                return false;
            }
        }
        return true;
    }
}