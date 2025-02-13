const {forgotPasswordRequests} = require('../../models/ForgotPasswordRequests.js');

// to set new request for reset password request
async function createForgotPasswordRequests(id, isactive, userId) {
    try {
        
      return  await forgotPasswordRequests.create({
            id : id,
            isactive : isactive,
            userId : userId
        })
    } catch (error) {
        throw new Error("unable to create forgot password request");
    }

}

// check if request is valid or not
async function findActiveForgotPasswordRequest(requestId) {
    try {
        const passwordRequest = await forgotPasswordRequests.findOne({
            where : {
                id : requestId,
                isactive : true
            }
        });

        if(!passwordRequest){
            throw new Error("Invalid Request");
        }

        return passwordRequest
    } catch (error) {
        throw new Error("Invalid Request");
    }
}


module.exports = {
    createForgotPasswordRequests,
    findActiveForgotPasswordRequest
}