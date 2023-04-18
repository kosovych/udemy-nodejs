const fs = require('fs');
const { readFile, writeFile } = require('fs/promises');
const { randomUUID } = require('crypto');
const path = require('path');

const db = require('../util/db');

const p = path.join(
  path.dirname(require.main.filename),
  'data',
  'products.json'
);

const getProductsFromFile = cb => {
  fs.readFile(p, (err, fileContent) => {
    if (err) {
      cb([]);
    } else {
      cb(JSON.parse(fileContent));
    }
  });
};

module.exports = class Product {
  constructor(id, title, imageUrl, description, price) {
    this.id = id;
    this.title = title;
    this.imageUrl = imageUrl || 'https://www.publicdomainpictures.net/pictures/10000/velka/1-1210009435EGmE.jpg';
    this.description = description;
    this.price = price;
  }

  save() {
    getProductsFromFile(products => {
      if (this.id) {
        const index = products.findIndex(el => el.id === this.id);
        console.log(this.id, index);
        products[index] = this;
      } else {
        products.push({...this, id: randomUUID()});
      }
      fs.writeFile(p, JSON.stringify(products), err => console.log('err 1 ===>', err));
    });
  }

  static async getProductById(id) {
    let products = [];
    try {
      const data = await readFile(p, { encoding: 'utf-8' }); products = JSON.parse(data);
    } catch(err) {
      console.log('err 2 ===>', err);
    } finally {
      return products.find(prod => prod.id === id)
    }
  }

  static async deleteProduct(id) {
    let products = [];
    const data = await readFile(p, { encoding: 'utf-8' });
    products = JSON.parse(data);
    const newProducts = products.filter(el => el.id !== id);
    try {
      await writeFile(p, JSON.stringify(newProducts));
    } catch (error) {
      console.log(error);
    }
  }

  static async fetchAll() {
    try {
      const [products] = await db.execute('SELECT * FROM products');
      return products;
    } catch (error) {
      console.log(err);
    }
  }
};
