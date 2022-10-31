import { sequelize } from "../util/database";
import {  DataTypes } from "sequelize";



const OrderItem=sequelize.define('OrderItem', {
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

export {OrderItem}