const ApiError = require('../err/ApiError');
const CommandeModel = require('../models/Commande');
const mongoose = require('mongoose');
const TarifService = require('./TarifService');
const PaiementService = require('./PaiementService')
const commander = async (params) => {
    try {
        const commande = new CommandeModel(params)
        const newCommande = await commande.save();
        if (!newCommande) {
            throw ApiError.badRequest("Error on command");
        }
        return newCommande;
    } catch (err) {
        throw ApiError.serverError(err.message);
    }
}
const getCommandesWithFiltre = async (estPaye, estAnnule, estApprouve) => {
    try {
        estAnnule = estAnnule || false
        let commandes = {}
        if (estPaye == null && estApprouve == null) {
            commandes = await getCommandes()
        }
        else {
            if (estAnnule == false || estAnnule == 'false') {
                if (estApprouve == 'true' && estPaye == 'true') {
                    commandes = await getCommandesApprouveesPayees()
                } else if (estApprouve == 'true' && estPaye == 'false') {
                    commandes = await getCommandesApprouveesNonPayees()
                }
                else if (estApprouve == 'false') {
                    commandes = await getCommandesNonApprouvees()
                }
                else if (estApprouve == 'true') {
                    commandes = await getCommandesApprouvees()
                }
            }
            else {
                commandes = await getCommandes()
            }
        }
        return commandes
    } catch (err) {
        throw ApiError.serverError(err.message)
    }
}
const getCommandes = async () => {
    try {
        const commandes = await CommandeModel.find();
        return commandes;
    } catch (err) {
        throw ApiError.serverError(err.message);
    }
}
const getCommandeById = async (idCommande) => {
    try {
        const commande = await CommandeModel.findById(mongoose.Types.ObjectId(idCommande))
        if (!commande) {
            throw ApiError.badRequest("Invalid command id");
        }
        return commande
    } catch (err) {
        throw ApiError.serverError(err.message);
    }
}
const getCommandesByIdUtilisateur = async (idUtilisateur) => {
    try {
        const commande = await CommandeModel.find({
            idUtilisateur: mongoose.Types.ObjectId(idUtilisateur)
        })
        if (!commande) {
            throw ApiError.badRequest("Invalid id User")
        }
        return commande
    } catch (err) {
        throw ApiError.serverError(err.message);
    }
}
const getCommandesApprouvees = async () => {
    try {
        const commandes = await CommandeModel.find({
            estAnnule: false,
            estApprouve: true
        })
        return commandes;
    } catch (err) {
        throw ApiError.serverError(err.message);
    }
}
const getCommandesNonApprouvees = async () => {
    try {
        const commandes = await CommandeModel.find({
            estAnnule: false,
            estApprouve: false
        })
        return commandes
    } catch (err) {
        throw ApiError.serverError(err.message);
    }
}

const getCommandesApprouveesPayees = async () => {
    try {
        const commandes = await CommandeModel.find({
            estAnnule: false,
            estApprouve: true,
            estPaye: true
        })
        return commandes
    } catch (err) {
        throw ApiError.serverError(err.message);
    }
}

const getCommandesApprouveesNonPayees = async () => {
    try {
        const commandes = await CommandeModel.find({
            estAnnule: false,
            estApprouve: true,
            estPaye: false
        })
        return commandes
    } catch (err) {
        throw ApiError.serverError(err.message);
    }
}
const approuverCommande = async (idCommande) => {
    try {
        const commande = await CommandeModel.findByIdAndUpdate(idCommande, {
            $set: {
                estApprouve: true
            }
        })
        if (!commande) {
            throw ApiError.badRequest(`Invalid command id`)
        }
        return commande
    } catch (err) {
        throw ApiError.serverError(err.message);
    }
}
const payerCommande = async (id, montant) => {
    try {
        const commandeAPayer = await getCommandeById(id)
        const tarifDeLaCommande = await TarifService.getTarifById(commandeAPayer.informationPaiement.idTarif)
        const reste = tarifDeLaCommande.prix.montant - montant
        if (reste != 0) {
            throw ApiError.serverError(
                `Invalid montant, you should pay ${tarifDeLaCommande.prix.montant} ${tarifDeLaCommande.prix.unite} instead of ${montant}`
            )
        }
        //Create paiement + change commande estPaye to true
        const paiement = await PaiementService.createPaiement(id, montant)
        const changedCommande = await CommandeModel.findByIdAndUpdate(id, {
            $set: {
                estPaye: true
            }
        })
        if (!changedCommande) {
            throw ApiError.badRequest(`Can't change estPaye to true`)
        }
        return paiement;
    } catch (err) {
        throw ApiError.serverError(err.message);
    }
}
const annulerCommande = async (id) => {
    try {
        const commande = await CommandeModel.findByIdAndUpdate(id, {
            $set: {
                estAnnule: true
            }
        })
        if (!commande) {
            throw ApiError.badRequest(`Can't cancel this command`)
        }
        return commande
    } catch (err) {
        throw ApiError.serverError(err.message);
    }
}

module.exports = {
    getCommandesWithFiltre,
    commander,
    getCommandes,
    getCommandeById,
    getCommandesByIdUtilisateur,
    getCommandesApprouvees,
    getCommandesNonApprouvees,
    getCommandesApprouveesPayees,
    getCommandesApprouveesNonPayees,
    approuverCommande,
    payerCommande,
    annulerCommande
}