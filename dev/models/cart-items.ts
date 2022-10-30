import { sequelize } from "../util/database";
import {  DataTypes } from "sequelize";



const CartItem=sequelize.define('cartItem', {
    id:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true,
        allowNull:false,
       
    },
    quantity:{
        type:DataTypes.INTEGER
    }
})

export {CartItem}