const ApiError = require('../err/ApiError');
const TarifModel = require('../models/Tarif');
const mongoose = require('mongoose');
const TarifService = require('../services/TarifService')

const getTarifs = async (req, res, next) => {
    try {
        const tarifs = await TarifService.getTarifs()
        res.json(tarifs);
    }
    catch (err) {
        next(err);
        return;
    }
}

const getTarifById = async (req, res, next) => {
    try {
        const id = req.params?.id;
        const tarif = await TarifService.getTarifById(id)
        res.json(tarif);
    }
    catch (err) {
        next(err);
        return;
    }
}

const postTarif = async (req, res, next) => {
    try {
        const { nom, prix, conditions } = req?.body;
        const newTarif = await TarifService.postTarif(req.body)
        res.json(newTarif);
    } catch (err) {
        next(err);
        return;
    }
}

const deleteTarif = async (req, res, next) => {
    try {
        const id = req.params?.id;
        const deleted = await TarifService.deleteTarif(id);
        res.json(`Deleted ${id} successfully`);
    }
    catch (err) {
        next(err);
        return;
    }
}

module.exports = {
    getTarifs,
    getTarifById,
    postTarif,
    deleteTarif
}