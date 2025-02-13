const {Expense} = require('../models/expense.models.js');
const {User} = require('../models/user.models.js');
const {Order} = require('../models/order.models.js');

const sequelize = require('../utils/database.js');

// to store new expense in database
const addExpense = async (req, res, next) =>{
    const t = await sequelize.transaction();
   try {

     const {amount, category , description } = req.body;

     if(!amount || !category){
        return res.status(400).json({'Error' : 'Invalid Input'});
     }


     const expense = await req.user.createExpense({
        amount : amount,
        category : category,
        description : description
     },{
        transaction : t
     });
     
     // update total expense amount
     if(!req.user.totalexpenseamount){
         req.user.totalexpenseamount = 0;
    }
        req.user.totalexpenseamount = Number(req.user.totalexpenseamount) + Number(amount); 
        
    // save total expense amount
    await req.user.save({transaction : t});

    await t.commit();
    
    return res.status(201).json(expense);

   } catch (error) {
    await t.rollback();
     return res.status(500).json({'Error' : 'Unable to add expenses in database'});    
   }
}

// to get all stored expenses from database
const getExpenses = async (req, res, next) =>{
    try {
        
        const expense = await Expense.findAll({
            where : {
                userId : req.user.id
            },
            order : [['id', 'DESC']],
            limit: 10
        });
        
        expense.userId = null;
        
        if(!expense){
            return res.status(404).json({'Error': 'Expense not found'});
        }
    
        return res.status(200).json(expense);

    } catch (error) {
        return res.json(500).json({"Error" : 'Could not get expenses at this moment. Please, try again.'});
    }
}


// Delete selected expense
const deleteExpense = async (req, res, next) =>{
    const t = await sequelize.transaction();

    try {
       const expense =  await Expense.findOne({
            where:{
                id: req.params.id
            }
        },{
            transaction : t
        });
 
        if(!expense){
            await t.rollback();
            return res.status(404).json({"Error" : "Expense Not Found"});
        }
        
        // substract expense amount from total amount
         const newTotalExpenseAmount = Number(req.user.totalexpenseamount || 0) - Number(expense.amount); 
    

        await Promise.all([ req.user.update({totalexpenseamount : newTotalExpenseAmount}, { transaction : t}), expense.destroy({ transaction : t})])

        await t.commit();

    } catch (error) {
        await t.rollback();
        return res.status(500).json({'Error' : 'Unable to delete expense'});
    }
}

module.exports = {
    addExpense,
    getExpenses,
    deleteExpense
}