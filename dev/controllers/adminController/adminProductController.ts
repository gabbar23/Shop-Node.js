import { Request, Response } from "express";

import { Product } from "../../models/productModel";

export const getAddProduct = (_: Request, res: Response) => {
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
  product
    .save()
    .then(() => res.redirect("/product-list"))
    .catch((err) => {
      console.log(err);
    });
};

export const postEditProduct = (req: Request, res: Response) => {
  const title: string = req.body.title;
  const imageUrl: string = req.body.imageUrl;
  const price: number = +req.body.price;
  const description: string = req.body.description;
  const id = req.body.id;

  const product = new Product(title, imageUrl, description, price);
  product
    .saveEdited(+id)
    .then(() => res.redirect("/product-list"))
    .catch((err) => console.log(err));
};

export const getEditProduct = (req: Request, res: Response) => {
  const editMode = req.query.edit;
  console.log(editMode);
  if (!editMode) res.redirect("/");
  const productId = req.params.productId;
  Product.findById(productId).then((product) => {
    res.render("admin/edit-product", {
      pageTitle: "Edit Product",
      path: "/admin/edit-product",
      editing: editMode,
      product: product.rows[0],
    });
  });
};

export const postDeleteProduct = (req: Request, res: Response) => {
  const id = req.body.id;
  Product.delete(id)
    .then(() => res.redirect("product-list-admin"))
    .catch((err) => console.log(err));
};

export const productListAdmin = (_: Request, res: Response) => {
  Product.fetchAll()
    .then((prods) => {
      res.render("admin/product-list-admin", {
        prods: prods.rows,
        pageTitle: "Admin Products",
        path: "/admin/product-list-admin",
        hasProducts: prods.rows.length > 0,
        activeShop: true,
        productCSS: true,
      });
    })
    .catch((err) => console.log(err));
};
