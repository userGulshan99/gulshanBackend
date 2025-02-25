const jwt = require('jsonwebtoken');

const {User} = require('../models/user.models');
const {Expense} = require('../models/expense.models');
const { where, Op, Sequelize } = require('sequelize');
const sequelize = require('../utils/database');
const { getAllExpensesOfUser } = require('../services/databaseservices/expense.services');
const {uploadToS3} = require('../services/aws.services.js');
const { saveDownloadedFileUrl , getDownloadedFileUrlList} = require('../services/databaseservices/url.services.js');

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
            attributes : ['id','name', 'totalexpenseamount'],
            limit: 5,
            order : [['totalexpenseamount', 'DESC']]
        });

        return res.status(200).json(users);
    } catch (error) {
        console.log(error);
        return res.status(500).json({'Error' : 'Could not get data at this moment'});
    }
}


// get limited data to display on each page
const getExpensesReport = async (req, res, next) =>{
    try {
        let page = req.query.page || 1;
            page = Number(page);


        //set required rows as per the query 
        let items_per_page = req.query.rows || 10;
        items_per_page = Number(items_per_page);

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
        return res.status(500).json({'Error' : 'Could not get data at this moment'});
    }
}

const downloadExpenses   = async (req, res, next) =>{
    try {
        const expenses = await getAllExpensesOfUser(req.user.id);
        const stringifiedExpenses = JSON.stringify(expenses);

        const fileName = `Expenses${req.user.id}/${new Date()}.txt`;

        const fileUrl = await uploadToS3(stringifiedExpenses, fileName);
        
        await saveDownloadedFileUrl(fileUrl, req.user.id);
        
        return res.status(200).json({fileUrl, success : true});
    } catch (error) {
        return res.status(500).json({'Error' : 'Unable to download expenses'});
    }
}

const getDownloadedFilesList = async (req, res, next) =>{
    try {
        const list = await getDownloadedFileUrlList(req.user.id);
        return res.status(200).json({'urlList' : list}); 
    } catch (error) {
        return res.status(500).json({'Error' : 'Unable to get urls, please try again'});
    }
}

module.exports = {
    checkPremiumUser,
    userExpenses,
    getExpensesReport,
    downloadExpenses,
    getDownloadedFilesList
};