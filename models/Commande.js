const mongoose = require("mongoose");

const CommandeSchema = new mongoose.Schema({
    idUtilisateur: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    date: {
        type: Date,
        required: true,
        default: Date.now
    },
    informationCommande: {
        type: {
            titreCommande: {
                type: String,
                required: true
            },
            description: {
                type: String,
                required: true
            },
            nomEntreprise: {
                type: String,
                required: true
            }
        },
        required: true
    },
    informationPaiement:{
        type:{
            idTypeDePaiement:{
                type: String,
                required: true
            },
            nomTypeDePaiement:{
                type: String,
                required: true
            },
            idTarif:{
                type: String,
                required: true
            },
            nomTarif:{
                type: String,
                required: true
            }
        },
        required: true
    },
    estPaye:{
        type: Boolean,
        required: true,
        default: false
    },
    estAnnule:{
        type: Boolean,
        required: true,
        default: false
    },
    estApprouve:{
        type: Boolean,
        required: true,
        default: false
    }
}, { collection: "commande" })

const Commande = mongoose.model('commande', CommandeSchema);


module.exports = Commande;