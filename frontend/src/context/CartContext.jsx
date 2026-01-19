import React, { createContext, useContext, useReducer, useEffect } from "react";
import { toast } from "react-toastify";

const CartContext = createContext();

//  Load cart from localStorage
const getInitialState = () => {
  try {
    const storedCart = localStorage.getItem("cart");
    return storedCart ? JSON.parse(storedCart) : { items: [], totalPrice: 0 };
  } catch {
    return { items: [], totalPrice: 0 };
  }
};

const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_CART": {
      const exists = state.items.find(
        (item) => item._id === action.payload._id
      );
      if (exists) {
        toast.warning("This item already is in Cart", {
          position: "top-center",
        });
        return state;
      }

      const newItems = [...state.items, action.payload];
      const totalPrice = newItems.reduce(
        (sum, item) => sum + Number(item.price),
        0
      );
      toast.success("Item Added to Cart", { position: "top-center" });
      return { items: newItems, totalPrice };
    }

    case "REMOVE_FROM_CART": {
      const newItems = state.items.filter(
        (item) => item._id !== action.payload
      );

      const totalPrice = newItems.reduce(
        (sum, item) => sum + Number(item.price),
        0
      );

      return { items: newItems, totalPrice };
    }

    case "CLEAR_CART":
      return { items: [], totalPrice: 0 };

    default:
      return state;
  }
};

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, {}, getInitialState);

  // 🔹 Persist cart on every change
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(state));
  }, [state]);

  const addToCart = (product) => {
    dispatch({ type: "ADD_TO_CART", payload: product });
  };

  const removeFromCart = (id) => {
    dispatch({ type: "REMOVE_FROM_CART", payload: id });
  };

  const clearCart = () => {
    dispatch({ type: "CLEAR_CART" });
  };

  return (
    <CartContext.Provider
      value={{
        cartItems: state.items,
        totalPrice: state.totalPrice,
        addToCart,
        removeFromCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useCart = () => useContext(CartContext);
