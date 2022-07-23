const router = require('express').Router();
const CommandeController = require('../controllers/CommandeController');

router.post('/',CommandeController.commander);
router.get('/utilisateur/:idUtilisateur',CommandeController.getCommandesByIdUtilisateur);
router.get('/approuvees',CommandeController.getCommandesApprouvees);
router.get('/nonapprouvees',CommandeController.getCommandesNonApprouvees);
router.get('/approuveespayees',CommandeController.getCommandesApprouveesPayees);
router.get('/approuveesnonpayees',CommandeController.getCommandesApprouveesNonPayees);
router.post('/approbation/:id',CommandeController.approuverCommande);
router.post('/paiement/:id',CommandeController.payerCommande);
router.post('/annulation/:id',CommandeController.annulerCommande);
router.get('/',CommandeController.getCommandes);
router.get('/:id',CommandeController.getCommandeById);
module.exports = router;