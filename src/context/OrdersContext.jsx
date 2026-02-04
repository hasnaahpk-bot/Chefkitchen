import { createContext, useContext, useEffect, useState } from "react";

const OrdersContext = createContext(null);

export const OrdersProvider = ({ children }) => {

  const [orders, setOrders] = useState(() => {
    const saved = localStorage.getItem("orders");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("orders", JSON.stringify(orders));
  }, [orders]);

  const addOrder = order => {
  setOrders(prev => [
    ...prev,
    {
      id: Date.now(),
      createdAt: new Date().toISOString(),
      status: "Pending",
      ...order
    }
  ]);
};


  return (
    <OrdersContext.Provider value={{ orders, addOrder }}>
      {children}
    </OrdersContext.Provider>
  );
};

export const useOrders = () => {
  const ctx = useContext(OrdersContext);
  if (!ctx) throw new Error("useOrders must be used inside OrdersProvider");
  return ctx;
};
