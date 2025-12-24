import { FaSearch } from "react-icons/fa";
import { BiCartAlt } from "react-icons/bi";
import { useCart, useUI } from "../context";
import { useState } from "react";
import ConfirmModal from "./ConfirmModal";

const Header = ({
  now,
  query,
  setQuery,
  setIsCartOpen,
  totalItems,
  active,
  setActive,
  filterType,
  setFilterType,
}) => {
  const { orderType, setOrderType } = useUI();

  const { cart } = useCart();

  const [confirmState, setConfirmState] = useState({
    open: false,
    nextOrderType: null,
    nextFilterType: null,
  });

  return (
    <header className="sticky top-0 z-30 bg-slate-900 pb-3">
      {/* TOP ROW */}
      <div className="flex flex-col sm:flex-row justify-between p-2 mb-4 gap-3">
        <div>
          <h1 className="text-2xl font-semibold hidden sm:block">
            Chef Kitchen
          </h1>

          <p className="text-sm text-gray-400 hidden sm:block">
            {now.toLocaleDateString("en-US", {
              weekday: "long",
              day: "numeric",
              month: "long",
              year: "numeric",
            })}{" "}
            •{" "}
            {now.toLocaleTimeString("en-US", {
              hour: "2-digit",
              minute: "2-digit",
              second: "2-digit",
            })}
          </p>
        </div>

        {/* SEARCH + CART */}
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <div className="relative w-full sm:w-[240px] md:w-[280px]">
            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />

            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search for food, coffee, etc..."
              className="
                w-full rounded-md py-2 pl-11 pr-4 text-sm
                text-gray-200 placeholder:text-gray-500
                bg-gradient-to-r from-[#1f2430] to-[#1b1f2a]
                border border-white/10
                focus:outline-none focus:ring-1 focus:ring-orange-500/50
                shadow-inner
              "
            />
          </div>

          <button
            onClick={() => setIsCartOpen(true)}
            className="relative bg-[#232936] p-2 rounded"
          >
            <BiCartAlt size={22} color="orange" />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 bg-orange-500 w-5 h-5 rounded-full text-xs flex items-center justify-center text-black font-semibold">
                {totalItems}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* CATEGORY TABS */}
      <div className="flex flex-col gap-3">
        <div
          className="
            relative flex gap-6
            overflow-x-auto no-scrollbar
            sm:flex-wrap sm:overflow-visible
            border-b border-[#393C49]
            px-2 whitespace-nowrap
          "
        >
          {["All", "Today Special", "Our Specials", "South Indian Special"].map(
            (label, i) => (
              <button
                key={label}
                onClick={() => setActive(i)}
                className={`
                relative pb-3 text-sm font-medium
                transition-colors duration-300
                ${
                  active === i
                    ? "text-orange-500"
                    : "text-gray-300 hover:text-white"
                }

                after:content-['']
                after:absolute after:left-0 after:-bottom-[2px]
                after:h-[3px] after:w-full after:rounded-full
                after:bg-orange-500
                after:transition-transform after:duration-300 after:ease-out
                ${active === i ? "after:scale-x-100" : "after:scale-x-0"}
                after:origin-left
              `}
              >
                {label}
              </button>
            )
          )}
        </div>

        {/* ORDER TYPE */}
        <div className="flex items-center justify-between font-medium gap-3 text-base text-gray-200 py-2 px-4">
          <span className="text-lg">Choose Dishes</span>

          <select
            value={filterType}
            onChange={(e) => {
              const value = e.target.value;

              const nextOrderType =
                value === "takeaway"
                  ? "Takeaway"
                  : value === "delivery"
                  ? "Delivery"
                  : "Dine In";

              const skipConfirm =
                localStorage.getItem("skipOrderTypeConfirm") === "true";

              if (
                cart.length > 0 &&
                nextOrderType !== orderType &&
                !skipConfirm
              ) {
                setConfirmState({
                  open: true,
                  nextOrderType,
                  nextFilterType: value,
                });
                return;
              }

              setFilterType(value);
              setOrderType(nextOrderType);
            }}
            className="bg-slate-950 text-gray-300 border border-[#393C49] rounded px-2 py-1"
          >
            <option value="dine-in">Dine In</option>
            <option value="takeaway">Takeaway</option>
            <option value="delivery">Delivery</option>
          </select>
        </div>
      </div>

      <ConfirmModal
        open={confirmState.open}
        title="Change Order Type?"
        message="You already have items in your cart. Changing the order type may affect how these items are processed."
        showDontAskAgain
        onCancel={() => setConfirmState({ open: false, nextOrderType: null })}
        onConfirm={() => {
          setFilterType(confirmState.nextFilterType);
          setOrderType(confirmState.nextOrderType);
          setConfirmState({ open: false, nextOrderType: null });
        }}
      />
    </header>
  );
};

export default Header;
