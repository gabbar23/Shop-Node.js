import express from "express";

import bodyParser from "body-parser";
import path from "path";
import rootDir from "./util/path";

import { mongoConnect } from "./util/database";
import * as adminRoutes from "./routes/adminRoutes/adminProducts-route";
import * as shopRoutes from "./routes/shop/shopProductList-route";
import * as routes404 from "./routes/404";
import { User } from "./models/user";

// import { User } from "./models/user";

const app = express();
app.set("view engine", "ejs");
app.set("views", "views");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(rootDir, "..", "public")));

app.use((req, _, next) => {
  User.fetchSingleUser('636638ab3ec69061e730bc30')
    .then((user: any) => {

    
      req.user = new User(user.name, user.email, user.cart, user._id);
      return next();
    })
    .catch((err: any) => console.log(err));
});

app.use("/admin", adminRoutes.adminRoutes);
app.use(shopRoutes.shopRoutes);


app.use(routes404.router404);

mongoConnect(() => {
  // const user=new User("aman","aman@gmail.com");
  // user.saveUser();
  app.listen(3000);
});
