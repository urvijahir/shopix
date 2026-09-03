import mongoose from "mongoose";

const orderSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    orderItems: [
      {
        title: String,
        image: String,
        price: Number,
        quantity: Number,
      },
    ],

    shippingAddress: {
      fullName: String,
      address: String,
      city: String,
      postalCode: String,
      country: String,
    },

    totalPrice: {
      type: Number,
      required: true,
    },

    status: {
      type: String,
      enum: ["Pending", "Processing", "Shipped", "Delivered", "Cancelled"],
      default: "Pending",
    },

    paymentMethod: {
      type: String,
      required: true,
      default: "Cash on Delivery",
    },

    isPaid: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

const Order = mongoose.model("Order", orderSchema);

export default Order;
