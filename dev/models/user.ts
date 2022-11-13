import mongoose from "mongoose";

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  cart: {
    items: [
      {
        productId: {
          type: mongoose.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: { type: Number, required: true },
      },
    ],
  },
});

UserSchema.methods.addToCart = function (product: any) {
  if (!Boolean(this.cart?.hasOwnProperty("items"))) {
    this.cart = { items: [] };
  }
  const cartProductIndex = this.cart.items.findIndex((cp: any) => {
    return cp.productId.toString() === product._id.toString();
  });
  let newQuantity = 1;
  const updatedCartItems = [...this.cart.items];

  if (cartProductIndex >= 0) {
    newQuantity = this.cart.items[cartProductIndex].quantity + 1;
    updatedCartItems[cartProductIndex].quantity = newQuantity;
  } else {
    updatedCartItems.push({
      productId: product._id,
      quantity: newQuantity,
    });
  }
  const updatedCart = {
    items: updatedCartItems,
  };
  this.cart = updatedCart;
  return this.save();
};

UserSchema.methods.deleteCartProduct = function (id: string) {
  const updatedCart = this.cart.items.filter(
    (prod: any) => prod.productId.toString() != id
  );
  const updatedCartArray = [...updatedCart];
  this.cart.items = updatedCartArray;
  return this.save();
};

UserSchema.methods.addOrder;

export default mongoose.model("users", UserSchema);

// import {ObjectId} from "mongodb";

// import {
//     getDb
// } from "../util/database";

// // import { sequelize } from "../util/database";
// // import { DataTypes } from "sequelize";

// // const User = sequelize.define("user", {
// //   id: {
// //     type: DataTypes.INTEGER,
// //     autoIncrement: true,
// //     allowNull: false,
// //     primaryKey: true,
// //   },
// //   username: {
// //     type: DataTypes.STRING,
// //     allowNull: false,
// //   },
// //   password: {
// //     type: DataTypes.STRING,
// //     allowNull: false,
// //   },
// // });
// // export {User}

// interface carts{productId:ObjectId,quantity:number};
// export class User {
//     name:string;
//     email:string;
//     cart:{items:carts[]};
//     _id:any
//     constructor(name: string,email: string,cart:{items:carts[]},id:any){
//         this.name=name;
//         this.email=email;
//         this.cart=cart
//         this._id=id;
//     }
//     saveUser(){
//         const db=getDb();
//         return db.collection("users").insertOne(this);
//     }

//     addToCart(product:any){
//       if(!Boolean(this.cart?.hasOwnProperty('items'))){this.cart={items:[]};
//       }
//         const cartProductIndex = this.cart.items.findIndex(cp => {

//             return cp.productId.toString() === product._id.toString();
//           });
//           let newQuantity = 1;
//           const updatedCartItems = [...this.cart.items];

//           if (cartProductIndex >= 0) {
//             newQuantity = this.cart.items[cartProductIndex].quantity + 1;
//             updatedCartItems[cartProductIndex].quantity = newQuantity;
//           } else {
//             updatedCartItems.push({
//               productId: new ObjectId(product._id),
//               quantity: newQuantity
//             });
//           }
//           const updatedCart = {
//             items: updatedCartItems
//           };

//           const db = getDb();
//           return db
//             .collection('users')
//             .updateOne(
//               { _id: new ObjectId(this._id) },
//               { $set: { cart: updatedCart } }
//             );
//         }

//         getCart(){
//         const db = getDb();
//         const productIds=this.cart.items.map(i=>i.productId);

//            return db.collection('products').find({ _id: {$in:productIds}}).toArray().then((products: any)=>products.map((prod: any)=>{
//             return{...prod,
//               quantity:this.cart.items.find(i=>{
//                 return i.productId.toString()===prod._id.toString()
//               })?.quantity
//             }
//            }))
//         }

//         deleteCartProduct(id:string){
//           const updatedCart=this.cart.items.filter(prod=>prod.productId.toString()!=id);
//           const updatedCartArray=[...updatedCart]
//           const db = getDb();
//           return db
//             .collection('users')
//             .updateOne(
//               { _id: new ObjectId(this._id) },
//               { $set: { "cart.items": updatedCartArray } }
//             );

//         }

//         addOrder() {
//           const db = getDb();
//           return this.getCart()
//             .then((products: any) => {
//               const order = {
//                 items: products,
//                 user: {
//                   _id: new ObjectId(this._id),
//                   name: this.name
//                 }
//               };
//               return db.collection('orders').insertOne(order);
//             })
//             .then(() => {
//               this.cart = { items: [] };
//               return db
//                 .collection('users')
//                 .updateOne(
//                   { _id: new ObjectId(this._id) },
//                   { $set: { cart: { items: [] } } }
//                 );
//             });
//         }

//         getOrders() {
//           const db = getDb();
//           return db
//             .collection('orders')
//             .find({ 'user._id': new ObjectId(this._id) })
//             .toArray();
//         }

//     static fetchSingleUser(id: string) {
//         const db = getDb();
//         return db
//           .collection("users")
//           .findOne({
//             _id: new ObjectId(id)
//           })

//       }

// }
