import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { DISHES } from "../CONSTANTS";

const CartContext = createContext(null);

export function CartProvider({ children }) {
  // const [cart, setCart] = useState([]);

  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem("cart");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem("cart");
  };

  const addToCart = (dish, orderType) => {
    setCart((prev) => {
      const existing = prev.find(
        (i) => i.id === dish.id && i.size === dish.size
      );

      const available = stock?.[dish.id]?.[dish.size] ?? 0;

      if (available <= 0) return prev; // ⛔ no stock

      if (existing) {
        if (existing.quantity >= available) return prev; // ⛔ limit reached

        return prev.map((i) =>
          i.id === dish.id && i.size === dish.size
            ? { ...i, quantity: i.quantity + 1 }
            : i
        );
      }

      const price = Number(dish.prices?.[dish.size]);

      if (Number.isNaN(price)) {
        console.error("Invalid price for dish:", dish);
        return prev; // hard stop — prevents corrupt cart
      }

      return [
        ...prev,
        {
          id: dish.id,
          title: dish.title,
          img: dish.img,
          size: dish.size,
          quantity: 1,
          price, // ✅ CRITICAL LINE
          note: "",
          orderType,
        },
      ];
    });
  };

  const removeFromCart = (id, size) => {
    setCart((prev) => prev.filter((i) => !(i.id === id && i.size === size)));
  };

  const increaseQty = (id, size) => {
    setCart((prev) =>
      prev.map((i) => {
        if (i.id === id && i.size === size) {
          const available = stock?.[id]?.[size] ?? 0;
          if (i.quantity >= available) return i; // ⛔ stop
          return { ...i, quantity: i.quantity + 1 };
        }
        return i;
      })
    );
  };

  const decreaseQty = (id, size) => {
    setCart((prev) =>
      prev.map((i) => {
        if (i.id === id && i.size === size) {
          return i.quantity > 1 ? { ...i, quantity: i.quantity - 1 } : i; // ⛔ do nothing if quantity is 1
        }
        return i;
      })
    );
  };

  const updateNote = (id, size, note) => {
    setCart((prev) =>
      prev.map((i) => (i.id === id && i.size === size ? { ...i, note } : i))
    );
  };

  const totalItems = useMemo(
    () => cart.reduce((sum, item) => sum + item.quantity, 0),
    [cart]
  );

  const [stock, setStock] = useState(() =>
    Object.fromEntries(DISHES.map((dish) => [dish.id, { ...dish.bowls }]))
  );

  const placeOrder = (items, orderType) => {
    setStock((prev) => {
      const next = structuredClone(prev);

      items.forEach((item) => {
        if (next[item.id]?.[item.size] != null) {
          next[item.id][item.size] -= item.quantity;
        }
      });

      return next;
    });

    // remove only ordered items
    setCart((prev) => prev.filter((item) => item.orderType !== orderType));
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        stock,
        // subtotal,
        totalItems,
        addToCart,
        removeFromCart,
        increaseQty,
        decreaseQty,
        updateNote,
        clearCart,
        placeOrder,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error("useCart must be used inside CartProvider");
  }
  return ctx;
}
