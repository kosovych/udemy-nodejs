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
    console.log('ADD');
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
      console.log(cart);
      await writeFile(PATH, JSON.stringify(cart));
    } catch (err) {
      console.log(err);
    }
  }
};

module.exports = Cart;
