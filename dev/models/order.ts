import { sequelize } from "../util/database";
import {  DataTypes } from "sequelize";



const Order=sequelize.define('Order', {
    id:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true,
        allowNull:false,
       
    }
})

export {Order}