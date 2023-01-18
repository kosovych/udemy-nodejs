const express = require('express');
const homeRouter = require('./routes/home');
const usersRouter = require('./routes/users');

const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }))

app.set('view engine', 'ejs');

app.use(homeRouter);
app.use(usersRouter);

app.listen(3000);
