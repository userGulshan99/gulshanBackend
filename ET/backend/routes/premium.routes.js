const express = require('express');
const router = express.Router();

const {userExpenses, getExpensesReport} = require('../controllers/premiumuser.controllers');

// to give all expenses of user for leaderboard feauture
router.get('/usersexpenses', userExpenses);

// get monthly expenses report
router.get('/getmonthlyexpenses',  getExpensesReport);

module.exports = router;