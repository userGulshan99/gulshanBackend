const Users = require('../models/users');
const path = require('path');


// get list of existing users
exports.getUsers = (req, res, next) =>{
    Users.findAll()
    .then((data)=>{
        res.status(200).json(data);
    })
    .catch((err)=>{
        console.log(err);
    });
}

// create new user
exports.postUser = (req, res, next) =>{
    Users.create({
        username : req.body.username,
        phonenumber : req.body.phonenumber,
        email : req.body.email 
    }).then((result)=>{
        res.redirect('/');
    }).catch((err)=>{
        console.log(err);
    })
}

// delete user from database
exports.delete = (req, res, next) =>{
    
    Users.findByPk(req.params.id).then((data)=>{
        if(!data){
         return   res.status(404).send('<h1>User Not Found! </h1>');
        }
        return data.destroy();
    }).catch((err)=>{
        console.log(err);
        return;
    })
    
    res.redirect('/');
}

// get user to edit
exports.edit = (req, res, next) =>{
    Users.findByPk(req.params.id).then((data)=>{
        if(!data){
            return res.send('<h1>Bad Request!</h1>');
        }
       return res.status(200).json(data);
    }).catch((err)=>{
        console.log(err);
        return;
    })
}

// update user details
exports.postEdit = (req, res, next) =>{

    Users.findByPk(req.params.id).then((data)=>{
        if(!data){
            res.status(404).send('<h1>User Not Found! </h1>');
        }
        data.username = req.body.username;
        data.phonenumber = req.body.phonenumber;
        data.email = req.body.email;
       return data.save();
    }).then((result)=>{
        res.redirect('/');
    })
    .catch((err)=>{
        console.log(err);
        return;
    })
}