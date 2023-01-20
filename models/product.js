const { readFile, writeFile } = require('node:fs/promises');
const path = require('path');
const rootDir = require('../util/path');

const filePath = path.join(rootDir, 'data', 'products.json');

const getProductFromFile = async () => {
  let products = [];
  try {
    const contents = await readFile(filePath, { encoding: 'utf8' });
    products = JSON.parse(contents);
  } catch(err) {
    console.log(err);
  } finally {
    return products;
  }
}

const Product = class {
  constructor(t) {
    this.title = t
  };

  async save() {
    try {
      const products = await getProductFromFile();
      products.push(this);
      await writeFile(filePath, JSON.stringify(products));
    } catch(err) {
      console.log(err);
    }
  }

  static async fetchAll(req, res, next) {
    try {
      const products = await getProductFromFile();
      res.render('shop', { products, pageTitle: 'Shop', path: req.originalUrl });
    } catch(err) {
      console.log(err);
    }
  }
};

module.exports = Product;
