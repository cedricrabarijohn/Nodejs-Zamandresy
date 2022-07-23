const ApiError = require('../err/ApiError');
const Produit = require('../models/Produit');
const mongoose = require('mongoose');
const ProduitService = require('../services/ProduitService')

const getProduits = async (req, res, next) => {
    try {
        const produits = await ProduitService.getProduits();
        res.json(produits)
    } catch (err) {
        next(err);
        return;
    }
}
const getProduitById= async (req, res, next) => {
    try {
        const id = req.params.id
        const produit = await ProduitService.getProduitById(id)
        res.json(produit)
    } catch (err) {
        next(err);
        return;
    }
}
const getProduitByIdCommande = async (req, res, next) => {
    try {
        const idCommande = req.params.idCommande
        const produits = await ProduitService.getProduitsByIdCommande(idCommande)
        res.json(produits)
    } catch (err) {
        next(err);
        return;
    }
}
const postProduit = async (req, res, next) => {
    try {
        const {idCommande, liens} = req.body
        const produit = await ProduitService.postProduit(req.body)
        res.json(produit)
    } catch (err) {
        next(err);
        return;
    }
}
module.exports = {
    getProduits,
    getProduitById,
    getProduitByIdCommande,
    postProduit
}