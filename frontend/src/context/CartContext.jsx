import { useEffect, useState } from "react";
import { CartContext } from "./cartContext";
import {
  addCartItem,
  readCart,
  removeCartItem,
  setCartItemQuantity,
} from "../lib/cart";

export const CartProvider = ({ children }) => {
  const [items, setItems] = useState(readCart);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(items));
  }, [items]);

  const addItem = (product) => setItems((current) => addCartItem(current, product));
  const removeItem = (id) => setItems((current) => removeCartItem(current, id));
  const updateQuantity = (id, quantity) =>
    setItems((current) => setCartItemQuantity(current, id, quantity));
  const clearCart = () => setItems([]);

  return (
    <CartContext.Provider
      value={{ items, addItem, removeItem, updateQuantity, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};
