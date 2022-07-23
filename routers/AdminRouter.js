const router = require('express').Router();
const AdminController = require('../controllers/AdminController');

router.get('/commande',AdminController.getCommandes);
router.get('/commande/utilisateur/:idUtilisateur',AdminController.getCommandesByIdUtilisateur);
router.get('/commande/:id',AdminController.getCommandeById);
router.get('/',AdminController.getAdmins);
router.get('/:id',AdminController.getAdminById);

router.post('/',AdminController.createAdmin);
router.post('/login',AdminController.loginAdmin);
router.post('/commande/approuver/:id',AdminController.approuverCommande);
router.post('/produit',AdminController.posterProduit);

module.exports = router;