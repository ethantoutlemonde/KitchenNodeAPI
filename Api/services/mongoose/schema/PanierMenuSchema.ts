import { Schema } from "mongoose";
import { IPanierMenu } from "../../../models";

export const panierMenuSchema = new Schema<IPanierMenu>({
    Menu: {
        type: Schema.Types.ObjectId,
        ref: 'Menu',
        required: true
    },
    Panier: {
        type: Schema.Types.ObjectId,
        ref: 'Panier',
        required: true
    }
}, {
    timestamps: true,
    collection: 'panierMenus',
    versionKey: false
});