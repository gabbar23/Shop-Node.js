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
    price: number,
    id?: string
  ) {
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
    id ? (this.id = id) : (this.id = Math.random().toString());
  }

  save(id?: string) {
    const p = path.join(rootPath, "data", "products.json");
    getProductsFromFile((products: Product[]) => {
      if (id) {
        console.log("here");

        const existingProduct = products.findIndex((prod) => prod.id == id);
        const updatedProducts = [...products];
        updatedProducts[existingProduct] = this;

        fs.writeFile(p, JSON.stringify(updatedProducts), (err) => {
          console.log(err);
        });
      } else {
        products.push(this);
        fs.writeFile(p, JSON.stringify(products), (err) => {
          console.log(err);
        });
      }
    });
  }

  static findById(id: string, cb: CallableFunction) {
    getProductsFromFile((products: Product[]) => {
      const product = products.find((p: Product) => p.id === id);
      cb(product);
    });
  }

  static delete(id: string) {
    const p = path.join(rootPath, "data", "products.json");
    getProductsFromFile((products: Product[]) => {
      const updatedProducts = products.filter((p: Product) => +p.id !== +id);
      console.log(updatedProducts);

      fs.writeFile(p, JSON.stringify(updatedProducts), (err) => {
        console.log(err);
      });
    });
  }

  static fetchAll(cb: CallableFunction) {
    getProductsFromFile(cb);
  }
}
