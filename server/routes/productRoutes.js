import express from "express";

import {
  getProducts,
  createProduct,
  deleteProduct,
  getProductById,
} from "../controllers/productController.js";

const router = express.Router();

router.route("/").get(getProducts).post(createProduct);

router.route("/:id").get(getProductById).delete(deleteProduct);

export default router;
