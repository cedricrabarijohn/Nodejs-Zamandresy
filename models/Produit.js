const mongoose = require("mongoose");

const ProduitSchema = new mongoose.Schema({
    idCommande:{
        type: String,
        required: true
    },
    liens:{
        type: [],
        required: true,
        default: []
    }
},{collection: "produit"})

const Produit = mongoose.model('produit',ProduitSchema);
const getAll = Produit.find();

module.exports = Produit;