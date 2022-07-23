const mongoose = require("mongoose");

const PaiementCommandeSchema = new mongoose.Schema({
    idCommande:{
        type: String,
        required: true
    },
    montantPaye:{
        type: Number,
        required: true
    }
},{collection: "paiementcommande"})

const PaiementCommande = mongoose.model('paiementcommande',PaiementCommandeSchema);
module.exports = PaiementCommande;