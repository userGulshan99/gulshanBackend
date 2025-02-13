const AWS = require('aws-sdk');

async function uploadToS3(data, filename, Bucket= 'appexpensetracker'){
    try {
        let s3bucket = new AWS.S3({
            accessKeyId : process.env.AWS_ACCESS_KEY,
            secretAccessKey : process.env.AWS_ACCESS_SECRET,
        });
    
        const params = {
            Bucket : Bucket,
            Key : filename,
            Body : data,
            ACL : 'public-read'
        };
    
        return new Promise((resolve, reject)=>{
    
            s3bucket.upload(params, (err, s3responseData)=>{
                if(err){
                    reject(err);
                }else{
                    const location = s3responseData.Location;
                    
                    resolve(location);
                }
            })
        })
    } catch (error) {
        return error;
    }

}

module.exports = {
    uploadToS3
}