const jwt = require('jsonwebtoken');
const secret_key = 'Your$ecret#Key';

const {User} = require('../models/user.models');
const {Expense} = require('../models/expense.models');
const { where, Op, Sequelize } = require('sequelize');
const sequelize = require('../utils/database');

// middleware to check premium membership

const checkPremiumUser = (req, res, next)=>{
    try {
    
        if(req.user.ispremiumuser){
           return next();
        }else{
            throw new Error("Please buy membership to access this feauture");
        }

    } catch (error) {
        return res.status(401).json(error);
    }

}

// optimised query to get leaderboard of expenses

const userExpenses = async (req, res, next) =>{
    try {
        const users = await User.findAll({
            attributes : ['id','name', [sequelize.fn('sum', sequelize.col('expenses.amount')), 'total_cost']],

            include: {
                model: Expense,
                attributes : []
            },
            group : ['user.id'],
            order : [['total_cost', 'DESC']]
          });
    
        return res.status(200).json(users);
    } catch (error) {
        return res.status(500).json({'Error' : error});
    }
}

module.exports = {
    checkPremiumUser,
    userExpenses
};

