const Expense = require('../models/expense');
const path = require('path');

// send all data to the front-end
exports.getExpenses = (req, res, next)=>{
    
    Expense.findAll()
    .then((data)=>{
        res.status(200).json(data);
    })
    .catch((err)=>{
        console.log(err);
    });
}

// delete data
exports.delete = (req, res, next) =>{
    
    Expense.findByPk(req.params.id).then((data)=>{
        if(!data){
         return   res.status(404).send('<h1>User Not Found! </h1>');
        }
        return data.destroy();
    }).catch((err)=>{
        console.log(err);
        return;
    })
    
    res.redirect('/expense');
}


// add new data into database
exports.postExpense = (req, res, next) =>{
    
    Expense.create({
        expenseamount : req.body.expenseamount,
        category : req.body.category,
        description : req.body.description 
        
    }).then((result)=>{
        res.redirect('/expense');
    }).catch((err)=>{
        console.log(err);
    })
}

// send data to user to edit
exports.edit = (req, res, next) =>{
    Expense.findByPk(req.params.id).then((data)=>{
        if(!data){
            return res.send('<h1>Bad Request!</h1>');
        }
       return res.status(200).json(data);
    }).catch((err)=>{
        console.log(err);
        return;
    })
}

// save data into database after edit
exports.postEdit = (req, res, next) => {
    Expense.findByPk(req.params.id).then((data)=>{
        if(!data){
            res.status(404).send('<h1>User Not Found! </h1>');
        }
        data.expenseamount = req.body.expenseamount;
        data.category = req.body.category;
        data.description = req.body.description;
       return data.save();
    }).then((result)=>{
        res.redirect('/expense');
    })
    .catch((err)=>{
        console.log(err);
        return;
    })
}