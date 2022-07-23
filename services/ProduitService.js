const ApiError = require('../err/ApiError');
const Produit = require('../models/Produit');
const mongoose = require('mongoose');

const getProduits = async() => {
    try{
        const produits = await Produit.find();
        return produits
    }catch(err){
        throw ApiError.serverError(err.message)
    }
}
const getProduitById = async(id) => {
    try{
        const produit = await Produit.findById(mongoose.Types.ObjectId(id))
        if(!produit){
            throw ApiError.badRequest(`Invalid product id`)
        }
        return produit
    }catch(err){
        throw ApiError.serverError(err.message)
    }
}
const getProduitsByIdCommande = async(idCommande) => {
    try{
        const produit = await Produit.find({
            idCommande: idCommande
        })
        return produit
    }catch(err){
        throw ApiError.serverError(err.message)
    }
}
const postProduit = async(params) => {
    try{
        const newProduit = new Produit(params)
        const produit = await newProduit.save()
        if(!produit){
            throw ApiError.badRequest(`Can't create produit`)
        }
        return produit
    }catch(err){
        throw ApiError.serverError(err.message)
    }
}

module.exports = {
    getProduits,
    getProduitById,
    getProduitsByIdCommande,
    postProduit
}