import { Schema } from "mongoose";
import { IPresent } from "../../../models";

export const presentSchema = new Schema<IPresent>({
    Restaurant: {
        type: Schema.Types.ObjectId,
        ref: 'Restaurant',
        required: true
    },
    Promotion: {
        type: Schema.Types.ObjectId,
        ref: 'Promotion',
        required: true
    }
}, {
    timestamps: true,
    collection: 'presents',
    versionKey: false
});