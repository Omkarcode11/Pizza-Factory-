import mongoose from "mongoose";
import { PaymentMode, PaymentStatus } from "../service/payment/types";

const paymentSchema = new mongoose.Schema(
  {
    order_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
      required: true,
    },
    payment_method: {
      type: String,
      enum: PaymentMode,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
      min: 0,
    },
    status: {
      type: String,
      enum: PaymentStatus,
      default: PaymentStatus.PENDING,
      required: true,
    },
    transaction_id: {
      type: String,
      unique: true,
      default: `TNX-${Date.now()}`
    },
    paid_at: {
      type: Date,
    },
    currency: {
      type: String,
      default: "INR",
    },
  },
  {
    timestamps: true,
    versionKey: false,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const Payment = mongoose.model("payment", paymentSchema);

export default Payment;
