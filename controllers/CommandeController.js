const ApiError = require('../err/ApiError');
const CommandeModel = require('../models/Commande');
const PaiementModel = require('../models/PaiementCommande')
const TarifModel = require('../models/Tarif')
const mongoose = require('mongoose');

const CommandeService = require('../services/CommandeService');
const TarifService =  require('../services/TarifService');

const commander = async (req, res, next) => {
    try {
        const { idUtilisateur, date, informationCommande, informationPaiement,
            estPaye, estAnnule, estApprouve } = req.body;
        const newCommande = await CommandeService.commander(req.body);
        res.json(newCommande);
    } catch (err) {
        next(err);
        return;
    }
}
const getCommandes = async (req, res, next) => {
    try {
        const commandes = await CommandeService.getCommandes()
        res.json(commandes);
    } catch (err) {
        next(err)
        return
    }
}
const getCommandeById = async (req, res, next) => {
    try {
        const commande = await CommandeService.getCommandeById(req.params.id)
        res.json(commande)
    } catch (err) {
        next(err)
        return
    }
}
const getCommandesByIdUtilisateur = async (req, res, next) => {
    try {
        const idUtilisateur = req.params.idUtilisateur;
        const commande = await CommandeService.getCommandesByIdUtilisateur(idUtilisateur);
        res.json(commande);
    } catch (err) {
        next(err);
        return;
    }
}
const getCommandesApprouvees = async (req, res, next) => {
    try {
        const commandes = await CommandeService.getCommandesApprouvees();
        res.json(commandes);
    } catch (err) {
        next(err);
        return;
    }
}
const getCommandesNonApprouvees = async (req, res, next) => {
    try {
        const commandes = await CommandeService.getCommandesNonApprouvees()
        res.json(commandes);
    } catch (err) {
        next(err);
        return;
    }
}
const getCommandesApprouveesPayees = async (req, res, next) => {
    try {
        const commandes = await CommandeService.getCommandesApprouveesPayees()
        res.json(commandes);
    } catch (err) {
        next(ApiError.serverError(err.message));
        return;
    }
}
const getCommandesApprouveesNonPayees = async (req, res, next) => {
    try {
        const commandes = await CommandeService.getCommandesApprouveesNonPayees();
        res.json(commandes);
    } catch (err) {
        next(ApiError.serverError(err.message));
        return;
    }
}
const approuverCommande = async (req, res, next) => {
    try {
        const id = req.params.id;
        const commande = await CommandeService.approuverCommande(id)
        res.json(commande)
    } catch (err) {
        next(ApiError.serverError(err.message));
        return;
    }
}

//Mila asiana transaction
const payerCommande = async (req, res, next) => {
    const id = req.params.id;
    const montantPaye = req.body.montant;
    //Get the commande tarif
    res.json('this is not the right api for payment')
    // const commandeAPayer = await CommandeModel.findById(id)
    // if (!commandeAPayer) {
    //     next(ApiError.badRequest('Invalid command id'));
    //     return
    // }
    // const tarifDeLaCommande = await TarifModel.findById(
    //     mongoose.Types.ObjectId(commandeAPayer.informationPaiement.idTarif)
    // );
    // if (!tarifDeLaCommande) {
    //     next(ApiError.badRequest('invalid tarif id'))
    //     return
    // }
    // const montantTarif = tarifDeLaCommande.prix.montant;
    // if (montantPaye < montantTarif) {
    //     next(ApiError.badRequest(`Montant manquant : ${montantTarif - montantPaye} ${tarifDeLaCommande.prix.unite}`));
    //     return
    // }
    /* MBOLA MISY LOGIC DE PAIEMENT ETO */
}
const annulerCommande = async (req, res, next) => {
    try {
        const id = req.params.id;
        const commande = await CommandeService.annulerCommande(id);
        res.json(commande)
    } catch (err) {
        next(ApiError.serverError(err.message));
        return;
    }
}

module.exports = {
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
};