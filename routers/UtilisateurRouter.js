const router = require('express').Router();
const UtilisateurController = require('../controllers/UtilisateurController');

router.get('/',UtilisateurController.getUtilisateurs);
router.get('/commande/:id',UtilisateurController.getCommandes);
router.get('/:id',UtilisateurController.getUtilisateursById);
router.post('/login',UtilisateurController.login);
router.post('/inscription',UtilisateurController.inscription);
router.post('/payerCommande/:id',UtilisateurController.payerCommande);
router.post('/commande',UtilisateurController.commander);

module.exports = router;