const Product = require('../models/product');

const getAddProduct = (req, res, next) => {
  res.render('add-product', { pageTitle: 'Add Product', path: req.originalUrl});
};

const postAddProduct = async (req, res, next) => {
  await new Product(req.body.title).save();
  res.redirect('/');
};

const getProduct = Product.fetchAll;

module.exports = {
  getAddProduct,
  getProduct,
  postAddProduct
};
