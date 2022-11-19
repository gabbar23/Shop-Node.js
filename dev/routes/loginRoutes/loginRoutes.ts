import express from "express";
import * as loginController from "../../controllers/loginController/loginController";
const router = express.Router();

router.get("/login", loginController.getLogin);

export const loginRoutes = router;
