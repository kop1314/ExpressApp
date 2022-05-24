const express = require('express');
const bodyParser = require('body-parser');
const authRouter = require('./routers/auth.routers');
const postsRouter = require('./routers/posts.routers');
const userRouter = require('./routers/user.routers');
const commentRouter = require('./routers/comment.routers');
const methodOverride = require('method-override');

const app = express();

app.use(methodOverride('_method'));

//app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use('/', authRouter);
app.use('/', postsRouter);
app.use('/', userRouter);
app.use('/', commentRouter);

app.get('/', (req, res) => {
    return res.status(200).json({
        message: "hello world" 
    });
});

module.exports = app;