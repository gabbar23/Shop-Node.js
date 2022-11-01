import { ObjectId } from "mongodb";
import { getDb } from "../util/database";

export class Product {
  //   id: number;
  title: string;
  price: number;
  imageUrl: string;
  description: string;

  constructor(
    // id: number,
    title: string,
    price: number,
    imageUrl: string,
    description: string
  ) {
    // this.id = id;
    this.title = title;
    this.price = price;
    this.imageUrl = imageUrl;
    this.description = description;
  }

  save() {
    const db = getDb();
    return db
      .collection("products")
      .insertOne(this)
      .then((products: any) => console.log(products))
      .catch((error: any) => console.log(error));
  }

  static fetchAllProducts() {
    const db = getDb();
    return db
      .collection("products")
      .find()
      .toArray()
      .then((products: any) => {
        console.log(products);
        return products;
      })
      .catch((error: any) => console.log(error));
  }

  static fetchSingleProduct(id: string) {
    const db = getDb();
    return db
      .collection("products")
      .find({ _id: new ObjectId(id) })
      .toArray()
      .then((products: any) => {
        return products;
      })
      .catch((error: any) => console.log(error));
  }
}

// const Product = sequelize.define("product", {
//   id: {
//     type: DataTypes.INTEGER,
//     autoIncrement: true,
//     allowNull: false,
//     primaryKey: true,
//   },
//   title: {
//     type: DataTypes.STRING,
//     allowNull: false,
//   },
//   price: {
//     type: DataTypes.DOUBLE,
//     allowNull: false,
//   },
//   imageUrl: {
//     type: DataTypes.TEXT,
//     allowNull: false,
//   },
//   description: {
//     type: DataTypes.TEXT,
//     allowNull: true,
//   },
// });

// export {Product}
// import { client } from "../util/database";

// export class Product {
//   title: string;
//   imageUrl: string;
//   description: string;
//   price: number;

//   constructor(
//     title: string,
//     imageUrl: string,
//     description: string,
//     price: number
//   ) {
//     this.title = title;
//     this.imageUrl = imageUrl;
//     this.description = description;
//     this.price = price;
//   }

//   save() {
//     const query = {
//       text: `INSERT INTO public.products(
//          title, price, description, "imageUrl")
//         VALUES ($1, $2, $3, $4);`,
//       values: [this.title,this.price,this.description,this.imageUrl],
//     };
//     return client.query(query);
//   }

//   saveEdited(id:number){
//     const query = {
//       text: `UPDATE "products"
//       SET "title" = $1, "price" = $2 ,"description"=$3,"imageUrl"=$4
//       WHERE "id" = $5`,
//       values: [this.title,this.price,this.description,this.imageUrl,id],
//     };
//     return client.query(query);
//   }

//   static findById(id: string) {
//     const query = {
//       text: "SELECT * FROM products WHERE id=$1",
//       values: [id],
//     };
//     return client.query(query);
//   }

//   static delete(id: string) {
//     const query = {
//       text: `DELETE FROM "products" WHERE "id" = $1`,
//       values: [id],
//     };
//     return client.query(query);
//   }

//   static fetchAll() {
//     return client.query("SELECT * FROM products");
//   }
// }
