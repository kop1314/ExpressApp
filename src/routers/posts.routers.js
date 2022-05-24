const express = require('express');
const {
    verifyToken,
} = require('../middleware/authJwt.middleware');

const {
    upload,
    uploadErrorHandler,
} = require('../middleware/uploadImg.middleware')

const {
    createPost,
    getPostsByUserId,
    getAllPosts,
} = require('../controllers/posts.controllers')

const postsRouter = express.Router();

postsRouter.post('/posts/create', verifyToken, upload.array('photo'), uploadErrorHandler, createPost);
postsRouter.get('/posts/edit/:userId', verifyToken, getPostsByUserId);
postsRouter.get('/posts', verifyToken, getAllPosts);


module.exports = postsRouter;