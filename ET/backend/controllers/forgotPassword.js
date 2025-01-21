const {User} = require('../models/user.models.js');

const {sendPasswordResetMail} = require('../controllers/sendInBlue.js');


const forgotPassword = async (req, res, next) =>{

    try {
        const {email} = req.body;
    
    
        const user = await User.findOne({
            where : {
                email : email
            }
        });
    
        if(!user){
            return res.status(404).json({'Error' : 'User is not registered with our services'});
        }

        await sendPasswordResetMail(email);
        
        return res.status(200).json( {'success' : true, 'message' : 'reset link sent seuccessfully'});

    } catch (error) {
        console.log(error);
        return res.status(500).json({'Error' : 'unable to send link'});
    }
}

module.exports = {
    forgotPassword
};