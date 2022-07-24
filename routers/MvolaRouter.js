const router = require('express').Router();
const MvolaController = require('../controllers/MvolaController');

router.post('/authenticate',MvolaController.Authenticate)
router.post('/initiateRequest',MvolaController.InitiateRequest)
router.get('/transactionStatus/:transactionId',MvolaController.GetTransactionStatus)
router.get('/transactionDetails/:objectReference',MvolaController.GetTransactionDetails)

module.exports = router;