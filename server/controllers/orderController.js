import Order from "../models/orderModel.js";

export const createOrder = async (req, res) => {
  try {
    const order = await Order.create({
      ...req.body,
      user: req.user._id,
    });
    const populatedOrder = await order.populate("user", "name email");
    res.status(201).json(populatedOrder);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const getOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate("user", "name email").sort({
      createdAt: -1,
    });
    console.log("ADMIN ORDERS:", orders);

    res.json(orders);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({
      user: req.user._id,
    }).sort({
      createdAt: -1,
    });

    res.json(orders);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        message: "Order not found",
      });
    }

    order.status = status;

    const updatedOrder = await order.save();

    const populatedOrder = await updatedOrder.populate("user", "name email");

    res.json(populatedOrder);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
