const Sib = require('sib-api-v3-sdk');

const defualtClient = Sib.ApiClient.instance;

const apiKey = defualtClient.authentications['api-key'];

apiKey.apiKey = process.env.API_KEY;

function sendPasswordResetMail (email, id){
    const transEmailApi = new Sib.TransactionalEmailsApi();

    const sender = {
        name : 'Gulshan Bankar',
        email : 'gulshandbankar@gmail.com'
    }

    const receivers = [{
        email : email
    }];

    return transEmailApi.sendTransacEmail({
        sender,
        to: receivers,
        subject : 'Password Reset',
        htmlContent : `<h1> Hi, you requested for reset password link </h1> <br/> <a href="http://localhost:3000/password/resetpassword/${id}"> Click here to reset password </a>`
    })
};

module.exports = {
    sendPasswordResetMail
};