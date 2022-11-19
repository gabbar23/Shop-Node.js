import { Response } from "express";

export const getLogin = (_: any, res: Response) => {
  res.render("auth/login", {
    // prods: products,
    pageTitle: "Login",
    path: "auth/login",
    // hasProducts: products.length > 0,
    activeShop: true,
    productCSS: true,
  });
};
