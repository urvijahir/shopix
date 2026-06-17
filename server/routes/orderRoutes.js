import express from "express";

import {
  createOrder,
  getOrders,
  updateOrderStatus,
} from "../controllers/orderController.js";

const router = express.Router();

router.route("/").post(createOrder).get(getOrders);

router.put("/:id/status", updateOrderStatus);

export default router;
