const Expense = require('../models/expenses.models.js');

const addExpense = async (req, res, next) =>{
   try {
     const {amount, category , description } = req.body;

     const expense = await Expense.create({
        amount : amount,
        category : category,
        description : description
     });
     
     return res.status(201).json(expense);
   } catch (error) {
     return res.status(500).json({'Error' : 'Internal Server Error', error});    
   }
}

const getExpenses = async (req, res, next) =>{
    try {
        const expense = await Expense.findAll();
        return res.send(expense);
    } catch (error) {
        console.log(error);
    }
}


const deleteExpense = async (req, res, next) =>{
    try {
        await Expense.destroy({
            where:{
                id: req.params.id
            }
        });
        return res.status(200).json({'Message' : 'Expense Deleted Successfully'});
    } catch (error) {
        return res.status(500).json({'Error' : 'Unable to delete expense', error});
    }
}

module.exports = {
    addExpense,
    getExpenses,
    deleteExpense
}