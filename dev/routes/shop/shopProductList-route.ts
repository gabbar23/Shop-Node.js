import express from "express";
import * as shopController from "../../controllers/shopController/productController";

const router = express.Router();

router.get("/product-list", shopController.getProducts);

// router.get("/cart", shopController.getCart);

// router.post("/cart", shopController.postCart);

// router.post("/cart-delete-item",shopController.postCartDeleteProduct)

// router.get("/checkout", shopController.getCheckout);

// router.get("/orders", shopController.getorders);

// router.post("/create-order",shopController.postCreateOrder)

router.get("/product-detail/:productId", shopController.getProductDetails);

router.get("/", shopController.getProducts);

export const shopRoutes = router;
