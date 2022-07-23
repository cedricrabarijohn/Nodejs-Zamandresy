const ApiError = require('../err/ApiError');
const AdminModel = require('../models/Admin');
const mongoose = require('mongoose');

const getAdmins = async () => {
    try {
        const admins = await AdminModel.find();
        return admins;
    } catch (err) {
        throw ApiError.serverError(err.message);
    }
}
const getAdminById = async (id) => {
    try {
        const admin = await AdminModel.findById(mongoose.Types.ObjectId(id));
        if(!admin){
            throw ApiError.badRequest(`Invalid admin id`);
        }
        return admin
    } catch (err) {
        throw ApiError.serverError(err.message);
    }
}
const createAdmin = async (params) => {
    try {
        const newAdmin = new AdminModel(params);
        if(!newAdmin){
            throw ApiError.badRequest(`An error occured white creating an instance of admin`)
        }
        const admin = await newAdmin.save();
        if(!admin){
            throw ApiError.serverError(`Can't create admin`)
        }
        return admin
    } catch (err) {
        throw ApiError.serverError(err.message);
    }
}
const loginAdmin = async (email, motDePasse) => {
    try {
        const admin = await AdminModel.findOne({
            email: email,
            motDePasse: motDePasse
        })
        if(!admin){
            throw ApiError.badRequest(`Invalid credentials`)
        }
        return admin
    } catch (err) {
        throw ApiError.serverError(err.message);
    }
}

module.exports = {
    getAdmins,
    getAdminById,
    createAdmin,
    loginAdmin
}