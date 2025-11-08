import mongoose from "mongoose";

const cartItemSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: "Product",
    required: true,
  },
  qty: { type: Number, required: true },
});

export const CartItem = mongoose.model("CartItem", cartItemSchema);
