const {
    Post,
    Photo,
} = require('../../models');

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
        const post = await Post.create({
            title: title,
            description: description,
            userId: req.user.id,
        });


        //console.log(req.file);
        if (req.files) {
            const results = await uploadToS3(req.files);
            results.map(async (result) => {
                await Photo.create({
                    postId: post.id,
                    photoUrl: result.Location,
                })
            })
        }


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