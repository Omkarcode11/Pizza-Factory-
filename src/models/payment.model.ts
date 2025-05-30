import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema({
  order_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Order",
    require: true,
  },
  payment_method: {
    type: String,
    enum: ["CASH", "CARD", "ONLINE"],
    required: true,
  },
  amount: {
    type: Number,
    required: true,
    min: 0,
  },
  status: {
    type: String,
    enum: ["PENDING", "COMPLETED", "FAILED"],
    default: "PENDING",
    required: true,
  },
},{timestamps: true, versionKey: false, toJSON: { virtuals: true }, toObject: { virtuals: true }});
