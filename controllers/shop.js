const Product = require('../models/product');
const Cart = require('../models/cart');

exports.getProducts = async (req, res, next) => {
  const products = await Product.fetchAll();
  res.render('shop/product-list', {
    prods: products,
    pageTitle: 'All Products',
    path: '/products'
  });
};

exports.getProductById = async (req, res, next) => {
  const product = await Product.getProductById(req.params.productId);
  res.render('shop/product-detail', {
    product,
    pageTitle: 'Product Detail',
    path: '',
  });
};

exports.getIndex = async (req, res, next) => {
  const products = await Product.fetchAll();

  res.render('shop/index', {
    prods: products,
    pageTitle: 'Shop',
    path: '/'
  });
};

exports.getCart = async (req, res, next) => {
  const cart = await Cart.getCart();
  Product.fetchAll(products => {
    const cartProducts = cart.products.map((cartProd) => {
      const product = products.find((prod) => prod.id === cartProd.productId);
      return {...product, qty: cartProd.qty}
    });
    res.render('shop/cart', {
      path: '/cart',
      pageTitle: 'Your Cart',
      cartProducts,
      cart
    });
  });
};

exports.getOrders = (req, res, next) => {
  res.render('shop/orders', {
    path: '/orders',
    pageTitle: 'Your Orders'
  });
};

exports.getCheckout = (req, res, next) => {
  res.render('shop/checkout', {
    path: '/checkout',
    pageTitle: 'Checkout'
  });
};

exports.addToCart = async (req, res, next) => {
  const { price, id } = await Product.getProductById(req.body.id);
  await Cart.add(id, +price);
  res.redirect('/cart');
}

exports.deleteFromCart = async (req, res, next) => {
  const { productId } = req.body;
  const { price, id } = await Product.getProductById(productId);
  await Cart.deleteProduct(id, +price);
  res.redirect('/cart');
}
