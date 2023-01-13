const express = require('express');
const parser = require('body-parser');
const path = require('path');

const shopRouter = require('./routes/shop');
const adminRouter = require('./routes/admin');

const app = express();

app.use(parser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

app.use(shopRouter);

app.use('/admin', adminRouter);

app.use((req, res, next) => {
  res.status(404).sendFile(path.join(__dirname, 'views/404.html'))
})

app.listen(3000);
