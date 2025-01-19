const jwt = require('jsonwebtoken');
const secret_key = 'Your$ecret#Key';

const {User} = require('../models/user.models');
const {Expense} = require('../models/expense.models');

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

// to get leaderboard of expenses

const userExpenses = async (req, res, next) =>{
    try {
        const users = await User.findAll({
            include: {
              model: Expense,
              required: true,
            },
            attributes : ['name', 'email']
          });
    
        return res.status(200).json(users);
    } catch (error) {
        return res.status(500).json({'Error' : 'Internal Server Error'});
    }
}

module.exports = {
    checkPremiumUser,
    userExpenses
};

