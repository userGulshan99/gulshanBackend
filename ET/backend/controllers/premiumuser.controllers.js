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
        console.log(error);
        
        return res.status(401).json(error);
    }

}

// optimised query to get leaderboard of expenses

const userExpenses = async (req, res, next) =>{
    try {
        const users = await User.findAll({
            attributes : ['id','name', 'totalexpenseamount']
          });
    
        return res.status(200).json(users);
    } catch (error) {
        return res.status(500).json({'Error' : error});
    }
}


// get limited data to display on each page
const getExpensesReport = async (req, res, next) =>{
    try {
        let page = req.query.page || 1;
            page = Number(page);
        const items_per_page = 10;

        const { count, rows } = await Expense.findAndCountAll({
            offset: (page-1)*items_per_page,
            limit: items_per_page,
        });

        const data = {
            expenses : rows,
            currentPage : page,
            hasNextPage : (page*items_per_page) < count,
            nextPage : page+1,
            previousPage : (page-1) || 1,
            totalPages : Math.ceil(count/items_per_page)
        };

        return res.status(200).json(data);
    } catch (error) {
        console.log(error);
        return res.status(500).json({'Error' : error});
    }
}

module.exports = {
    checkPremiumUser,
    userExpenses,
    getExpensesReport
};

