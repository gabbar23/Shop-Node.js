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


export class User {
    name:string;
    email:string;

    constructor(name: string,email: string){
        this.name=name;
        this.email=email;
    }
    saveUser(){
        const db=getDb();
        return db.collection("users").insertOne(this);
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