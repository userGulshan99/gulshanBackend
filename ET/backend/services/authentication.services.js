const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

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

// to generate new token
async function generateToken(payload){
  try {
    return jwt.sign(payload, process.env.AUTH_SECRET_KEY); 
  } catch (error) {
    throw new Error(error);
  }
}


module.exports = {
    encryptPassword, 
    decryptPassword,
    generateToken
}