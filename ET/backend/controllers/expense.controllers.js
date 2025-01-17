const {Expense} = require('../models/expense.models.js');

// to store new expense in database
const addExpense = async (req, res, next) =>{
   try {
     const {amount, category , description } = req.body;

     const expense = await req.user.createExpense({
        amount : amount,
        category : category,
        description : description
     });
     
     return res.status(201).json(expense);
   } catch (error) {
     return res.status(500).json({'Error' : error});    
   }
}

// to get all stored expenses from database
const getExpenses = async (req, res, next) =>{
    try {
        const expense = await Expense.findAll({
            where : {
                userId : req.user.id
            }
        });
        
        expense.userId = null;
        
        if(!expense){
            return res.status(404).json({'Error': 'Expense not found'});
        }

        return res.status(200).json(expense);
    } catch (error) {
        console.log(error);
        return res.json(500).json({"Error" : error});
    }
}


// Delete selected expense
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