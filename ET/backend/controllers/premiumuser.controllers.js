const jwt = require('jsonwebtoken');
const secret_key = 'Your$ecret#Key';

// middleware to check premium membership
const checkPremiumUser = (req, res, next)=>{

    if(req.user.ispremiumuser){
        return res.status(200).json({'premiumtoken' : 'premiumtoken'});
    }

    return res.status(401).json({'Error' : 'Not a premium user'});

    next();
}

module.exports = {
    checkPremiumUser
};