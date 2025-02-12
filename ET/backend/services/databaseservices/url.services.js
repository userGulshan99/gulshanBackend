const {listOfDownloadedExpenses} = require('../../models/url.models.js');

// save downloade file's url in database
async function saveDownloadedFileUrl(url, user){
    try {
        return await listOfDownloadedExpenses.create({
                url,
                userId : user.id
        });
    } catch (error) {
        throw new Error(error);
    }
}

// get list of downloaded file urls to send on frontend
async function getDownloadedFileUrlList(user){
    try {
        return await listOfDownloadedExpenses.findAll({
            where : {
                userId : user.id
            },
            order : [['id', 'DESC']]
        });
    } catch (error) {
        throw new Error(error);
    }
}

module.exports = {
    saveDownloadedFileUrl,
    getDownloadedFileUrlList
}