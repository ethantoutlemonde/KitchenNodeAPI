import { Schema } from "mongoose";
import { IConfectionne } from "../../../models";

export const confectionneSchema = new Schema<IConfectionne>({
    User: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    Commande: {
        type: Schema.Types.ObjectId,
        ref: 'Commande',
        required: true
    }
}, {
    timestamps: true,
    collection: 'confectionnes',
    versionKey: false
});