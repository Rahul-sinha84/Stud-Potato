import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    isSeller: {
      type: Boolean,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    storeAddress: {
      type: String,
      required: true,
    },
    nameOfStore: {
      type: String,
      required: true,
    },
  },
  { timestamps: { updatedAt: true, createdAt: true } }
);

export default mongoose.model("user", userSchema);
