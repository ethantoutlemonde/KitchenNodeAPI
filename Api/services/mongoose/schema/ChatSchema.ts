import { Schema } from "mongoose";
import { IChat } from "../../../models";

export const chatSchema = new Schema<IChat>({
    User1: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    User2: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    Message: {
        type: String
    },
    DateEnvoie: {
        type: Date,
        required: true
    }
}, {
    timestamps: true,
    collection: 'chats',
    versionKey: false
});