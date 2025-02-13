const jwt = require('jsonwebtoken');

const {User} = require('../models/user.models.js');

const verifyToken = async (req, res, next) =>{

    try {
        const token = req.header('Authorization');
        
        if(!token){
            return res.status(401).json({'Error' : 'User needs to login first'});
        }
        
        try {
            var payload = jwt.verify(token, process.env.AUTH_SECRET_KEY);
        } catch (error) {
            return res.status(401).json({'Error' : 'Invalid or Expired token'});            
        }
        
        const user = await User.findOne({
            where : {
                id : payload.id
            }
        });

        if(!user){
            return res.status(401).json({'Error' : 'user not found'});
        }

        req.user = user;
        
        next();
    } catch (error) {
        return res.status(401).json({'Error' : 'Bad Request'});
    }
}


module.exports = {
    verifyToken
}