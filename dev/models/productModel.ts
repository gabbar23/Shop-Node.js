import fs from "fs";
import path from "path";

import rootPath from "../util/path";

const getProductsFromFile = (cb: CallableFunction) => {
  const p = path.join(rootPath, "data", "products.json");
  fs.readFile(p, (err, fileContent: any) => {
    if (err) {
      cb([]);
    }
    cb(JSON.parse(fileContent));
  });
};

export class Product {
  title: string;
  imageUrl: string;
  description: string;
  price: number;
  id: string;

  constructor(
    title: string,
    imageUrl: string,
    description: string,
    price: number
  ) {
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
    this.id = Math.random().toString();
  }

  save() {
    const p = path.join(rootPath, "data", "products.json");

    fs.readFile(p, (err, fileContent: any) => {
      let products = [];
      if (!err) {
        products = JSON.parse(fileContent);
      }
      products.push(this);
      fs.writeFile(p, JSON.stringify(products), (err) => {
        console.log(err);
      });
    });
  }
  static findById(id: string, cb: CallableFunction) {
    getProductsFromFile((products: Product[]) => {
      const product = products.find((p: Product) => p.id === id);
      cb(product);
    });
  }

  static fetchAll(cb: CallableFunction) {
    getProductsFromFile(cb);
  }
}
