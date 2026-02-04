// import { createContext, useContext, useEffect, useMemo, useState } from "react";

// const ProductsContext = createContext(null);
// const PER_PAGE = 5;

// export function ProductsProvider({ children }) {

//   const [items, setItems] = useState(() => {
//     try {
//       const saved = localStorage.getItem("dishes");
//       return saved ? JSON.parse(saved) : [];
//     } catch {
//       return [];
//     }
//   });

//   useEffect(() => {
//     localStorage.setItem("dishes", JSON.stringify(items));
//   }, [items]);

//   const [page, setPage] = useState(1);

//   const totalPages = Math.ceil(items.length / PER_PAGE);

//   const paginatedItems = useMemo(() => {
//     const start = (page - 1) * PER_PAGE;
//     return items.slice(start, start + PER_PAGE);
//   }, [items, page]);

//   const addDish = dish => setItems(p => [...p, dish]);

//   const updateDish = dish =>
//     setItems(p => p.map(d => d.id === dish.id ? dish : d));

//   const deleteDish = id =>
//     setItems(p => p.filter(d => d.id !== id));

//   return (
//     <ProductsContext.Provider value={{
//       items,
//       paginatedItems,
//       page,
//       setPage,
//       totalPages,
//       addDish,
//       updateDish,
//       deleteDish
//     }}>
//       {children}
//     </ProductsContext.Provider>
//   );
// }

// export const useProducts = () => {
//   const ctx = useContext(ProductsContext);
//   if (!ctx) throw new Error("useProducts must be inside ProductsProvider");
//   return ctx;
// };



import { createContext, useContext, useEffect, useMemo, useState } from "react";

const ProductsContext = createContext(null);
const PER_PAGE = 5;

export function ProductsProvider({ children }) {

  const [items, setItems] = useState(() => {
    try {
      const saved = localStorage.getItem("dishes");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("dishes", JSON.stringify(items));
  }, [items]);

  const [page, setPage] = useState(1);

  const totalPages = Math.ceil(items.length / PER_PAGE);

  const paginatedItems = useMemo(() => {
    const start = (page - 1) * PER_PAGE;
    return items.slice(start, start + PER_PAGE);
  }, [items, page]);

  const addDish = dish => setItems(p => [...p, dish]);

  const updateDish = dish =>
    setItems(p => p.map(d => d.id === dish.id ? dish : d));

  const deleteDish = id =>
    setItems(p => p.filter(d => d.id !== id));

  // ✅ ONLY REDUCE STOCK WHEN ORDER PLACED
  const updateStock = (itemsToOrder) => {

    setItems(prev =>
      prev.map(dish => {

        const ordered = itemsToOrder.filter(i => i.id === dish.id);

        if (!ordered.length) return dish;

        const updatedBowls = { ...dish.bowls };

        ordered.forEach(it => {
          updatedBowls[it.size] -= it.quantity;
        });

        return { ...dish, bowls: updatedBowls };
      })
    );
  };

  return (
    <ProductsContext.Provider value={{
      items,
      paginatedItems,
      page,
      setPage,
      totalPages,
      addDish,
      updateDish,
      deleteDish,
      updateStock
    }}>
      {children}
    </ProductsContext.Provider>
  );
}

export const useProducts = () => {
  const ctx = useContext(ProductsContext);
  if (!ctx) throw new Error("useProducts must be inside ProductsProvider");
  return ctx;
};
