const mongoose = require("mongoose");

const TypeDePaiementSchema = new mongoose.Schema({
    nom:{ //Exemple: Mvola , Paypal
        type: String,
        required: true
    }
},{collection: "typedepaiement"})

const TypeDePaiement = mongoose.model('typedepaiement',TypeDePaiementSchema);

module.exports = TypeDePaiement;