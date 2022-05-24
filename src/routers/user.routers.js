const express = require('express');
const {
    verifyToken,
} = require('../middleware/authJwt.middleware');

const {
    createUsername,
} = require('../controllers/user.controllers')


const userRouter = express.Router();

userRouter.put("/user/username/create", verifyToken, createUsername);

module.exports = userRouter;