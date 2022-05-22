const {Post} = require('../../models');

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
        if (req.file) {
            path = req.file.path;
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