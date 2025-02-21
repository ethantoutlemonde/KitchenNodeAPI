import mongoose, { Schema } from "mongoose";

const SessionSchema = new Schema(
    {
        Token: { type: String, required: true }, // 🔥 Ajout du Token
        user: { type: Schema.Types.ObjectId, ref: "User", required: true } // Référence à l'utilisateur
    },
    { timestamps: true } // Ajoute `createdAt` et `updatedAt`
);

export default SessionSchema; // 🔥 Vérifie bien cet export
