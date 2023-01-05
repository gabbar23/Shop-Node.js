import express from "express";
import session from "express-session";
import { default as connectMongoDBSession } from "connect-mongodb-session";

import bodyParser from "body-parser";
import path from "path";
import rootDir from "./util/path";

import mongoose from "mongoose";

import * as adminRoutes from "./routes/adminRoutes/adminProducts-route";
import * as shopRoutes from "./routes/shop/shopProductList-route";
import * as loginRoutes from "./routes/loginRoutes/loginRoutes";
import * as routes404 from "./routes/404";

import User from "./models/user";

const MONGO_URI =
  "mongodb+srv://amansaini23:gabbar23@cluster0.trnrxlr.mongodb.net/?retryWrites=true&w=majority";
const MongoDBStore = connectMongoDBSession(session);
// import { User } from "./models/user";

const app = express();
const store = new MongoDBStore({ collection: "sessions", uri: MONGO_URI });

app.set("view engine", "ejs");
app.set("views", "views");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(rootDir, "..", "public")));
app.use(
  session({
    secret: "my secret",
    resave: false,
    saveUninitialized: false,
    store: store,
  })
);
app.use((req, _, next) => {
  User.findById("636de9e121a4cc3b7493ff98")
    .then((user: any) => {
      req.user = user;
      return next();
    })
    .catch((err: any) => console.log(err));
});

app.use("/admin", adminRoutes.adminRoutes);
app.use(shopRoutes.shopRoutes);
app.use(loginRoutes.loginRoutes);

app.use(routes404.router404);

// mongoConnect(() => {
//   // const user=new User("aman","aman@gmail.com");
//   // user.saveUser();
//   app.listen(3000);
// });
mongoose
  .connect(MONGO_URI)
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

//new assigns
