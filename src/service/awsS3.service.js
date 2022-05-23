const { 
    S3 
} = require('aws-sdk');

async function uploadToS3(file) {
    const s3 = new S3();
    const uniqueprefix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const param = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: `photos/${uniqueprefix}-${file.originalname}`,
        Body: file.buffer,
    };
    return await s3.upload(param).promise();
}

module.exports = {
    uploadToS3,
}