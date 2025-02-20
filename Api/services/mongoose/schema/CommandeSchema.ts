import {ICommandeSchema} from "../../../models";
import {Schema} from "mongoose";

export const CommandeSchema = new Schema({
    numero: { type: Number, required: true },
    status: { type: String, enum: ['Paye', 'en cours de preparation', 'en cours de livraison', 'livre'], required: true },
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true },
    adresse: { type: Schema.Types.ObjectId, ref: 'Adresse', required: true },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    preparateur: { type: Schema.Types.ObjectId, ref: 'User' },
    panier: { type: Schema.Types.ObjectId, ref: 'Panier', required: true }
  }, {
    timestamps: true,
    collection: 'commandes',
    versionKey: false,
  });