const ApiError = require('../err/ApiError');
const PaiementCommandeModel = require('../models/PaiementCommande');
const mongoose = require('mongoose');
const PaiementService = require('../services/PaiementService')
const getPaiementsCommande = async (req, res, next) => {
    try {
        const paiements = await PaiementService.getPaiements()
        res.json(paiements)
    } catch (err) {
        next(ApiError.serverError(err))
        return
    }
}
const getPaiementsCommandeById = async (req, res, next) => {
    try {
        const id = req.params.id
        const paiements = await PaiementService.getPaiementById(id);
        res.json(paiements)
    } catch (err) {
        next(ApiError.serverError(err))
        return
    }
}
const getPaiementsCommandeByIdCommande = async (req, res, next) => {
    try {
        const idCommande = req.params.idCommande
        const paiements = await PaiementService.getPaiementByIdCommande(idCommande)
        res.json(paiements)
    } catch (err) {
        next(ApiError.serverError(err))
        return
    }
}
module.exports = {
    getPaiementsCommande,
    getPaiementsCommandeById,
    getPaiementsCommandeByIdCommande
}