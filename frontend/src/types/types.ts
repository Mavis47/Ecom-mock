export interface Product {
    _id: number;
    name: string;
    price: number;
}

export interface Product {
  _id: number;
  id: number;
  name: string;
  price: number;
  __v: number;
}

export interface CartItems {
  _id: number;
  productId: Product;
  qty: number;
  __v: number;
}

export interface CartResponse {
  cartItems: CartItems[];
  total: number;
}
