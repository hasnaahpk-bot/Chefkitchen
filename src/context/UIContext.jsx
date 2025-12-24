import { createContext, useContext, useState } from "react";

const UIContext = createContext(null);

export function UIProvider({ children }) {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [showReceipt, setShowReceipt] = useState(false);
  const [orderType, setOrderType] = useState("Dine In");
  const [activeOrderPanelType, setActiveOrderPanelType] = useState("Dine In");

  return (
    <UIContext.Provider
      value={{
        isCartOpen,
        setIsCartOpen,
        showReceipt,
        setShowReceipt,
        orderType,
        setOrderType,
        activeOrderPanelType: orderType,
        setActiveOrderPanelType: setOrderType,
      }}
    >
      {children}
    </UIContext.Provider>
  );
}

export function useUI() {
  const ctx = useContext(UIContext);
  if (!ctx) {
    throw new Error("useUI must be used inside UIProvider");
  }
  return ctx;
}
