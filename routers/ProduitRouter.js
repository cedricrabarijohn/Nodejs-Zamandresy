const router = require('express').Router();
const ProduitController = require('../controllers/ProduitController');

router.get('/',ProduitController.getProduits);
router.get('/:id',ProduitController.getProduitById);
router.get('/commande/:idCommande',ProduitController.getProduitByIdCommande);
router.post('/',ProduitController.postProduit);

module.exports = router;