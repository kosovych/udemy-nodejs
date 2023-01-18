const express = require('express');

const router = express.Router();
const products = [
  {title: 'Book 1'}
];

// /admin/add-product => GET
router.get('/add-product', (req, res, next) => {
  res.render('add-product', { pageTitle: 'Add Product', path: req.originalUrl});
});

// /admin/add-product => POST
router.post('/add-product', (req, res, next) => {
  products.push({title: req.body.title});
  res.redirect('/');
});

module.exports = { router, products };
