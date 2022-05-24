const express = require('express');
const {
    verifyToken,
} = require('../middleware/authJwt.middleware');

const {
    createComment,
} = require('../controllers/comment.controllers')


const userRouter = express.Router();

userRouter.post("/comment/create", verifyToken, createComment);

module.exports = userRouter;