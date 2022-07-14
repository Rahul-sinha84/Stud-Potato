import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    seller: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "seller",
      required: true,
    },
    warranty: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "warranty",
      required: true,
    },
    price: {
      type: String,
      required: true,
    },
    isSold: {
      type: Boolean,
      default: false,
    },
    consumer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "consumer",
    },
    dateOfPurchase: {
      type: Number,
    },
  },
  { timestamps: { createdAt: true, updatedAt: true } }
);

export default mongoose.model("product", productSchema);
