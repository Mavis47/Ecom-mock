import type{Request,Response} from 'express';
import { Product } from '../models/product.model.ts';

export const createMockProducts = async(req:Request,res:Response)=>{
   try {
    const mockProducts = [
      { id: 1, name: "Wireless Mouse", price: 499 },
      { id: 2, name: "Bluetooth Keyboard", price: 899 },
      { id: 3, name: "Gaming Headset", price: 1299 },
      { id: 4, name: "USB-C Cable", price: 299 },
      { id: 5, name: "Portable SSD", price: 2999 },
      { id: 6, name: "Laptop Stand", price: 799 },
      { id: 7, name: "Webcam HD", price: 999 },
      { id: 8, name: "Phone Tripod", price: 699 },
      { id: 9, name: "Smartwatch", price: 3499 },
      { id: 10, name: "Desk Lamp", price: 599 },
    ];
     const result = await Product.insertMany(mockProducts);
     res.status(201).json({message:"Mock products created successfully",data:result});
   } catch (error) {
    console.error("Error creating mock products:", error);
   }
}

export const getProducts = async(req:Request,res:Response)=>{
    try {
        const products = await Product.find();
        res.status(200).json({data:products});
    } catch (error) {
        res.status(500).json({message:"Error fetching products",error});
    }
}

export const deleteMockProducts = async(req:Request,res:Response)=>{
   try {
     await Product.deleteMany({});
     res.status(201).json({message:"Mock products delete successfully"});
   } catch (error) {
    console.error("Error creating mock products:", error);
   }
}
