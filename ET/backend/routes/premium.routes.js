const express = require('express');
const router = express.Router();

const {userExpenses} = require('../controllers/premiumuser.controllers');

// to give all expenses of user for leaderboard feauture
router.get('/usersexpenses', userExpenses);

module.exports = router;