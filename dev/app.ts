import express from "express";
import { Request } from "express";

import bodyParser from "body-parser";
import path from "path";
import rootDir from "./util/path";

import { sequelize } from "./util/database";
import { Product } from "./models/productModel";
import { User } from "./models/user";
import { Order } from "./models/order";
import { OrderItem } from "./models/orderItem";


import * as adminRoutes from "./routes/adminRoutes/adminProducts-route";
import * as shopRoutes from "./routes/shop/shopProductList-route";
import * as routes404 from "./routes/404";
import { Cart } from "./models/cart";
import { CartItem } from "./models/cart-items";

const app = express();
app.set("view engine", "ejs");
app.set("views", "views");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(rootDir, "..", "public")));

app.use((req: Request, _, next) => {
  User.findByPk(2)
    .then((user) => {
      req.user = user;
      next();
    })
    .catch((err) => console.log(err));
});

app.use("/admin", adminRoutes.adminRoutes);
app.use(shopRoutes.shopRoutes);

app.use(routes404.router404);

Product.belongsTo(User, { constraints: true, onDelete: "CASCADE" });
User.hasMany(Product);
User.hasOne(Cart);
Cart.belongsTo(User);
Cart.belongsToMany(Product, { through: CartItem });
Product.belongsToMany(Cart, { through: CartItem });
Order.belongsTo(User);
User.hasMany(Order);
Order.belongsToMany(Product,{through:OrderItem});

sequelize
  // .sync({ force: true })
  .sync()

  .then((_) => {
    return User.findByPk(2);
    // console.log(result);
  })
  .then((user) => {
    if (!user) {
      return User.create({ username: "Aman", password: "123" });
    }
    return user;
  }).then((user:any)=>user.createCart())
  .then((_) => {
    // console.log(user);
    app.listen(3000);
  })
  .catch((err) => {
    console.log(err);
  });
