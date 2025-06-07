import mongoose from "mongoose";

const chefSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      unique: true,
      validate: {
        validator: function (v: string) {
          return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
        },
        message: (props) => `${props.value} is not a valid email!`,
      },
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    contact_number: {
      type: String,
      required: true,
      unique: true,
    },
    performance_score: {
      type: Number,
      default: 10,
      min: 5,
      max: 100,
    },
    order_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
      default: null, // Initially no order assigned
    },
    busy: {
      type: Boolean,
      default: false, // Initially not busy
    },
  },
  {
    timestamps: true, // Automatically manage createdAt and updatedAt fields
    versionKey: false, // Disable __v field
  }
);

const Chef = mongoose.model("Chef", chefSchema);

export default Chef;
