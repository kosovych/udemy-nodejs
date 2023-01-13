const express = require('express');
const path = require('path');
const rootPath = require('./utils/rootPath');
const router = require('./routes');

const app = express();

app.use(router);
app.use(express.static('public'));

app.use((req, res) => {
  res.status(404);
  res.sendFile(path.join(rootPath, 'views', '404.html'));
});

app.listen(3000);
