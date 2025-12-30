// import { createContext, useContext, useState, useMemo } from "react";

// const WishlistContext = createContext(null);

// export const WishlistProvider = ({ children }) => {
//   const [wishlist, setWishlist] = useState([]);

//   const toggleWishlist = (dish) => {
//     setWishlist((prev) => {
//       const exists = prev.some((item) => item.id === dish.id);
//       return exists
//         ? prev.filter((item) => item.id !== dish.id)
//         : [...prev, dish];
//     });
//   };

//   const isWishlisted = (id) =>
//     wishlist.some((item) => item.id === id);

//   const value = useMemo(
//     () => ({ wishlist, toggleWishlist, isWishlisted }),
//     [wishlist]
//   );

//   return (
//     <WishlistContext.Provider value={value}>
//       {children}
//     </WishlistContext.Provider>
//   );
// };

// export const useWishlist = () => useContext(WishlistContext);


import { createContext, useContext, useEffect, useState } from "react";

const WishlistContext = createContext(null);

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState(() => {
    try {
      const stored = localStorage.getItem("wishlist");
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  // 🔒 Persist on every change
  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  const toggleWishlist = (dish) => {
    setWishlist((prev) => {
      const exists = prev.some((item) => item.id === dish.id);
      return exists
        ? prev.filter((item) => item.id !== dish.id)
        : [...prev, dish];
    });
  };

  const isWishlisted = (id) =>
    wishlist.some((item) => item.id === id);

  return (
    <WishlistContext.Provider
      value={{ wishlist, toggleWishlist, isWishlisted }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => useContext(WishlistContext);
