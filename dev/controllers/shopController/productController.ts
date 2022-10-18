import { Request, Response } from "express";

import { Product } from "../../models/productModel";

export const getProducts = (_: Request, res: Response) => {
  // res.sendFile(path.join(rootDir, "..", "views", "shop.html"));
  Product.fetchAll((products: []) => {
    res.render("shop/product-list", {
      prods: products,
      pageTitle: "Products",
      path: "shop/product-list",
      hasProducts: products.length > 0,
      activeShop: true,
      productCSS: true,
    });
  });
};

export const getCart = (_: Request, res: Response) => {
  // res.sendFile(path.join(rootDir, "..", "views", "shop.html"));
  console.log(_.body);

  res.render("shop/cart", {
    pageTitle: "Cart",
    path: "shop/cart",
    activeShop: true,
    productCSS: true,
  });
};

export const getorders = (_: Request, res: Response) => {
  // res.sendFile(path.join(rootDir, "..", "views", "shop.html"));

  res.render("shop/orders", {
    pageTitle: "Your Orders",
    path: "shop/orders",
    activeShop: true,
    productCSS: true,
  });
};

export const getCheckout = (_: Request, res: Response) => {
  // res.sendFile(path.join(rootDir, "..", "views", "shop.html"));

  res.render("shop/checkout", {
    pageTitle: "Checkout",
    path: "shop/cart",
    activeShop: true,
    productCSS: true,
  });
};

export const getIndex = (_: Request, res: Response) => {
  // res.sendFile(path.join(rootDir, "..", "views", "shop.html"));

  res.render("shop/index", {
    pageTitle: "Shop",
    path: "shop/index",
    activeShop: true,
    productCSS: true,
  });
};

export const getProductDetails = (req: Request, res: Response) => {
  const productId = req.params.id;
  Product.findById(productId, (product: any) => {
    console.log(product);

    res.render("shop/product-detail", {
      product: product,
      pageTitle: "Product Details",
      path: "shop/product-details",
    });
  });
};
exports.getProductDetails = (req: Request, res: Response) => {
  const prodId = req.params.productId;
  Product.findById(prodId, (product: Product) => {
    res.render("shop/product-detail", {
      product: product,
      pageTitle: product.title,
      path: "/products",
    });
  });
};

// res.sendFile(path.join(rootDir, "..", "views", "shop.html"));

// res.render("shop/product-detail", {
//   pageTitle: "Product Details",
//   path: "shop/product-details",
//   activeShop: true,
//   productCSS: true,
