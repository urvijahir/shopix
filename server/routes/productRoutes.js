import express, { Router } from "express";

import {
  getProducts,
  createProduct,
  deleteProduct,
  updateProduct,
  getProductById,
  createProductReview,
} from "../controllers/productController.js";

const router = express.Router();

router.route("/").get(getProducts).post(createProduct);

router
  .route("/:id")
  .get(getProductById)
  .put(updateProduct)
  .delete(deleteProduct);

router.post("/:id/reviews", createProductReview);

export default router;
