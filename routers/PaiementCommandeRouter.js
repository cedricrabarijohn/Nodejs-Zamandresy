const router = require('express').Router();
const PaiementCommandeController = require('../controllers/PaiementCommandeController');

router.get('/',PaiementCommandeController.getPaiementsCommande);
router.get('/:id',PaiementCommandeController.getPaiementsCommandeById);
router.get('/commande/:idCommande',PaiementCommandeController.getPaiementsCommandeByIdCommande);

module.exports = router;