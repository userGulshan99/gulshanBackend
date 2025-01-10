const { where } = require('sequelize');

const User = require('../models/users.models.js');

const postUser = async (req, res, next) =>{
  try {
    const { name, email, password } = req.body;
  
    let user;
    
    user = await User.findOne({
      where:{
          email:email
      }
    });
  
    if(user){
      return res.status(400).json({"message" : "user already exists"});
    }
  
    user = await User.create({
      name:name, email: email, password:password
    });
  
    return res.status(201).json({"user" : user});
  
  } catch (error) {
    return res.status(500).json({"error" : "Error occured while creating the user"});  
  }

}

module.exports = {
  postUser
};