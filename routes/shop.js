const express = require('express');
const { products } = require('./admin');

const router = express.Router();

router.get('/', (req, res, next) => {
  res.render('shop', { products, pageTitle: 'Shop', path: req.originalUrl });
});

module.exports = router;
