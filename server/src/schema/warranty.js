import mongoose from "mongoose";

const warrantySchema = new mongoose.Schema(
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
    isInUse: {
      type: Boolean,
      default: false,
    },
    validity: {
      type: Number,
      required: true,
    },
    termsAndCondition: {
      type: String,
    },
    itemType: {
      type: String,
    },
  },
  { timestamps: { createdAt: true, updatedAt: true } }
);

export default mongoose.model("warranty", warrantySchema);
