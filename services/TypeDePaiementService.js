const ApiError = require('../err/ApiError');
const TypeDePaiementModel = require('../models/TypeDePaiement');
const mongoose = require('mongoose');

const w = async () => {
    try {
    } catch (err) {
        throw ApiError.serverError(err.message)
    }
}
const getTypeDePaiements = async () => {
    try {
        const paiements = await TypeDePaiementModel.find()
        return paiements
    } catch (err) {
        throw ApiError.serverError(err.message)
    }
}
const getTypeDePaiementById = async (id) => {
    try {
        const paiement = await TypeDePaiementModel.findById(mongoose.Types.ObjectId(id))
        return paiement
    } catch (err) {
        throw ApiError.serverError(err.message)
    }
}
const createTypeDePaiement = async (args) => {
    try {
        const paiement = new TypeDePaiementModel(args)
        const newPaiement = await paiement.save()
        if(!newPaiement){
            throw ApiError.badRequest(
                `An error occured while creating the type of paiement`
            )
        }
        return newPaiement
    } catch (err) {
        throw ApiError.serverError(err.message)
    }
}
const deleteTypeDePaiement = async (id) => {
    try {
        const deletedPaiement = await TypeDePaiementModel.findByIdAndDelete(mongoose.Types.ObjectId(id))
        if(!deletedPaiement){
            throw ApiError.badRequest(`Can't delete this type of paiement`)
        }
        return deletedPaiement
    } catch (err) {
        throw ApiError.serverError(err.message)
    }
}


module.exports ={
    getTypeDePaiements,
    getTypeDePaiementById,
    createTypeDePaiement,
    deleteTypeDePaiement
}