import { useEffect, useMemo, useRef, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { BiCartAlt } from "react-icons/bi";

import { DISHES, LABELS } from "../CONSTANTS";
import { useCart, useUI } from "../context";
import Sidebar from "../components/Sidebar";
import DishCard from "../components/DishCard";
import OrdersPanel from "../components/OrdersPanel";
import Receipt from "../components/Recipt";
import Header from "../components/Header";

const Home = () => {
  // 🔹 CONTEXT
  const { cart, addToCart, totalItems } = useCart();
  const {
    isCartOpen,
    setIsCartOpen,
    showReceipt,
    setShowReceipt,
    orderType,
    setOrderType,
  } = useUI();

  // 🔹 PAGE-LOCAL STATE
  const [filterType, setFilterType] = useState("all");
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const [showToast, setShowToast] = useState(false);
  const [now, setNow] = useState(new Date());

  // 🔹 CLOCK
  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // 🔹 CATEGORY MAP
  const categoryMap = {
    0: "all",
    1: "today",
    2: "our",
    3: "south",
  };

  // 🔹 FILTERING (LOCAL LOGIC)
  const filteredDishes = useMemo(() => {
    return DISHES.filter((dish) => {
      const matchQuery =
        !query.trim() || dish.title.toLowerCase().includes(query.toLowerCase());

      const matchCategory =
        categoryMap[active] === "all"
          ? true
          : dish.category === categoryMap[active];

      const matchType = filterType === "all" ? true : dish.type === filterType;

      return matchQuery && matchCategory && matchType;
    });
  }, [query, active, filterType]);

  // 🔹 ADD TO CART (CONTEXT SAFE)
  const handleAdd = (dish) => {
    addToCart(dish);
    setIsCartOpen(true);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 1500);
  };

  const prevCartLength = useRef(cart.length);

  useEffect(() => {
    if (cart.length > prevCartLength.current) {
      setIsCartOpen(true);
    }
    prevCartLength.current = cart.length;
  }, [cart.length, setIsCartOpen]);

  return (
    <>
      {showToast && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-[1000]">
          <div className="bg-green-600 text-black px-4 py-2 rounded-md shadow-lg text-sm font-medium">
            Item added to cart!
          </div>
        </div>
      )}

      <div className="min-h-screen bg-black w-full flex justify-center">
        <div className="h-screen bg-slate-900 text-gray-200 max-w-[1600px] w-full overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-[70px_1fr_auto] gap-2 h-full">
            <div className="hidden lg:block">
              <Sidebar />
            </div>

            <main className="bg-slate-900 overflow-y-auto no-scrollbar tracking-wide">
              <Header
                now={now}
                query={query}
                setQuery={setQuery}
                setIsCartOpen={setIsCartOpen}
                totalItems={totalItems}
                active={active}
                setActive={setActive}
                orderType={orderType}
                setOrderType={setOrderType}
                filterType={filterType}
                setFilterType={setFilterType}
              />
              <section className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 md:grid-cols-3  gap-x-5 gap-y-12 py-12 px-4 sm:px-4 overflow-hidden">
                {filteredDishes.length === 0 ? (
                  <div className="fixed inset-0 flex items-center justify-center">
                    <p className="text-gray-400 text-sm sm:text-base">
                      {LABELS.NO_MATCH}
                    </p>
                  </div>
                ) : (
                  filteredDishes.map((d) => <DishCard key={d.id} dish={d} />)
                )}
              </section>
            </main>

            <div className="hidden lg:block">
              {isCartOpen && <OrdersPanel />}
            </div>
          </div>
        </div>
      </div>

      {showReceipt && <Receipt />}

      {/* MOBILE CART */}
      <div
        className={`
    fixed inset-0 z-[999] lg:hidden
    bg-black/50
    transition-opacity duration-300
    ${isCartOpen ? "opacity-100" : "opacity-0 pointer-events-none"}
  `}
        onClick={() => setIsCartOpen(false)}
      >
        <div
          className={`
      absolute top-0 right-0 h-full
      w-[85%] max-w-[380px]
      transition-transform duration-300 ease-out
      ${isCartOpen ? "translate-x-0" : "translate-x-full"}
    `}
          onClick={(e) => e.stopPropagation()}
        >
          <OrdersPanel />
        </div>
      </div>
    </>
  );
};

export default Home;
