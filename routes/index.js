const express = require('express');
const path = require('path');
const rootPath = require('../utils/rootPath');

const router = express.Router();

router.get('/users', (req, res) => res.sendFile(path.join(rootPath, 'views', 'users.html')));
router.get('/', (req, res) => res.sendFile(path.join(rootPath, 'views', 'index.html')));

module.exports = router;
