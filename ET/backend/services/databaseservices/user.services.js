const {User} = require('../../models/user.models.js');

async function getUserFromDatabase(condition) {
    try {
        const user = await User.findOne({
            where: condition
          });
        
        return user;
    } catch (error) {
        throw new Error(error.message);
    }
}


async function getAllUsersFromDatabase(attributes){
    try {
        return await User.findAll({
            attributes : attributes
          });
    } catch (error) {
        throw new Error(error);
    }
}

// to store new user in DB
async function createUser(payload) {
    try {

        if(!payload){
            throw new Error("Data required to create user");
        }

        const user = await User.create(payload);

      return user;
      
    } catch (error) {
        throw new Error(error.message);
    }
}


// update user details
async function updateUser(userId, userDetails) {
    try {
        const user = await User.update(userDetails, {
            where : {
                id : userId
            }
        })

        return user;
    } catch (error) {
        throw new Error("unable to update user details");
    }
}



module.exports = {
    getUserFromDatabase,
    getAllUsersFromDatabase,
    createUser,
    updateUser
}