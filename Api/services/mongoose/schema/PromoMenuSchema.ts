import { Schema } from "mongoose";
import { IPromoMenu } from "../../../models";

export const promoMenuSchema = new Schema<IPromoMenu>({
    Menu: {
        type: Schema.Types.ObjectId,
        ref: 'Menu',
        required: true
    },
    Promotion: {
        type: Schema.Types.ObjectId,
        ref: 'Promotion',
        required: true
    }
}, {
    timestamps: true,
    collection: 'promoMenus',
    versionKey: false
});