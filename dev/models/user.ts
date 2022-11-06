import {ObjectId} from "mongodb";

import {
    getDb
} from "../util/database";

// import { sequelize } from "../util/database";
// import { DataTypes } from "sequelize";

// const User = sequelize.define("user", {
//   id: {
//     type: DataTypes.INTEGER,
//     autoIncrement: true,
//     allowNull: false,
//     primaryKey: true,
//   },
//   username: {
//     type: DataTypes.STRING,
//     allowNull: false,
//   },
//   password: {
//     type: DataTypes.STRING,
//     allowNull: false,
//   },
// });
// export {User}


interface cart{productId:ObjectId,quantity:number};
export class User {
    name:string;
    email:string;
    cart:{items:cart[]};
    _id:any
    constructor(name: string,email: string,cart:{items:cart[]},id:any){
        this.name=name;
        this.email=email;
        this.cart=cart
        this._id=id;
    }
    saveUser(){
        const db=getDb();
        return db.collection("users").insertOne(this);
    }


    addToCart(product:any){
        const cartProductIndex = this.cart.items.findIndex(cp => {
            return cp.productId.toString() === product._id.toString();
          });
          let newQuantity = 1;
          const updatedCartItems = [...this.cart.items];
      
          if (cartProductIndex >= 0) {
            newQuantity = this.cart.items[cartProductIndex].quantity + 1;
            updatedCartItems[cartProductIndex].quantity = newQuantity;
          } else {
            updatedCartItems.push({
              productId: new ObjectId(product._id),
              quantity: newQuantity
            });
          }
          const updatedCart = {
            items: updatedCartItems
          };
          const db = getDb();
          return db
            .collection('users')
            .updateOne(
              { _id: new ObjectId(this._id) },
              { $set: { cart: updatedCart } }
            );
        }
        
        getCart(){
        const db = getDb();
           db
            .collection('users').findOne({ _id: new ObjectId(this._id)}).then(prod=>{prod.cart.items.})
        }
    

    static fetchSingleUser(id: string) {
        const db = getDb();
        return db
          .collection("users")
          .findOne({
            _id: new ObjectId(id)
          })

      }

}