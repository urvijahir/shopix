import mongoose from "mongoose";

const orderSchema = mongoose.Schema(
  {
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
  },
  {
    timestamps: true,
  },
);

const Order = mongoose.model("Order", orderSchema);

export default Order;
