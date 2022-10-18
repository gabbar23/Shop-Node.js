import express from "express";

import * as error404Controller from "../controllers/error404Controller";

const router = express.Router();
router.use(error404Controller.get404);

export const router404 = router;
