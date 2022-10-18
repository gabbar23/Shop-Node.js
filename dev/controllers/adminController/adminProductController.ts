import { Request, Response } from "express";

import { Product } from "../../models/productModel";

export const getAddProduct = (_: Request, res: Response) => {
  // res.sendFile(path.join(rootDir, "..", "views", "add-product.html"));
  res.render("admin/add-product", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
  });
};

export const postAddProduct = (req: Request, res: Response) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  const product = new Product(title, imageUrl, description, price);
  product.save();
  
  // products.push({ title: req.body.title });
  res.redirect("/product-list");
};

export const editProduct = (_: Request, res: Response) => {
  res.render("admin/edit-product", {
    pageTitle: "Edit Product",
    path: "/admin/edit-product",
  });
};

export const productListAdmin = (_: Request, res: Response) => {
  Product.fetchAll((products: []) => {
    res.render("admin/product-list-admin", {
      prods: products,
      pageTitle: "Admin Product List",
      path: "/admin/product-list-admin",
    });
  });
};
