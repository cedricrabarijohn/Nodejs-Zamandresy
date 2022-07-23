const ApiError = require('../err/ApiError');
const AdminModel = require('../models/Admin');
const mongoose = require('mongoose');
const AdminService = require('../services/AdminService');
const CommandeService = require('../services/CommandeService')
const ProduitService = require('../services/ProduitService')

const getAdmins = async (req, res, next) => {
    try {
        const admins = await AdminService.getAdmins();
        res.json(admins);
    } catch (err) {
        next(err);
        return;
    }
}
const getAdminById = async (req, res, next) => {
    try {
        const id = req.params.id;
        const admin = await AdminService.getAdminById(id);
        res.json(admin);
    } catch (err) {
        next(err);
        return;
    }
}
const createAdmin = async (req, res, next) => {
    try {
        const { email, motDePasse } = req?.body;
        const newAdmin = await AdminService.createAdmin(req.body)
        res.json(newAdmin);
    } catch (err) {
        next(err);
        return;
    }
}
const loginAdmin = async (req, res, next) => {
    try {
        const { email, motDePasse } = req?.body;
        const admin = await AdminService.loginAdmin(email, motDePasse)
        res.json(admin);
    } catch (err) {
        next(err);
        return;
    }
}
const getCommandes = async (req, res, next) => {
    try {
        let { estPaye, estAnnule, estApprouve } = req.query
        const commandes = await CommandeService.getCommandesWithFiltre(estPaye,estAnnule,estApprouve);
        res.json(commandes);
    } catch (err) {
        next(err);
        return;
    }
}
const getCommandeById = async(req,res,next) => {
    try{
        const id = req.params.id
        const commande = await CommandeService.getCommandeById(id)
        res.json(commande)
    }catch(err){
        next(err)
        return
    }
}
const getCommandesByIdUtilisateur = async(req,res,next) => {
    try{
        const id = req.params.idUtilisateur
        const commande = await CommandeService.getCommandesByIdUtilisateur(id)
        res.json(commande)
    }catch(err){
        next(err)
        return
    }
}
const approuverCommande = async (req,res,next) => {
    try{
        const id = req.params.id
        const commande = await CommandeService.approuverCommande(id)
        res.json(commande);
    }catch(err){
        next(err)
        return
    }
}
const posterProduit = async (req,res,next) => {
    try{
        const produit = await ProduitService.postProduit(req.body)
        res.json(produit)
    }catch(err){
        next(err)
        return
    }
}
module.exports = {
    getAdmins,
    getAdminById,
    createAdmin,
    loginAdmin,
    getCommandes,
    getCommandeById,
    getCommandesByIdUtilisateur,
    approuverCommande,
    posterProduit
}