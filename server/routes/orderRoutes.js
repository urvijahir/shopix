import express from "express";

import {
  createOrder,
  getOrders,
  getMyOrders,
  updateOrderStatus,
} from "../controllers/orderController.js";

import protect from "../middleware/authMiddleware.js";

const router = express.Router();

// User orders
router.post("/", protect, createOrder);
router.get("/my", protect, getMyOrders);

// Admin orders
router.get("/", getOrders);
router.put("/:id/status", updateOrderStatus);

export default router;
