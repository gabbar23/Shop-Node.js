import express from "express";

import bodyParser from "body-parser";
import path from "path";
import rootDir from "./util/path";

import * as adminRoutes from "./routes/adminRoutes/adminProducts-route";
import * as shopRoutes from "./routes/shop/shopProductList-route";
import * as routes404 from "./routes/404";

const app = express();
app.set("view engine", "ejs");
app.set("views", "views");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(rootDir, "..", "public")));

app.use("/admin", adminRoutes.adminRoutes);
app.use(shopRoutes.shopRoutes);

app.use(routes404.router404);
app.listen(3000);
