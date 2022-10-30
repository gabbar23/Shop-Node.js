import { Request, Response } from "express";

import { Product } from "../../models/productModel";

export const getProducts = (_: Request, res: Response) => {
  Product.findAll()
    .then((products) => {
      res.render("shop/product-list", {
        prods: products,
        pageTitle: "Products",
        path: "shop/product-list",
        hasProducts: products.length > 0,
        activeShop: true,
        productCSS: true,
      });
    })
    .catch((err) => console.log(err));
};

export const getCart = (req: Request, res: Response) => {
  // res.sendFile(path.join(rootDir, "..", "views", "shop.html"));
  req.user.getCart().then((cart: any) => {
    cart
      .getProducts()
      .then((_: any) => { 
        res.render("shop/cart", {
          pageTitle: "Cart",
          path: "shop/cart",
          activeShop: true,
          productCSS: true,
        });
      })
      .catch((err: any) => console.log(err));
  });
};

export const postCart = (req: Request, res: Response) => {
  
  const prodId = req.body.productId;
  Product.findById(prodId, (product: Product) => {
    Cart.addProduct(prodId, product.price);
  });
  res.redirect("/cart");
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
  const productId = req.params.productId;

  Product.findByPk(productId)
    .then((product) => {
      res.render("shop/product-detail", {
        product: product,
        pageTitle: "Product Details",
        path: "shop/product-details",
      });
    })
    .catch((err) => console.log(err));
};
