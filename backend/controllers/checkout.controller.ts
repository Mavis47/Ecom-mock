import { Request, Response } from "express";
import { CartItem } from "models/cart.model.js";
import { Product } from "models/product.model.js";

export const checkout = async (req: Request, res: Response) => {
  try {
    const { cartItems } = req.body;

    if (!cartItems || !Array.isArray(cartItems) || cartItems.length === 0) {
      return res.status(400).json({ message: "Cart items are required" });
    }

    let total = 0;

    // Calculate total from DB for data integrity
    for (const item of cartItems) {
      const product = await Product.findById(item.productId);
      if (!product) {
        return res.status(404).json({ message: `Product not found for id ${item.productId}` });
      }
      total += product.price * item.qty;
    }

    // Mock receipt
    const receipt = {
      total,
      timestamp: new Date().toISOString(),
      message: "Mock checkout successful — no real payments processed.",
    };

    // Optionally, clear the cart after checkout:
    await CartItem.deleteMany({});

    res.status(200).json({
      message: "Checkout complete",
      receipt,
    });
  } catch (error) {
    console.error("Error during checkout:", error);
    res.status(500).json({ message: "Error during checkout", error });
  }
};