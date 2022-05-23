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
} = require('../controllers/posts.controllers')

const postsRouter = express.Router();

postsRouter.post('/posts/create', verifyToken, upload.array('photo'), uploadErrorHandler, createPost);

module.exports = postsRouter;