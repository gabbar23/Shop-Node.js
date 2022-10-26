import { client } from "../util/database";

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

  // save(id?: string) {

  // }

  // static findById(id: string) {

  // }

  // static delete(id: string) {

  // }

  static fetchAll() {
    return client.query("SELECT * FROM products");
  }
}
