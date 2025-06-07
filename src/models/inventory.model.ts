import mongoose from "mongoose";

const inventorySchema = new mongoose.Schema(
  {
    product_id: {
      type: mongoose.Schema.Types.ObjectId,
      refPath: "Stuff", // Reference to either Pizza or Stuff model
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: 0,
    },
    capacity: {
      type: Number,
      required: true,
      min: 0,
    },
  },
  {
    timestamps: true,
    versionKey: false,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const Inventory = mongoose.model("Inventory", inventorySchema);

export default Inventory;
