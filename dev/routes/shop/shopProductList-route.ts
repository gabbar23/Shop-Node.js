import express from "express";
import * as shopController from "../../controllers/shopController/productController";

const router = express.Router();

router.get("/product-list", shopController.getProducts);

router.post("/cart", shopController.getCart);

router.get("/checkout", shopController.getCheckout);

router.get("/product-detail/:productId", shopController.getProductDetails);

router.get("/orders",shopController.getorders);

router.get("/", shopController.getIndex);

export const shopRoutes = router;
