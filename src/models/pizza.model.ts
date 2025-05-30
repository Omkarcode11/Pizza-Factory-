import mongoose, { Types } from "mongoose";

const pizzaSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 100,
    },
    description: {
      type: String,
      trim: true,
      maxlength: 10000,
      minlength: 10,
      required: true,
    },
    img: {
      type: String,
      required: true,
      validate: {
        validator: (v) => {
          return /\.(jpeg|jpg|png|gif|webp|svg)$/.test(v);
        },
        message: (props) => `${props.value} is not a valid image URL!`,
      },
    },
    basePrise: {
      type: Number,
      required: true,
      min: 0,
    },
    stuffing: {
      type: [Types.ObjectId],
      ref: "Stuff",
      default: [],
    },
  },
  {
    timestamps: true,
    versionKey: false,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);
const Pizza = mongoose.model("Pizza", pizzaSchema);
export default Pizza;