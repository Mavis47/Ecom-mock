import {
  Card,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { Product } from "@/types/types";
import axios from "axios";
import { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { toast, ToastContainer } from "react-toastify";

export default function Mainpage() {
  const [products, setProducts] = useState<Product[]>([]);

  const getProducts = async () => {
    try {
      const res = await axios.get("http://localhost:4000/api/product/getProduct");
      if (res.data?.data) {
        setProducts(res.data.data);
      }
    } catch (error) {
      console.log("Error fetching products: ", error);
    }
  };

  const updateCartCount = async () => {
    try {
      const res = await axios.get("http://localhost:4000/api/cart/getAllCartItems");
      const items = res.data.cartItems || [];
      const totalCount = items.reduce((sum: number, item: any) => sum + item.qty, 0);
      localStorage.setItem("cartCount", totalCount.toString());

      // Custom event to notify Navbar instantly
      window.dispatchEvent(new Event("cartUpdated"));
    } catch (error) {
      console.log("Error updating cart count:", error);
    }
  };

  const addToCart = async (productId: string) => {
    try {
      await axios.post("http://localhost:4000/api/cart/addToCart", { productId, qty: 1 });
      toast.success("Product added to cart");
      await updateCartCount(); // ✅ Update immediately after adding
    } catch (error) {
      console.log("Error adding to cart", error);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <>
      <ToastContainer />
      <Navbar />
      <div className="bg-gray-900 w-full min-h-screen pt-20 px-10 py-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <Card
            key={product._id}
            className="w-full bg-white shadow-lg hover:scale-105 transition-transform duration-200"
          >
            <CardHeader>
              <CardTitle className="text-lg font-semibold">{product.name}</CardTitle>
            </CardHeader>
            <CardFooter className="flex justify-between">
              <button
                onClick={() => addToCart(product._id)}
                className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
              >
                Add to Cart
              </button>
              <p className="text-gray-700 font-semibold">₹{product.price}</p>
            </CardFooter>
          </Card>
        ))}
      </div>
    </>
  );
}
