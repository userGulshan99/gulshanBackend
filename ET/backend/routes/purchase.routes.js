const express = require('express');
const router = express.Router();

const { purchasePremium , updatetransactionStatus, getPremiumToken} = require('../controllers/purchase.controllers');

router.get('/premiummembership', purchasePremium);

router.post('/updatetransactionstatus', updatetransactionStatus);

// send token to frontend if user is premium
router.get('/getpremiumtoken', getPremiumToken);

module.exports = router;