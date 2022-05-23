const {Post} = require('../../models');
const {
    uploadToS3,
} = require('../service/awsS3.service');


async function createPost(req, res) {
    try {
    
        const {title, description} = req.body;
        if (!title || !description) {
            return res.status(400).json({
                message: "Missing input!"
            })
        }
        //console.log(req.file);
        var path = '';
        if (req.files[0]) {
            const file = req.files[0];
            const result = await uploadToS3(file);
            path = result.Location;
        }

        await Post.create({
            title: title,
            description: description,
            userId: req.user.id,
            photoPath: path,
        });

        return res.status(201).json({
            message: 'Post was created successfully!'
        });

    } catch (err) {
        console.log(err.message);
        return res.status(500).json({message: err.message});
    }
}

module.exports = {
    createPost,
}