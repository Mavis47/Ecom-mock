import axios from "axios";
import { ShoppingCart } from "lucide-react";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [totalItems, setTotalItems] = useState(0);

  const getCartItems = async () => {
    try {
      const res = await axios.get("http://localhost:4000/api/cart/getAllCartItems");
      const items = res.data.cartItems || [];
      const totalCount = items.reduce((sum: number, item: any) => sum + item.qty, 0);
      setTotalItems(totalCount);
      localStorage.setItem("cartCount", totalCount.toString());
    } catch (error) {
      console.log("Error fetching cart items:", error);
    }
  };

  useEffect(() => {
    getCartItems();

    // Listen for cart updates from other components
    const handleCartUpdate = () => {
      const storedCount = localStorage.getItem("cartCount");
      setTotalItems(Number(storedCount) || 0);
    };

    window.addEventListener("cartUpdated", handleCartUpdate);
    return () => window.removeEventListener("cartUpdated", handleCartUpdate);
  }, []);

  return (
    <nav className="flex justify-between items-center w-full h-16 px-8 bg-gray-900 fixed top-0 left-0 z-50">
      <h1 className="text-white text-xl font-semibold">Nexora Fashion</h1>

      {/* Cart Icon with badge */}
      <div className="relative">
        <a href="/shopping-cart">
          <ShoppingCart size={30} className="text-white cursor-pointer" />
        </a>
        {totalItems > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
            {totalItems}
          </span>
        )}
      </div>
    </nav>
  );
}
