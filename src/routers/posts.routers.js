const express = require('express');
const {
    verifyToken,
} = require('../middleware/authJwt');

const {
    upload,
} = require('../middleware/uploadImg')

const {
    createPost,
} = require('../controllers/posts.controllers')

const postsRouter = express.Router();

postsRouter.post('/posts/create', verifyToken, upload.single('photo'), createPost);

module.exports = postsRouter;