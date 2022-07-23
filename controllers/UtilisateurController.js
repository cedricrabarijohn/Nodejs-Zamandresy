const ApiError = require('../err/ApiError');
const UtilisateurModel = require('../models/Utilisateur');
const mongoose = require('mongoose');
const UtilisateurService = require('../services/UtilisateurService')
const CommandeService = require('../services/CommandeService')
const getUtilisateurs = async (req, res, next) => {
    try {
        const utilisateurs = await UtilisateurService.getUtilisateurs()
        res.json(utilisateurs);
    } catch (err) {
        next(err);
        return;
    }
}
const getUtilisateursById = async (req, res, next) => {
    try {
        const id = req.params.id;
        const utilisateur = await UtilisateurService.getUtilisateursById(id)
        res.json(utilisateur);
    } catch (err) {
        next(err);
        return;
    }
}
const login = async (req, res, next) => {
    try {
        const { email, motDePasse } = req?.body;
        const utilisateur = await UtilisateurService.login(email, motDePasse)
        res.json(utilisateur);
    } catch (err) {
        next(err);
        return;
    }
}
const inscription = async (req, res, next) => {
    try {
        const { nom, prenom, email, motDePasse } = req?.body;
        const newUtilisateur = await UtilisateurService.inscription(req.body)
        res.json(newUtilisateur);
    } catch (err) {
        next(err);
        return;
    }
}
const getCommandes = async(req,res,next) => {
    try{
        const id = req.params.id;
        const commandes = await CommandeService.getCommandesByIdUtilisateur(id)
        res.json(commandes)
    }catch(err){
        next(err)
        return;
    }
}
const commander = async(req,res,next) => {
    try{
        const commande = await CommandeService.commander(req.body)
        res.json(commande)
    }catch(err){
        next(err)
        return
    }
}
const payerCommande = async (req, res, next) => {
    try {
        const id = req.params.id
        const {montant} = req.body
        const paiement = await CommandeService.payerCommande(id,montant)
        res.json(paiement)
    } catch (err) {
        next(err);
        return;
    }
}
module.exports = {
    getUtilisateurs,
    getUtilisateursById,
    login,
    inscription,
    payerCommande,
    getCommandes,
    commander
}