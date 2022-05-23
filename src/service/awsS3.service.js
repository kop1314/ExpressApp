const { 
    S3 
} = require('aws-sdk');

async function uploadToS3(files) {
    const s3 = new S3();
    const params = files.map((file) => {
        var uniqueprefix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        return {
            Bucket: process.env.AWS_BUCKET_NAME,
            Key: `photos/${uniqueprefix}-${file.originalname}`,
            Body: file.buffer,
        }
    });

    return await Promise.all(params.map((param) => s3.upload(param).promise()));
}

module.exports = {
    uploadToS3,
}