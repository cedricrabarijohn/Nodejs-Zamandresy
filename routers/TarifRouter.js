const router = require('express').Router();
const TarifController = require('../controllers/TarifController');

router.get('/',TarifController.getTarifs);
router.get('/:id',TarifController.getTarifById);
router.post('/',TarifController.postTarif);
router.delete('/:id',TarifController.deleteTarif);

module.exports = router;