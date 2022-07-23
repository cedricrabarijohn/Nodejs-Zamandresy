const ApiError = require('../err/ApiError');
const UtilisateurModel = require('../models/Utilisateur');
const mongoose = require('mongoose');

const w = async () => {
    try {
    } catch (err) {
        throw ApiError.serverError(err.message)
    }
}
const getUtilisateurs = async () => {
    try {
        const utilisateurs = await UtilisateurModel.find()
        return utilisateurs
    } catch (err) {
        throw ApiError.serverError(err.message)
    }
}
const getUtilisateursById = async (id) => {
    try {
        const utilisateur = await UtilisateurModel.findById(
            mongoose.Types.ObjectId(id)
        )
        if (!utilisateur) {
            throw ApiError.badRequest(`Invalid user id`)
        }
        return utilisateur
    } catch (err) {
        throw ApiError.serverError(err.message)
    }
}
const login = async (email, motDePasse) => {
    try {
        const user = await UtilisateurModel.findOne({
            email: email,
            motDePasse: motDePasse
        })
        if (!user) {
            throw ApiError.badRequest(`Invalid credentials`)
        }
        return user;
    } catch (err) {
        throw ApiError.serverError(err.message)
    }
}
const inscription = async (args) => {
    try {
        const { nom, prenom, email, motDePasse } = args
        const user = new UtilisateurModel(args)
        const newUser = await user.save()
        if (!newUser) {
            throw ApiError.badRequest(`Can't create a new user`)
        }
        return newUser
    } catch (err) {
        throw ApiError.serverError(err.message)
    }
}
const payerCommande = async (id, montant) => {
    try {
        
        return reste
    } catch (err) {
        throw ApiError.serverError(err.message)
    }
}
module.exports = {
    getUtilisateurs,
    getUtilisateursById,
    login,
    inscription,
    payerCommande
}