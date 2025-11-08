import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Trash } from "lucide-react";
import axios from "axios";
import type { CartItems } from "@/types/types";
import { toast, ToastContainer } from "react-toastify";

export default function ShoppingCart() {
  const [cartItems, setCartItems] = useState<CartItems[]>([]);
  const [loading, setLoading] = useState(false);
  const [receipt, setReceipt] = useState<any>(null);

  const getCartItems = async() => {
    try {
      const res = await axios.get("http://localhost:4000/api/cart/getAllCartItems");
      console.log("res",res.data.cartItems);
      setCartItems(res.data.cartItems);
    } catch (error) {
      console.log("Error fetching cart items:", error);
    }
  }

  useEffect(() => {
    getCartItems();
  },[]);

  const increaseQty = (id: number) => {
    setCartItems((items) =>
      items.map((item) =>
        item._id === id ? { ...item, qty: item.qty + 1 } : item
      )
    );
  };

  const decreaseQty = (id: number) => {
    setCartItems((items) =>
      items.map((item) =>
        item._id === id && item.qty > 1
          ? { ...item, qty: item.qty - 1 }
          : item
      )
    );
  };

  const removeItem = async(id: number) => {
    try {
      const res = await axios.delete(`http://localhost:4000/api/cart/${id}`);
      if(res.status === 200){
        setCartItems((items) => items.filter((item) => item._id !== id));
        toast.success("Item removed from cart");
      }
    } catch (error) {
      console.log("Error removing item from cart:", error);
    }
  };

   const handleCheckout = async () => {
    try {
      setLoading(true);
      const payload = {
        cartItems: cartItems.map((item) => ({
          productId: item.productId._id,
          qty: item.qty,
        })),
      };

      const res = await axios.post("http://localhost:4000/api/checkout", payload);
      console.log("Checkout Response:", res.data);

      setReceipt(res.data.receipt);
      toast.success("Checkout successful!");
      setCartItems([]); 
    } catch (error) {
      console.log("Error during checkout:", error);
      toast.error("Checkout failed!");
    } finally {
      setLoading(false);
    }
  };

  const total = cartItems.reduce(
    (acc, item) => acc + item.productId.price * item.qty,
    0
  );

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 p-6">
      <ToastContainer/>
      <Card className="w-full max-w-3xl shadow-md">
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-center">Shopping Cart</CardTitle>
        </CardHeader>
        <CardContent>
          {cartItems.length === 0 ? (
            <p className="text-center text-gray-500">Your cart is empty.</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Product</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Quantity</TableHead>
                  <TableHead>Total</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {cartItems.map((item) => (
                  <TableRow key={item._id}>
                    <TableCell>{item.productId.name}</TableCell>
                    <TableCell>₹{item.productId.price}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => decreaseQty(item._id)}
                        >
                          -
                        </Button>
                        <span>{item.qty}</span>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => increaseQty(item._id)}
                        >
                          +
                        </Button>
                      </div>
                    </TableCell>
                    <TableCell>₹{item.productId.price * item.qty}</TableCell>
                    <TableCell>
                      <Button
                        variant="destructive"
                        size="icon"
                        onClick={() => removeItem(item._id)}
                      >
                        <Trash size={60} className="text-black"/>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
        {cartItems.length > 0 && (
          <CardFooter className="flex justify-between items-center">
            <div className="text-lg font-semibold">Total: ₹{total}</div>
            <Button onClick={handleCheckout} disabled={loading}>
              {loading ? "Processing..." : "Checkout"}
            </Button>
          </CardFooter>
        )}

         {receipt && (
          <div className="p-4 text-center">
            <h3 className="font-bold text-lg">Checkout Receipt</h3>
            <p>Total: ₹{receipt.total}</p>
            <p>Time: {new Date(receipt.timestamp).toLocaleString()}</p>
            <p className="text-green-600">{receipt.message}</p>
          </div>
        )}
      </Card>
    </div>
  );
}
