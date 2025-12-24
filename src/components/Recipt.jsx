import { BiX } from "react-icons/bi";
import { useMemo } from "react";
import { useCart, useUI } from "../context";

const Receipt = () => {
  // 🔹 CONTEXT
  const { cart, placeOrder } = useCart();
  const { setShowReceipt, showReceipt } = useUI();

  const orderTime = useMemo(() => new Date(), []);

  // 🔹 SAFETY: nothing to show
  if (!showReceipt?.items?.length) return null;
  const { items, orderType } = showReceipt;

  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  // 🔹 DERIVED VALUES
  const discount = subtotal * 0.05;
  const total = subtotal - discount;

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center">
      <div className="bg-[#0f1720] text-gray-200 w-[90%] max-w-sm rounded-2xl p-5">
        {/* HEADER */}
        <div className="flex justify-between items-start mb-4">
          <div>
            <h2 className="text-lg font-semibold">Order Receipt</h2>
            <p className="text-xs text-gray-400 mt-1">
              {orderTime.toLocaleDateString()} •{" "}
              {orderTime.toLocaleTimeString()}
            </p>
          </div>

          <button
            onClick={() => {
              // placeOrder();
              setShowReceipt(false);
            }}
          >
            <BiX size={22} className="text-orange-500" />
          </button>
        </div>

        {/* ITEMS */}
        <div className="space-y-3 max-h-[45vh] overflow-auto">
          {items.map((it) => (
            <div key={`${it.id}-${it.size}`} className="text-sm space-y-1">
              <div className="flex justify-between">
                <span>
                  {it.title} ({it.size}) × {it.quantity}
                </span>
                <span>
                  {(Number(it.price) * Number(it.quantity)).toFixed(2)} AED
                </span>
              </div>

              {it.note?.trim() && (
                <p className="text-xs text-gray-400 pl-1">Note: {it.note}</p>
              )}
            </div>
          ))}
        </div>

        {/* TOTAL */}
        <div className="border-t border-gray-700 mt-4 pt-3 space-y-1 text-sm">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>{subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>Discount (5%)</span>
            <span>-{discount.toFixed(2)}</span>
          </div>
          <div className="flex justify-between font-semibold text-base">
            <span>Total</span>
            <span>{total.toFixed(2)} AED</span>
          </div>

          {/* ORDER TYPE */}
          {/* ORDER TYPE */}
          <div className="mt-3 text-sm flex justify-between">
            <span className="text-gray-400">Order Type</span>
            <span className="text-orange-400 font-medium">{orderType}</span>
          </div>
        </div>

        <button
          onClick={() => {
            // placeOrder();
            setShowReceipt(false);
          }}
          className="mt-4 w-full bg-orange-500 py-2.5 rounded-lg font-semibold"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default Receipt;
