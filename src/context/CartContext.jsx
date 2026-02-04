// import { createContext, useContext, useEffect, useMemo, useState } from "react";
// import { useProducts } from "./ProductsContext";

// const CartContext = createContext(null);

// export function CartProvider({ children }) {

//   const { items } = useProducts();

//   const [cart, setCart] = useState(() => {
//     try {
//       const saved = localStorage.getItem("cart");
//       return saved ? JSON.parse(saved) : [];
//     } catch {
//       return [];
//     }
//   });

//   useEffect(() => {
//     localStorage.setItem("cart", JSON.stringify(cart));
//   }, [cart]);

//   const [stock, setStock] = useState({});

//   useEffect(() => {
//     const map = {};
//     items.forEach(d => {
//       map[d.id] = { ...d.bowls };
//     });
//     setStock(map);
//   }, [items]);

//   const addToCart = (dish, orderType) => {

//     setCart(prev => {

//       const existing = prev.find(
//         i => i.id === dish.id && i.size === dish.size
//       );

//       const available =
//         stock?.[dish.id]?.[dish.size] ??
//         dish.bowls?.[dish.size] ??
//         0;

//       if (available <= 0) return prev;

//       if (existing) {

//         if (existing.quantity >= available) return prev;

//         return prev.map(i =>
//           i.id === dish.id && i.size === dish.size
//             ? { ...i, quantity: i.quantity + 1 }
//             : i
//         );
//       }

//       const price = Number(dish.prices[dish.size]);

//       return [
//         ...prev,
//         {
//           id: dish.id,
//           title: dish.title,
//           img: dish.img,
//           size: dish.size,
//           quantity: 1,
//           price,
//           note: "",
//           orderType
//         }
//       ];
//     });
//   };

//   const removeFromCart = (id, size) =>
//     setCart(p => p.filter(i => !(i.id === id && i.size === size)));

//   const increaseQty = (id, size) =>
//     setCart(p =>
//       p.map(i => {
//         if (i.id === id && i.size === size) {
//           const available = stock?.[id]?.[size] ?? 0;
//           if (i.quantity >= available) return i;
//           return { ...i, quantity: i.quantity + 1 };
//         }
//         return i;
//       })
//     );

//   const decreaseQty = (id, size) =>
//     setCart(p =>
//       p.map(i =>
//         i.id === id && i.size === size && i.quantity > 1
//           ? { ...i, quantity: i.quantity - 1 }
//           : i
//       )
//     );

//   const clearCart = () => setCart([]);

//   const placeOrder = (itemsToOrder, orderType) => {

//     setStock(prev => {

//       const next = structuredClone(prev);

//       itemsToOrder.forEach(item => {
//         if (next[item.id]?.[item.size] != null) {
//           next[item.id][item.size] -= item.quantity;
//         }
//       });

//       return next;
//     });

//     setCart(prev => prev.filter(i => i.orderType !== orderType));
//   };

//   const totalItems = useMemo(
//     () => cart.reduce((s, i) => s + i.quantity, 0),
//     [cart]
//   );

//   return (
//     <CartContext.Provider value={{
//       cart,
//       stock,
//       totalItems,
//       addToCart,
//       removeFromCart,
//       increaseQty,
//       decreaseQty,
//       clearCart,
//       placeOrder
//     }}>
//       {children}
//     </CartContext.Provider>
//   );
// }

// export const useCart = () => {
//   const ctx = useContext(CartContext);
//   if (!ctx) throw new Error("useCart must be inside CartProvider");
//   return ctx;
// };



import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useProducts } from "./ProductsContext";

const CartContext = createContext(null);

export function CartProvider({ children }) {

  const { items, updateStock } = useProducts();

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

  // 📦 Get REAL stock from dashboard
  const getAvailableStock = (id, size) => {
    const dish = items.find(d => d.id === id);
    return Number(dish?.bowls?.[size] || 0);
  };

  /* ADD */

  const addToCart = (dish, orderType) => {

    setCart(prev => {

      const existing = prev.find(
        i => i.id === dish.id && i.size === dish.size
      );

      const available = getAvailableStock(dish.id, dish.size);

      if (available <= 0) return prev;

      if (existing) {

        if (existing.quantity >= available) return prev;

        return prev.map(i =>
          i.id === dish.id && i.size === dish.size
            ? { ...i, quantity: i.quantity + 1 }
            : i
        );
      }

      return [
        ...prev,
        {
          id: dish.id,
          title: dish.title,
          img: dish.img,
          size: dish.size,
          quantity: 1,
          price: Number(dish.prices[dish.size]),
          note: "",
          orderType
        }
      ];
    });
  };

  /* QTY */

  const increaseQty = (id, size) =>
    setCart(p =>
      p.map(i => {

        if (i.id === id && i.size === size) {

          const available = getAvailableStock(id, size);

          if (i.quantity >= available) return i;

          return { ...i, quantity: i.quantity + 1 };
        }

        return i;
      })
    );

  const decreaseQty = (id, size) =>
    setCart(p =>
      p.map(i =>
        i.id === id && i.size === size && i.quantity > 1
          ? { ...i, quantity: i.quantity - 1 }
          : i
      )
    );

  const removeFromCart = (id, size) =>
    setCart(p => p.filter(i => !(i.id === id && i.size === size)));

  const clearCart = () => setCart([]);

  /* PLACE ORDER */

  const placeOrder = (itemsToOrder, orderType) => {

    updateStock(itemsToOrder); // ✅ reduce dashboard stock

    setCart(prev =>
      prev.filter(i => i.orderType !== orderType)
    );
  };

  const totalItems = useMemo(
    () => cart.reduce((s, i) => s + i.quantity, 0),
    [cart]
  );

  return (
    <CartContext.Provider value={{
      cart,
      totalItems,
      addToCart,
      increaseQty,
      decreaseQty,
      removeFromCart,
      clearCart,
      placeOrder
    }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be inside CartProvider");
  return ctx;
};
