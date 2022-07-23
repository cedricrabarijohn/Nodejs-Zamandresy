const mongoose = require("mongoose");
const UtilisateurSchema = new mongoose.Schema({
    nom:{
        type: String,
        required: true
    },
    prenom:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    motDePasse:{
        type: String,
        required: true
    }
},{collection: "utilisateur"})

const Utilisateur = mongoose.model('utilisateur',UtilisateurSchema);
module.exports = Utilisateur;