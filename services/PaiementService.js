const ApiError = require('../err/ApiError');
const PaiementCommandeModel = require('../models/PaiementCommande');
const mongoose = require('mongoose');

const createPaiement = async(idCommande, montantPaye) => {
    try {
        const paiement = new PaiementCommandeModel({
            idCommande: idCommande,
            montantPaye: montantPaye
        })
        const newPaiement = await paiement.save()
        if(!newPaiement){
            throw ApiError.badRequest(`Can't create paiement`)
        }
        return newPaiement
    } catch (err) {
        throw ApiError.serverError(err.message)
    }
}
const getPaiements = async () => {
    try {
        const paiements = await PaiementCommandeModel.find()
        return paiements
    } catch (err) {
        throw ApiError.serverError(err.message)
    }
}
const getPaiementById = async (id) => {
    try {
        const paiement = await PaiementCommandeModel.findById(mongoose.Types.ObjectId(id))
        if(!paiement){
            throw ApiError.badRequest(`Invalid paiement id`)
        }
        return paiement;
    } catch (err) {
        throw ApiError.serverError(err.message)
    }
}
const getPaiementByIdCommande = async (idCommande) => {
    try {
        const paiement = await PaiementCommandeModel.findOne({
            idCommande: idCommande
        }) 
        if(!paiement){
            throw ApiError.badRequest(`Invalid command id`)
        }
        return paiement
    } catch (err) {
        throw ApiError.serverError(err.message)
    }
}
const w = async () => {
    try {
    } catch (err) {
        throw ApiError.serverError(err.message)
    }
}
module.exports = {
    createPaiement,
    getPaiements,
    getPaiementById,
    getPaiementByIdCommande
}