const express = require("express");
const app = express();
const cors = require("cors");

//DB connection
const connectDB = require('./db/connection')
connectDB()

//App cors, express.json and error handler
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*")
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested, Content-Type, Accept Authorization"
    )
    if (req.method === "OPTIONS") {
        res.header(
            "Access-Control-Allow-Methods",
            "POST, PUT, PATCH, GET, DELETE"
        )
        return res.status(200).json({})
    }
    next()
})
app.use(express.json({ extended: false }))
const ErrorHandler = require('./err/ErrorHandler');
//routers
const UtilisateurRouter = require('./routers/UtilisateurRouter');
const AdminRouter = require('./routers/AdminRouter');
const CommandeRouter = require('./routers/CommandeRouter');
const PaiementCommandeRouter = require('./routers/PaiementCommandeRouter');
const ProduitRouter = require('./routers/ProduitRouter');
const TarifRouter = require('./routers/TarifRouter');
const TypeDePaiementRouter = require('./routers/TypeDePaiementRouter');
const MvolaRouter = require('./routers/MvolaRouter')

const version = process.env.API_VERSION || "api/v1"
//using routers
app.use(`/${version}/utilisateur`, UtilisateurRouter);
app.use(`/${version}/admin`, AdminRouter);
app.use(`/${version}/tarif`, TarifRouter);
app.use(`/${version}/typeDePaiement`, TypeDePaiementRouter);
app.use(`/${version}/commande`, CommandeRouter);
app.use(`/${version}/paiementCommande`, PaiementCommandeRouter);
app.use(`/${version}/produit`, ProduitRouter);
app.use(`/${version}/mvola`, MvolaRouter);
//Using error handler
app.use(ErrorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});