import express from "express";

import bodyParser from "body-parser";
import path from "path";
import rootDir from "./util/path";

import { mongoConnect } from "./util/database";

import * as adminRoutes from "./routes/adminRoutes/adminProducts-route";
import * as shopRoutes from "./routes/shop/shopProductList-route";
import * as routes404 from "./routes/404";

const app = express();
app.set("view engine", "ejs");
app.set("views", "views");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(rootDir, "..", "public")));

app.use((_, _2, next) => {
  // User.findByPk(2)
  //   .then((user) => {
  //     req.user = user;
  //     next();
  //   })
  //   .catch((err) => console.log(err));
  next();
});

app.use("/admin", adminRoutes.adminRoutes);
app.use(shopRoutes.shopRoutes);

app.use(routes404.router404);

mongoConnect(() => {
  app.listen(3000);
});
