import { Request, Response } from "express";
import { Product } from "../../models/productModel";

export const getProducts = (_: Request, res: Response) => {
  Product.fetchAllProducts()
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

  // Product.findAll()
  //   .then((products) => {
  //     res.render("shop/product-list", {
  //       prods: products,
  //       pageTitle: "Products",
  //       path: "shop/product-list",
  //       hasProducts: products.length > 0,
  //       activeShop: true,
  //       productCSS: true,
  //     });
  //   })
  //   .catch((err) => console.log(err));
};

export const getCart = (req: Request, _: Response) => {
  // res.sendFile(path.join(rootDir, "..", "views", "shop.html"));
  req.user.getCart().then((cart: any) => {
    console.log(cart);
  })

  //   cart
  //     .getProducts()
  //     .then((products: any) => {
  //       res.render("shop/cart", {
  //         pageTitle: "Cart",
  //         path: "shop/cart",
  //         activeShop: true,
  //         productCSS: true,
  //         products: products,
  //       });
  //     })
  //     .catch((err: any) => {
  //       res.redirect("/products");
  //       console.log(err);
  //     });
  // });
};

export const postCart = (req:Request, res:Response) => {
  const prodId = req.body.productId;
  console.log(prodId);
  Product.fetchSingleProduct(prodId.trim())
    .then((product: any) => {
  console.log(product.title+"post cart"+product.price);
  
      
      return req.user.addToCart(product);
    })
    .then((result: any) => {
      console.log(result);
      res.redirect('/cart');
    });
  }

// export const postCartDeleteProduct = (req:Request, res:Response) => {
//   const prodId = req.body.productId;
//   req.user
//     .getCart()
//     .then((cart: { getProducts: (arg0: { where: { id: any; }; }) => any; }) => {
//       return cart.getProducts({ where: { id: prodId } });
//     })
//     .then((products: any[]) => {
//       const product = products[0];
//       return product.cartItem.destroy();
//     })
//     .then((_: any) => {
//       res.redirect('/cart');
//     })
//     .catch((err: any) => console.log(err));
// };

// export const getorders = (_: Request, res: Response) => {
//   // res.sendFile(path.join(rootDir, "..", "views", "shop.html"));

//   res.render("shop/orders", {
//     pageTitle: "Your Orders",
//     path: "shop/orders",
//     activeShop: true,
//     productCSS: true,
//   });
// };

// export const postCreateOrder=(req:Request, res:Response) => {
//   let fetchedCart:any;
//   req.user
//     .getCart()
//     .then((cart:any )=> {
//       fetchedCart = cart;
//       return cart.getProducts();
//     })
//     .then((products:any) => {
//       return req.user
//         .createOrder()
//         .then((order:any) => {
//           return order.addProducts(
//             products.map((product:any) => {
//               console.log(product.OrderItem+"hiiiiiiiiiiiiiiiii");

//               product.OrderItem = { quantity: product.cartItem.quantity };
//               return product;
//             })
//           );
//         })
//         .catch((err: any) => console.log(err));
//     })
//     .then(() => {
//       return fetchedCart.setProducts(null);
//     })
//     .then(() => {
//       res.redirect('/orders');
//     })
//     .catch((err: any) => console.log(err));
// };

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

export const getProductDetails = (req: Request, res: Response) => {
  const productId = req.params.productId;

  Product.fetchSingleProduct(productId)
    .then((product: any) => {
      
      res.render("shop/product-detail", {
        product: product[0],
        pageTitle: "Product Details",
        path: "shop/product-details",
      });
    })
    .catch((error: Error) => console.log(error));
};
