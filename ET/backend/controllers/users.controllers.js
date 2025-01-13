const { where } = require('sequelize');
const bcrypt = require('bcrypt');

const User = require('../models/users.models.js');

// to sign up user
const postUser = async (req, res, next) =>{
  try {

    let { name, email, password } = req.body;
  
      password = await encryptPassword(password);
      
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

    user.password = null;
    req.user = user;

    return res.status(200).json({'user' : user});

  } catch (error) {
    return res.status(500).json({"error" : "Error occured while creating the user"});  
  }

}

// to login user
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

      const comparedPassword = await decryptPassword(password, user.password);

      if(!comparedPassword){
        return res.status(401).json({'Error' : 'Password does not match'});
      }
      
      user.password = null;
      req.user = user;
  
      return res.status(200).json({'user' : user});

    } catch (error) {
      return res.status(500).json({'Error' : 'Internal Server Error'});
    }
  
}

// store encrypted password in DB
async function encryptPassword(password){
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    return  hashedPassword;
  } catch (error) {
    throw new Error(error);
  }
}

// compare stored and user's entered password
async function decryptPassword(password, hash){
  try {
    return await bcrypt.compare(password, hash);
  } catch (error) {
    throw new Error(error);
  }
}

module.exports = {
  postUser,
  getUser
};
