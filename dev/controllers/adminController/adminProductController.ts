import { Request, Response } from "express";

import { Product } from "../../models/productModel";

export const getAddProduct = (_: Request, res: Response) => {
  // res.sendFile(path.join(rootDir, "..", "views", "add-product.html"));
  res.render("admin/edit-product", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
    editing: false,
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

export const postEditProduct = (req: Request, res: Response) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  const id = req.body.id;

  const product = new Product(title, imageUrl, description, price, id);
  product.save(id);

  // products.push({ title: req.body.title });
  res.redirect("/product-list");
};

export const getEditProduct = (req: Request, res: Response) => {
  const editMode = req.query.edit;
  console.log(editMode);
  if (!editMode) res.redirect("/");

  const prodId = req.params.productId;
  Product.findById(prodId, (product: Product) => {
    if (!product) res.redirect("/");

    res.render("admin/edit-product", {
      pageTitle: "Edit Product",
      path: "/admin/edit-product",
      editing: editMode,
      product: product,
    });
  });
};

export const postDeleteProduct = (req: Request, res: Response) => {
  const id = req.body.id;
  Product.delete(id);
  console.log(id);

  res.redirect("/");
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
