const express = require('express');
const router = express.Router();

const { purchasePremium , updatetransactionStatus} = require('../controllers/purchase.controllers');

router.get('/premiummembership', purchasePremium);
router.post('/updatetransactionstatus', updatetransactionStatus);

module.exports = router;