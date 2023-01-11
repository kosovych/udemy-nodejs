const http = require('http');
const express = require('express');

const app = express();

app.use('/', (req, res, next) => {
  console.log(1);
  res.send('<h1>1</h1>');
  next();
});

app.use('/add', (req, res, next) => {
  console.log(2);
  res.send('<h1>2</h1>');
  next();
});


app.listen(3000);
