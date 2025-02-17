import {IZoo} from "../../../models";
import {Schema} from "mongoose";

export const zooSchema = new Schema<IZoo>({
    name: {
        type: String,
        required: true
    }
}, {
    timestamps: true,
    collection: 'zoo',
    versionKey: false,
});