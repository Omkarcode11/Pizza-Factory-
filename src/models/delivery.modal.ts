import mongoose from "mongoose";

const deliverySchema = new mongoose.Schema(
  {
    order_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
    },
    delivery_agent_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    payment_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Payment"
    },
    delivery_at: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true, versionKey: false }
);

const Delivery = mongoose.model("delivery", deliverySchema);

export default Delivery;
