import mongoose from "mongoose";

const deliverySchema = new mongoose.Schema(
  {
    orderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
    },
    deliveryAgentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    paymentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Payment"
    },
    deliveryAt: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true, versionKey: false }
);

const Delivery = mongoose.model("delivery", deliverySchema);

export default Delivery;
