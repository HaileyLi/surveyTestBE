var express = require('express');
const port = process.env.PORT || 3000; //在beanstalk环境中用env port做接口 本地仍用3000
const cors = require("cors")

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var initRouter = require('./routes/init');

var app = express();


app.use(express.json());
app.use(cors());

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/init', initRouter);

app.get('/', (req, res) => {
    res.send("<h1>visiting survey backend API</h1>");
})

app.listen(port, () => {
    console.log("Survey backend is up and listening to port " + port);
});

module.exports = app;