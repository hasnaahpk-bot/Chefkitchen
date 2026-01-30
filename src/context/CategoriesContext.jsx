import { createContext, useContext, useState, useEffect, useMemo } from "react";
import { useProducts } from "./ProductsContext";

const CategoriesContext = createContext();

export const CategoriesProvider = ({ children }) => {

  const { items } = useProducts();

  const [storedCategories, setStoredCategories] = useState(() => {
    const saved = localStorage.getItem("categories");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("categories", JSON.stringify(storedCategories));
  }, [storedCategories]);

  const categories = useMemo(() => {

    const map = {};

    items.forEach(prod => {

      if (!map[prod.category]) {
        map[prod.category] = {
          id: crypto.randomUUID(),
          name: prod.category,
          active: true,
          products: 0,
          stock: 0
        };
      }

      map[prod.category].products += 1;

      prod.sizes.forEach(s => {
        map[prod.category].stock += Number(prod.bowls[s] || 0);
      });
    });

    storedCategories.forEach(cat => {

      if (!map[cat.name]) {
        map[cat.name] = {
          ...cat,
          products: 0,
          stock: 0
        };
      } else {
        map[cat.name] = {
          ...map[cat.name],
          id: cat.id,
          active: cat.active
        };
      }
    });

    return Object.values(map);

  }, [items, storedCategories]);

  const addCategory = name => {

    if (storedCategories.some(
      c => c.name.toLowerCase() === name.toLowerCase()
    )) return;

    setStoredCategories(p => [
      ...p,
      { id: crypto.randomUUID(), name, active: true }
    ]);
  };

  const toggleCategory = id => {
    setStoredCategories(p =>
      p.map(c => c.id === id ? { ...c, active: !c.active } : c)
    );
  };

  const deleteCategory = id => {

    const cat = categories.find(c => c.id === id);

    if (cat?.products > 0) return alert("Category has products");

    setStoredCategories(p => p.filter(c => c.id !== id));
  };

  return (
    <CategoriesContext.Provider value={{
      categories,
      addCategory,
      toggleCategory,
      deleteCategory
    }}>
      {children}
    </CategoriesContext.Provider>
  );
};

export const useCategories = () => useContext(CategoriesContext);
