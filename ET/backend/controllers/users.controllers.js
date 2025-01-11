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

const getUser = async (req, res, next) =>{
  try {
      const {email, password} = req.body;
      
      if(!email || !password){
        return res.status(400).json({'Error' : 'All fields are required'})
      }
    
      let user = await User.findOne({
        where:{
            email:email
        }
      });
    
      if(!user){
        return res.status(404).json({'message' : 'User Not Found!'});
      }

      if(user.password !== password){
        return res.status(401).json({'Error' : 'Password does not match'});
      }

      return res.status(200).json({'message' : 'User logged in successfully'});

    } catch (error) {
      return res.status(500).json({'Error' : 'Internal Server Error'});
    }
  
}


module.exports = {
  postUser,
  getUser
};