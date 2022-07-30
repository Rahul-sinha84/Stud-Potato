import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    imgSrc: {
      type: String,
      required: true,
    },
    serialNumber: {
      type: String,
      required: true,
    },
    modelNumber: {
      type: String,
      required: true,
    },
    description: {
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
    tokenId: {
      type: Number,
    },
    moneyWithdrawn: {
      type: Boolean,
      default: false,
    },
    isBurned: {
      type: Boolean,
      default: false,
    },
    transactionAddress: {
      type: String,
      default: "",
    },
  },
  { timestamps: { createdAt: true, updatedAt: true } }
);

export default mongoose.model("product", productSchema);
