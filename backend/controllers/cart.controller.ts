import type { Request,Response } from 'express';
import { CartItem } from '../models/cart.model.js';
import { Product } from '../models/product.model.js';

export const addToCart = async(req: Request, res: Response) => {
   try {
      const {productId,qty} = req.body;

      const product  = await Product.findById(productId);
      if(!product){
         return res.status(404).json({ message: "Product not found" });
      }
      const existingCartItem = await CartItem.findOne({productId});
      if(existingCartItem){
        existingCartItem.qty += qty;
        await existingCartItem.save();
        return res.status(200).json({message:"Cart item updated",data:existingCartItem});
      }

      const newItem = await CartItem.create({productId,qty});
      res.status(201).json({message:"Item added to cart",data:newItem});
   } catch (error) {
      res.status(500).json({message:"Error adding to cart",error});
   }
}

export const getAllCartItems = async(req: Request, res: Response) => {
    try {
    const cartItems = await CartItem.find().populate("productId");
    console.log(cartItems);
    const total = cartItems.reduce(
      (sum, item) => sum + item.qty * (item.productId as any).price,
      0
    );
        res.json({ cartItems,total});
    } catch (error) {
    res.status(500).json({ message: "Error fetching cart", error });
  }
}

export const deleteCartItem = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const deletedItem = await CartItem.findByIdAndDelete(id);

    if (!deletedItem) {
      return res.status(404).json({ message: "Cart item not found" });
    }

    res.status(200).json({
      message: "Cart item deleted successfully",
      data: deletedItem,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error deleting cart item",
      error,
    });
  }
};