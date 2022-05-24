const {
    User,
    Post,
    Photo,
    Comment,
} = require('../../models');

async function createComment(req, res) {
    try {
        const { content, postId} = req.body;
        if (!content || !postId) {
            return res.status(400).json({
                message: "Missing input!"
            })
        }
        const createdUserId = req.user.id;

        await Comment.create({
            createdUserId: createdUserId,
            content: content,
            postId: Number(postId),
        });

        return res.status(201).json({
            message: 'Comment was created successfully!'
        })

    } catch (err) {
        console.log(err.message);
        return res.status(500).json({message: err.message});
    }
}


module.exports = {
    createComment,
}