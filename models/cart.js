const { readFile, writeFile } = require('fs/promises');
const path = require('path');

const DEFAULT_CART = {
  products: [],
  totalPrice: 0,
}

const PATH = path.join(
  path.dirname(require.main.filename),
  'data',
  'cart.json'
);

class Cart {
  static async add(productId, prodPrice) {
    let cart;
    try {
      const data = await readFile(PATH, { encoding: 'utf-8' });
      cart = JSON.parse(data);
    } catch {
      cart = DEFAULT_CART;
    }

    const productIndex = cart.products.findIndex(prod => prod.productId === productId);

    if (productIndex >= 0) {
      const product = {...cart.products[productIndex]};
      cart.products[productIndex] = {...product, qty: product.qty + 1};
    } else {
      cart.products.push({ productId, qty: 1 });
    }

    cart.totalPrice = prodPrice + cart.totalPrice;

    try {
      console.log('cart ===>', cart);
      await writeFile(PATH, JSON.stringify(cart));
    } catch (err) {
      console.log('err 3 ===>', err);
    }
  }

  static async getCart() {
    let cart;
    try {
      const data = await readFile(PATH, { encoding: 'utf-8' });
      cart = JSON.parse(data);
    } catch {
      cart = DEFAULT_CART;
    }

    return cart;
  }
  
  static async deleteProduct(id, price) {
    let cart;
    try {
      const data = await readFile(PATH, { encoding: 'utf-8' });
      cart = JSON.parse(data);
    } catch {
      cart = DEFAULT_CART;
    }

    if (cart.products.length === 1) {
      cart = DEFAULT_CART;
    }

    if (cart.products.length > 1) {
      const productToDelete = cart.products.find(el => el.productId === id);
      if (productToDelete) {
        cart.products = cart.products.filter(el => el.productId !== id);
        cart.totalPrice = cart.totalPrice - (price * productToDelete.qty);
      }
    }

    try {
      await writeFile(PATH, JSON.stringify(cart));
    } catch (err) {
      console.log('err 3 ===>', err);
    }
  }
};

module.exports = Cart;
