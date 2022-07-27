import mongoose from "mongoose";

const requestSchema = new mongoose.Schema(
  {
    seller: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "seller",
      required: true,
    },
    consumer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "consumer",
      required: true,
    },
    isPending: {
      type: Boolean,
      default: true,
    },
    isAccept: {
      type: Boolean,
      default: false,
    },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "product",
    },
    description: {
      type: String,
      required: true,
    },
    msgBySeller: {
      type: String,
      default: "",
    },
    tag: {
      type: String,
      required: true,
    },
  },
  { timestamps: { createdAt: true, updatedAt: true } }
);

export default mongoose.model("request", requestSchema);
