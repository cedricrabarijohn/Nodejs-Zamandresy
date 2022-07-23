const router = require('express').Router();
const TypeDePaiementController = require('../controllers/TypeDePaiementController');

router.get('/',TypeDePaiementController.getTypeDePaiements);
router.get('/:id',TypeDePaiementController.getTypeDePaiementById);
router.post('/',TypeDePaiementController.createTypeDePaiement);
router.delete('/:id',TypeDePaiementController.deleteTypeDePaiement);

module.exports = router;