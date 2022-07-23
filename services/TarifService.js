const ApiError = require('../err/ApiError');
const TarifModel = require('../models/Tarif');
const mongoose = require('mongoose');
const w = async () => {
    try {
    } catch (err) {
        throw ApiError.serverError(err.message)
    }
}
const getTarifs = async () => {
    try {
        const tarifs = await TarifModel.find()
        return tarifs
    } catch (err) {
        throw ApiError.serverError(err.message)
    }
}
const getTarifById = async (id) => {
    try {
        const tarif = await TarifModel.findById(mongoose.Types.ObjectId(id))
        if(!tarif){
            throw ApiError.badRequest(`Invalid tarif id`)
        }
        return tarif
    } catch (err) {
        throw ApiError.serverError(err.message)
    }
}
const postTarif = async (args) => {
    try {
        const tarif = new TarifModel(args)
        const newTarif = await tarif.save()
        if(!newTarif){
            throw ApiError.badRequest(`Can't create tarif`)
        }
        return newTarif
    } catch (err) {
        throw ApiError.serverError(err.message)
    }
}
const deleteTarif = async (id) => {
    try {
        const tarifDeleted = await TarifModel.findByIdAndDelete(mongoose.Types.ObjectId(id))
        if(!tarifDeleted){
            throw ApiError.badRequest(`Can't delete this tarif`)
        }
        return tarifDeleted;
    } catch (err) {
        throw ApiError.serverError(err.message)
    }
}
module.exports = {
    getTarifs,
    getTarifById,
    postTarif,
    deleteTarif
}