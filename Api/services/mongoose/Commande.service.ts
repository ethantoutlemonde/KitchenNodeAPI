import { Commande } from "mangoose";
import {commandeSchema} from "./schema";
import { ICommande } from "../../models";

export const createCommande = async (commandeData: ICommande) => {
    const commande = new Commande(commandeData);
    return await commande.save();
};

export const getCommandes = async () => {
    return await Commande.find()
        .populate('Adresse')
        .populate('User')
        .populate('Panier');
};

export const getCommandeById = async (id: string) => {
    return await Commande.findById(id)
        .populate('Adresse')
        .populate('User')
        .populate('Panier');
};

export const updateCommande = async (id: string, commandeData: Partial<ICommande>) => {
    return await Commande.findByIdAndUpdate(id, commandeData, { new: true });
};

export const deleteCommande = async (id: string) => {
    return await Commande.findByIdAndDelete(id);
};