import { Request, Response } from "express";
import Product from "../../models/productModel";
import Order from "../../models/order";

export const getProducts = (_: Request, res: Response) => {
  Product.find()
    .then((products: string | any[]) => {
      res.render("shop/product-list", {
        prods: products,
        pageTitle: "Products",
        path: "shop/product-list",
        hasProducts: products.length > 0,
        activeShop: true,
        productCSS: true,
      });
    })
    .catch((err: any) => console.log(err));
};

export const getCart = (req: Request, res: Response) => {
  req.user
    .populate("cart.items.productId")
    // .execPopulate()
    .then((products: any) => {
      res.render("shop/cart", {
        pageTitle: "Cart",
        path: "shop/cart",
        activeShop: true,
        productCSS: true,
        products: products.cart.items,
      });
    })
    .catch((err: any) => {
      console.log(err);

      res.redirect("/products");
    });
};

export const postCart = (req: Request, res: Response) => {
  const prodId = req.body.productId;
  Product.findById(prodId.trim())
    .then((product: any) => {
      return req.user.addToCart(product);
    })
    .then(() => {
      res.redirect("/cart");
    });
};

export const postCartDeleteProduct = (req: Request, res: Response) => {
  const prodId = req.body.productId;

  req.user
    .deleteCartProduct(prodId)
    .then(() => res.redirect("/cart"))
    .catch((err: any) => console.log(err));
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

export const postCreateOrder = (req: Request, res: Response) => {
  req.user
    .populate("cart.items.productId")
    // .execPopulate()
    .then(async (prod: any) => {
      const products = prod.cart.items.map((prods: any) => {
        return { products: { ...prods.productId }, quantity: prods.quantity };
      });
      const order = new Order({
        user: {
          name: req.user.name,
          userId: req.user._id,
        },
        items: products,
      });
      try {
        await order.save();
        res.redirect("/orders");
      } catch (err) {
        return console.log(err);
      }
    });
};

// export const getCheckout = (_: Request, res: Response) => {
//   // res.sendFile(path.join(rootDir, "..", "views", "shop.html"));

//   res.render("shop/checkout", {
//     pageTitle: "Checkout",
//     path: "shop/cart",
//     activeShop: true,
//     productCSS: true,
//   });
// };

// export const getIndex = (_: Request, res: Response) => {
//   // res.sendFile(path.join(rootDir, "..", "views", "shop.html"));

//   res.render("shop/index", {
//     pageTitle: "Shop",
//     path: "shop/index",
//     activeShop: true,
//     productCSS: true,
//   });
// };

// export const postOrder = (req: Request, res: Response) => {
//   req.user
//     .addOrder()
//     .then(() => {
//       res.redirect("/orders");
//     })
//     .catch((err: Error) => console.log(err));
// };

export const getOrders = (req: Request, res: Response) => {
  Order.find({ "user.userId": req.user._id })
    .then((orders) => {
      res.render("shop/orders", {
        path: "/orders",
        pageTitle: "Your Orders",
        orders: orders,
      });
    })
    .catch((err) => console.log(err));
};

export const getProductDetails = (req: Request, res: Response) => {
  const productId = req.params.productId;

  Product.findById(productId)
    .then((product: any) => {
      res.render("shop/product-detail", {
        product: product,
        pageTitle: "Product Details",
        path: "shop/product-details",
      });
    })
    .catch((error: Error) => console.log(error));
};
