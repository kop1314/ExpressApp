const express = require('express');
const bodyParser = require('body-parser');
const authRouter = require('./routers/auth.routers');
const postsRouter = require('./routers/posts.routers');
const app = express();

//app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use('/', authRouter);
app.use('/', postsRouter);

module.exports = app;