import express from "express";

import * as adminProductController from "../../controllers/adminController/adminProductController";

const router = express.Router();

router.get("/add-product", adminProductController.getAddProduct);

router.post("/add-product", adminProductController.postAddProduct);

router.get("/edit-product", adminProductController.editProduct);

router.get("/product-list-admin", adminProductController.productListAdmin);

export const adminRoutes = router;
