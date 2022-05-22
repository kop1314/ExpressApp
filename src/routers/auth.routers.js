const express = require('express');

const {
    signUp,
    signIn,
} = require('../controllers/auth.controllers');

const authRouter = express.Router();

authRouter.post('/auth/signup', signUp);
authRouter.post('/auth/signin', signIn);

module.exports = authRouter;


