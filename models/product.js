const fs = require('fs');
const { readFile } = require('fs/promises');
const { randomUUID } = require('crypto');
const path = require('path');

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
  constructor(title, imageUrl, description, price) {
    this.title = title;
    this.imageUrl = imageUrl || 'https://www.publicdomainpictures.net/pictures/10000/velka/1-1210009435EGmE.jpg';
    this.description = description;
    this.price = price;
    this.id = randomUUID();
  }

  save() {
    getProductsFromFile(products => {
      products.push(this);
      fs.writeFile(p, JSON.stringify(products), err => {
        console.log(err);
      });
    });
  }

  static async getProductById(id) {
    let products = [];
    try {
      const data = await readFile(p, { encoding: 'utf-8' });
      products = JSON.parse(data);
    } catch(err) {
      console.log(err);
    } finally {
      return products.find(prod => prod.id === id)
    }
  }

  static fetchAll(cb) {
    getProductsFromFile(cb);
  }
};
