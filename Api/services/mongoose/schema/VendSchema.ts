import { Schema } from "mongoose";
import { IVend } from "../../../models";

export const vendreSchema = new Schema<IVend>({
    Restaurant: {
        type: Schema.Types.ObjectId,
        ref: 'Restaurant',
        required: true
    },
    Produit: {
        type: Schema.Types.ObjectId,
        ref: 'Produit',
        required: true
    }
}, {
    timestamps: true,
    collection: 'vends',
    versionKey: false
});