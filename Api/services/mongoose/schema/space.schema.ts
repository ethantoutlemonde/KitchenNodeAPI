import {ISpaceAccessibility, ISpaceType, ISpace} from "../../../models";
import {Schema} from "mongoose";
import {Models} from '../mongoose.models';

export const spaceSchema = new Schema<ISpace>({
    zoo: {
        type: Schema.Types.ObjectId,
        ref: Models.Zoo,
    },
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    images: {
        type: [{
            type: String,
            required: true
        }],
        required: true,
        default: []
    },
    types: {
        type: [{
            type: String,
            enum: Object.values(ISpaceType),
            required: true
        }],
        required: true
    },
    capacity: {
        type: Number,
        required: true
    },
    visitorDuration: {
        type: Number,
        required: true
    },
    openingHours: {
        type: Number,
        required: true
    },
    closingHours: {
        type: Number,
        required: true
    },
    accessibility: {
        type: [{
            type: String,
            enum: Object.values(ISpaceAccessibility),
            required: true
        }],
        required: true,
        default: []
    },
    disabled: {
        type: Boolean,
        required: true,
        default: false
    },
}, {
    timestamps: true,
    collection: 'spaces',
    versionKey: false
});