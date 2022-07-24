const express = require("express");
const app = express();
const cors = require("cors");
var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');

    // intercept OPTIONS method
    if ('OPTIONS' == req.method) {
      res.send(200);
    }
    else {
      next();
    }
};
app.use(allowCrossDomain);
//DB connection
const connectDB = require('./db/connection')
connectDB()

//App cors, express.json and error handler
app.use(cors());
app.use(express.json({extended: false}))
const ErrorHandler = require('./err/ErrorHandler');
app.options('*', cors())
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
app.listen(PORT,()=>{
    console.log(`Listening on port ${PORT}`);
});