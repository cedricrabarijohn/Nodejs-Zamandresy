const mongoose = require("mongoose");

const TarifSchema = new mongoose.Schema({
    nom:{
        type: String,
        required: true
    },
    prix:{
        type: {
            montant:{
                type: Number,
                required: true
            },
            unite:{
                type: String,
                required: true
            }
        },
        required: true
    },
    conditions:{
        type:{
            nombrePublication:{
                type: Number,
                required: true
            },
            nombrePhotos:{
                type: Number,
                required: true
            },
            delaisSemaine:{
                type: Number,
                required: true
            }
        },
        required: true
    }
},{collection: "tarif"})

const Tarif = mongoose.model('tarif',TarifSchema);
module.exports = Tarif;