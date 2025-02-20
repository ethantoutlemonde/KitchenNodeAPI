import { Schema } from "mongoose";
import { IAdmin } from "../../../models";

export const adminSchema = new Schema<IAdmin>({
    User: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    Restaurant: {
        type: Schema.Types.ObjectId,
        ref: 'Restaurant',
        required: true
    }
}, {
    timestamps: true,
    collection: 'admins',
    versionKey: false
});