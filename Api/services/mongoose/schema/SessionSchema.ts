import { Schema } from "mongoose";
import { ISession } from "../../../models";

export const sessionSchema = new Schema<ISession>({
    Token: {
        type: String,
        required: true,
        unique: true
    },
    DATEHEURE: {
        type: Date,
        required: true
    },
    User: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, {
    timestamps: true,
    collection: 'sessions',
    versionKey: false
});