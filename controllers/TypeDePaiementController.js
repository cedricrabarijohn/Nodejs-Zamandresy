const ApiError = require('../err/ApiError');
const TypeDePaiementModel = require('../models/TypeDePaiement');
const mongoose = require('mongoose');
const TypeDePaiementService = require('../services/TypeDePaiementService')
const getTypeDePaiements = async (req, res, next) => {
    try {
        const paiements = await TypeDePaiementService.getTypeDePaiements()
        res.json(paiements);
    } catch (err) {
        next(err);
        return;
    }
}
const getTypeDePaiementById = async (req, res, next) => {
    try {
        const id = req.params?.id;
        const paiement = await TypeDePaiementService.getTypeDePaiementById(id)
        res.json(paiement);
    } catch (err) {
        next(err);
        return;
    }
}
const createTypeDePaiement = async (req, res, next) => {
    try {
        const {nom} = req.body;
        const savedType = await TypeDePaiementService.createTypeDePaiement(req.body)
        res.json(savedType);
    } catch (err) {
        next(err);
        return;
    }
}
const deleteTypeDePaiement = async (req, res, next) => {
    try {
        const id = req.params.id;
        const deletedType = await TypeDePaiementService.deleteTypeDePaiement(id)
        res.json(`Deleted successfully ${deletedType}`);
    } catch (err) {
        next(err);
        return;
    }
}

module.exports = {
    getTypeDePaiements,
    getTypeDePaiementById,
    createTypeDePaiement,
    deleteTypeDePaiement
}