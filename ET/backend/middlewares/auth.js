const jwt = require('jsonwebtoken');
const secret_key = 'Your$ecret#Key';

const User = require('../models/users.models.js');

const verifyToken = async (req, res, next) =>{
    try {
        const token = req.header('Authorization');
        
        if(!token){
            return res.status(401).json({'error message' : 'User needs to login first'});
        }
        
        const payload = jwt.verify(token, secret_key);
        
        const user = await User.findOne({
            where : {
                id : payload.id
            }
        });

        if(!user){
            return res.status(404).json({'Bad Request' : 'user not found'});
        }

        req.user = user;
        
        next();
    } catch (error) {
        console.log('verify token error : ', error);
        return res.status(500).json({'error' : error})
        
    }
}

module.exports = {
    verifyToken
}