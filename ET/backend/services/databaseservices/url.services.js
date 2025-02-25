const {listOfDownloadedExpenses} = require('../../models/url.models.js');

// save downloade file's url in database
async function saveDownloadedFileUrl(url, userId){
    try {

        return await listOfDownloadedExpenses.create({
                url,
                userId : userId
        });
    } catch (error) {
        throw new Error(error);
    }
}

// get list of downloaded file urls to send on frontend
async function getDownloadedFileUrlList(userId){
    try {

        return await listOfDownloadedExpenses.findAll({
            where : {
                userId : userId
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