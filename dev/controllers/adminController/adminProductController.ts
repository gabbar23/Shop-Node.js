import { Request, Response } from "express";
import { Product } from "../../models/productModel";

export const getAddProduct = (_: Request, res: Response) => {
  res.render("admin/edit-product", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
    editing: false,
  });
};

export const postAddProduct = (req: Request, _: Response) => {
  const title = req.body.title;
  const price = req.body.price;
  const imageUrl = req.body.imageUrl;
  const description = req.body.description;
  const product = new Product(title, price, imageUrl, description);
  product.save().then((res: any) => console.log(res));
  // req.user
  //   .createProduct({
  //     title: title,
  //     price: price,
  //     imageUrl: imageUrl,
  //     description: description,
  //   })
  //   .then(() => {
  //     res.redirect("/product-list");
  //   });
};

// export const postEditProduct = (req: Request, res: Response) => {
//   const title: string = req.body.title;
//   const imageUrl: string = req.body.imageUrl;
//   const price: number = +req.body.price;
//   const description: string = req.body.description;
//   const id = req.body.id;
//   Product.update(
//     {
//       title: title,
//       imageUrl: imageUrl,
//       description: description,
//       price: price,
//     },
//     {
//       where: {
//         id: id,
//       },
//     }
//   )

//     .then(() => res.redirect("/product-list"))
//     .catch((err: any) => console.log(err));
// };

export const getEditProduct = (req: Request, res: Response) => {
  const editMode = req.query.edit;
  if (!editMode) res.redirect("/");
  const productId = req.params.productId;
  req.user.getProducts({ where: { id: productId } }).then((products: any) => {
    res.render("admin/edit-product", {
      pageTitle: "Edit Product",
      path: "/admin/edit-product",
      editing: editMode,
      product: products[0],
    });
  });
};

// export const postDeleteProduct = (req: Request, res: Response) => {
//   const id = req.body.id;
//   Product.destroy({
//     where: {
//       id: id,
//     },
//   })
//     .then(() => res.redirect("product-list-admin"))
//     .catch((err: any) => console.log(err));
// };

export const productListAdmin = (_: Request, res: Response) => {
  Product.fetchAllProducts()
    .then((products: string | any[]) => {
      res.render("admin/product-list-admin", {
        prods: products,
        pageTitle: "Admin Products",
        path: "/admin/product-list-admin",
        hasProducts: products.length > 0,
        activeShop: true,
        productCSS: true,
      });
    })
    .catch((err: any) => console.log(err));
};
