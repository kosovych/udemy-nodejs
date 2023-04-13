const Product = require('../models/product');
const Cart = require('../models/cart');
const fakeAsync = require('../util/fakeAsync');

exports.getAddProduct = (req, res, next) => {
  res.render('admin/edit-product', {
    pageTitle: 'Add Product',
    path: '/admin/edit-product',
    formsCSS: true,
    productCSS: true,
    activeAddProduct: true,
    isEdit: false,
  });
};

exports.getEditProduct = async (req, res, next) => {
  const product = await Product.getProductById(req.params.productID);

  res.render('admin/edit-product', {
    pageTitle: 'Edit Product',
    path: '/admin/edit-product',
    formsCSS: true,
    productCSS: true,
    activeAddProduct: true,
    isEdit: req.query.edit,
    product,
  });
};

exports.postAddProduct = (req, res, next) => {
  const { title, imageUrl, price, description } = req.body;
  const product = new Product(null, title, imageUrl, description, price);
  product.save();
  res.redirect('/');
};

exports.getProducts = (req, res, next) => {
  Product.fetchAll(products => {
    res.render('admin/products', {
      prods: products,
      pageTitle: 'Admin Products',
      path: '/admin/products'
    });
  });
};

exports.postEditProduct = (req, res, next) => {
  const { title, imageUrl, price, description, id } = req.body;
  const product = new Product(id, title, imageUrl, description, price);
  product.save();
  res.redirect('/admin/products');
};

exports.postDeleteProduct = async (req, res, next) => {
  const { id } = req.body;
  const { price } = await Product.getProductById(req.body.id);
  await Product.deleteProduct(id);
  await Cart.deleteProduct(id, price);
  res.redirect('/admin/products');
};
