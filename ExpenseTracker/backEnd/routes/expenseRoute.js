const express = require('express');
const router = express.Router();

const expenseController = require('../controllers/ExpenseController');

const bodyParser = require('body-parser');
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended : false}));

// route to get stored data
router.get('/expense', expenseController.getExpenses);

// save new data into database
router.post('/expense', expenseController.postExpense);

// send data to edit
router.get('/expense/edit-expense/:id', expenseController.edit);

// save data after edit
router.post('/expense/edit-expense/:id', expenseController.postEdit);

// delet data from database
router.delete('/expense/delete-expense/:id', expenseController.delete);

module.exports = router;