const { where } = require('sequelize');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const {User} = require('../models/user.models.js');

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
      return res.status(400).json({"Error" : "user already exists"});
    }
  
    user = await User.create({
      name:name, email: email, password:password
    });

    user.password = null;

    const payload = {
      id : user.id,
      ispremiumuser : user.ispremiumuser,
      name : user.name
    }

    const token = jwt.sign(payload, process.env.AUTH_SECRET_KEY); 

    return res.status(200).json({'success' : true, token : token});

  } catch (error) {
    return res.status(500).json({"Error" : "Error occured while creating the user"});  
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
        return res.status(404).json({'Error' : 'User Not Found!'});
      }

      const comparedPassword = await decryptPassword(password, user.password);

      if(!comparedPassword){
        return res.status(401).json({'Error' : 'Password do not match'});
      }
      
      req.user = user;

      user.password = null;

      const payload = {
        id : user.id,
        ispremiumuser : user.ispremiumuser,
        name : user.name
      }
  
      const token = jwt.sign(payload, process.env.AUTH_SECRET_KEY); 

      return res.status(200).json({'success' : true, token : token});
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
  getUser,
  encryptPassword, 
  decryptPassword
};