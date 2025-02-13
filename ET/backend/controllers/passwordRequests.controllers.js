const path = require('path');

const {v4 : uuidv4} = require('uuid');

const {User} = require('../models/user.models.js');
const {forgotPasswordRequests} = require('../models/ForgotPasswordRequests.js');

const {sendPasswordResetMail} = require('./sendInBlue.js');
const {encryptPassword} = require('../controllers/user.controllers.js');


// send link if user forgets password
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

        const id = uuidv4();

        await forgotPasswordRequests.create({
            id : id,
            isactive : true,
            userId : user.id
        })

        await sendPasswordResetMail(email, id);

        return res.status(200).send('<h1> Password reset link sent successfully on registered email.</h1>');

    } catch (error) {
        return res.status(500).json({'Error' : 'unable to send link', 'message' : 'There was an error occured while sending link to reset password. please, try again'});
    }
}



// check if password change request is valid or not
const checkResetPasswordRequest = async (req, res, next) =>{
    try {
            let id = req.params.id;
        
            const passwordRequest = await forgotPasswordRequests.findOne({
                where : {
                    id : id,
                    isactive : true
                }
            });
        
            if(!passwordRequest){
                return res.status(400).json({'Error' : 'Invalid Request'});
            }
        
            // serve form to change password 
            return res.status(200).sendFile(path.join(__dirname,'..', 'public', 'resetPassword.html'));

    } catch (error) {
        return res.status(400).json({'Error' : 'Invalid Request'});
    }
}


// to set new password
const setNewPassword = async (req, res, next) =>{
    try {
        const id = req.params.id;
        const password1 = req.body.password1;
        const password2 = req.body.password2;
    
        if(password1 !== password2){
            return res.status(400).send('<h2> Input password and confirm password do not match </h2>');
        }
        
        const changePasswordRequest = await forgotPasswordRequests.findOne({
            where : {
                id
            }
        });
    
        if(!changePasswordRequest.isactive){
            return res.status(400).json({'Error' : 'Invalid Request'});
        }
    
        changePasswordRequest.id = null;
        changePasswordRequest.isactive = false;
        await changePasswordRequest.save();

        const encryptedPassword = await encryptPassword(password1); 

        await User.update({
            password : encryptedPassword
        }, {
            where : {
                id : changePasswordRequest.userId
            }
        })
    
        return res.status(200).send('<h2>New Password Set Successfully.<br/> <a href="http://127.0.0.1:5501/ET/frontend/login.html"> Login Now </a> </h2>');

    } catch (error) {
        return res.status(500).json({'Error' : 'Unable to change password, please try again'});
    }
}


module.exports = {
    forgotPassword,
    checkResetPasswordRequest,
    setNewPassword
};