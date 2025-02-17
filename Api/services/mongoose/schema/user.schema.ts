import {IUser, IUserRole} from "../../../models";
import {Schema} from "mongoose";
import {Models} from '../mongoose.models';

export const userSchema = new Schema<IUser>({
    zoo: {
        type: Schema.Types.ObjectId,
        ref: Models.Zoo,
    },
    role: {
        type: String,
        enum: Object.values(IUserRole),
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    login: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    }
}, {
    timestamps: true,
    collection: 'user',
    versionKey: false
});