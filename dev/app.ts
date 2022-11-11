import express from "express";

import bodyParser from "body-parser";
import path from "path";
import rootDir from "./util/path";

import mongoose from "mongoose";

import * as adminRoutes from "./routes/adminRoutes/adminProducts-route";
import * as shopRoutes from "./routes/shop/shopProductList-route";
import * as routes404 from "./routes/404";
import User from "./models/user";

// import { User } from "./models/user";

const app = express();
app.set("view engine", "ejs");
app.set("views", "views");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(rootDir, "..", "public")));

app.use((req, _, next) => {
  User.findById("636d3c73f372296cc0a26626")
    .then((user: any) => {
      req.user = user;
      return next();
    })
    .catch((err: any) => console.log(err));
});

app.use("/admin", adminRoutes.adminRoutes);
app.use(shopRoutes.shopRoutes);

app.use(routes404.router404);

// mongoConnect(() => {
//   // const user=new User("aman","aman@gmail.com");
//   // user.saveUser();
//   app.listen(3000);
// });
mongoose
  .connect(
    "mongodb+srv://amansaini23:gabbar23@cluster0.trnrxlr.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(() => {
    // const user = new User({
    //   name: "Aman",
    //   email: "amantest@email.com",
    //   cart: { items: [] },
    // });
    // user.save();
    app.listen(3000);
  })
  .catch((err: Error) => console.log(err));
