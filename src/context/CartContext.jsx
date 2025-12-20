import { createContext, useContext, useMemo, useState } from "react";

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

const addToCart = (dish) => {
  setCart((prev) => {
    const existing = prev.find(
      (i) => i.id === dish.id && i.size === dish.size
    );

    if (existing) {
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
      },
    ];
  });
};


  const removeFromCart = (id, size) => {
  setCart((prev) =>
    prev.filter((i) => !(i.id === id && i.size === size))
  );
};


  const increaseQty = (id, size) => {
  setCart((prev) =>
    prev.map((i) =>
      i.id === id && i.size === size
        ? { ...i, quantity: i.quantity + 1 }
        : i
    )
  );
};

const decreaseQty = (id, size) => {
  setCart((prev) =>
    prev.map((i) => {
      if (i.id === id && i.size === size) {
        return i.quantity > 1
          ? { ...i, quantity: i.quantity - 1 }
          : i; // ⛔ do nothing if quantity is 1
      }
      return i;
    })
  );
};


  const updateNote = (id, size, note) => {
  setCart((prev) =>
    prev.map((i) =>
      i.id === id && i.size === size ? { ...i, note } : i
    )
  );
};


const clearCart = () => {
  setCart([]);
};


const totalItems = useMemo(
  () => cart.reduce((sum, item) => sum + item.quantity, 0),
  [cart]
);


  const subtotal = useMemo(
    () => cart.reduce((s, i) => s + i.price * i.quantity, 0),
    [cart]
  );

  return (
    <CartContext.Provider
      value={{
        cart,
        subtotal,
        totalItems,
        addToCart,
        removeFromCart,
        increaseQty,
        decreaseQty,
        updateNote,
        clearCart,
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
