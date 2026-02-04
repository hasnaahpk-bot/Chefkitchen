// import { BiX } from "react-icons/bi";
// import { useMemo } from "react";
// import { useCart, useUI } from "../context";

// const Receipt = () => {
//   // 🔹 CONTEXT
//   const { cart, placeOrder } = useCart();
//   const { setShowReceipt, showReceipt } = useUI();

//   const orderTime = useMemo(() => new Date(), []);

//   // 🔹 SAFETY: nothing to show
//   if (!showReceipt?.items?.length) return null;
//   const { items, orderType } = showReceipt;

//   const subtotal = items.reduce(
//     (sum, item) => sum + item.price * item.quantity,
//     0
//   );
//   // 🔹 DERIVED VALUES
//   const discount = subtotal * 0.05;
//   const total = subtotal - discount;

//   return (
//     <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center">
//       <div className="bg-[#0f1720] text-gray-200 w-[90%] max-w-sm rounded-2xl p-5">
//         {/* HEADER */}
//         <div className="flex justify-between items-start mb-4">
//           <div>
//             <h2 className="text-lg font-semibold">Order Receipt</h2>
//             <p className="text-xs text-gray-400 mt-1">
//               {orderTime.toLocaleDateString()} •{" "}
//               {orderTime.toLocaleTimeString()}
//             </p>
//           </div>

//           <button
//             onClick={() => {
//               // placeOrder();
//               setShowReceipt(false);
//             }}
//           >
//             <BiX size={22} className="text-orange-500" />
//           </button>
//         </div>

//         {/* ITEMS */}
//         <div className="space-y-3 max-h-[45vh] overflow-auto">
//           {items.map((it) => (
//             <div key={`${it.id}-${it.size}`} className="text-sm space-y-1">
//               <div className="flex justify-between">
//                 <span>
//                   {it.title} ({it.size}) × {it.quantity}
//                 </span>
//                 <span>
//                   {(Number(it.price) * Number(it.quantity)).toFixed(2)} AED
//                 </span>
//               </div>

//               {it.note?.trim() && (
//                 <p className="text-xs text-gray-400 pl-1">Note: {it.note}</p>
//               )}
//             </div>
//           ))}
//         </div>

//         {/* TOTAL */}
//         <div className="border-t border-gray-700 mt-4 pt-3 space-y-1 text-sm">
//           <div className="flex justify-between">
//             <span>Subtotal</span>
//             <span>{subtotal.toFixed(2)}</span>
//           </div>
//           <div className="flex justify-between">
//             <span>Discount (5%)</span>
//             <span>-{discount.toFixed(2)}</span>
//           </div>
//           <div className="flex justify-between font-semibold text-base">
//             <span>Total</span>
//             <span>{total.toFixed(2)} AED</span>
//           </div>

//           {/* ORDER TYPE */}
//           {/* ORDER TYPE */}
//           <div className="mt-3 text-sm flex justify-between">
//             <span className="text-gray-400">Order Type</span>
//             <span className="text-orange-400 font-medium">{orderType}</span>
//           </div>
//         </div>

//         <button
//           onClick={() => {
//             // placeOrder();
//             setShowReceipt(false);
//           }}
//           className="mt-4 w-full bg-orange-500 py-2.5 rounded-lg font-semibold"
//         >
//           Proceed To Payment
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Receipt;


import { BiX } from "react-icons/bi";
import { useMemo, useState } from "react";
import { useCart, useUI } from "../context";
import { FaCreditCard, FaPaypal, FaMoneyBillWave } from "react-icons/fa";
import { useOrders } from "../context/OrdersContext";


const Receipt = () => {

  const { cart, placeOrder } = useCart();
  const { setShowReceipt, showReceipt } = useUI();
const { addOrder } = useOrders();


  const [showPayment, setShowPayment] = useState(false);
  const [customerName, setCustomerName] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("card");

  const orderTime = useMemo(() => new Date(), []);

  if (!showReceipt?.items?.length) return null;

  const { items, orderType } = showReceipt;

  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const discount = subtotal * 0.05;
  const total = subtotal - discount;

  const handleConfirmPayment = () => {
    if (!customerName.trim()) {
      alert("Enter customer name");
      return;
    }

addOrder({
  customerName,
  paymentMethod,
  orderType,
  items,
  total,
});

placeOrder(items, orderType);
    setShowPayment(false);
    setShowReceipt(false);
  };

  return (
    <>
      {/* ================= RECEIPT MODAL ================= */}

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

            <button onClick={() => setShowReceipt(false)}>
              <BiX size={22} className="text-orange-500" />
            </button>
          </div>

          {/* ITEMS */}
          <div className="space-y-3 max-h-[45vh] overflow-auto">

            {items.map(it => (
              <div key={`${it.id}-${it.size}`} className="text-sm space-y-1">

                <div className="flex justify-between">
                  <span>
                    {it.title} ({it.size}) × {it.quantity}
                  </span>
                  <span>
                    {(it.price * it.quantity).toFixed(2)} AED
                  </span>
                </div>

                {it.note?.trim() && (
                  <p className="text-xs text-gray-400">
                    Note: {it.note}
                  </p>
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

            <div className="mt-3 flex justify-between">
              <span className="text-gray-400">Order Type</span>
              <span className="text-orange-400 font-medium">
                {orderType}
              </span>
            </div>

          </div>

          <button
            onClick={() => setShowPayment(true)}
            className="mt-4 w-full bg-orange-500 py-2.5 rounded-lg font-semibold"
          >
            Proceed To Payment
          </button>

        </div>
      </div>


      {/* ================= PAYMENT MODAL ================= */}

      {showPayment && (

        <div className="fixed inset-0 bg-black/70 z-[60] flex items-center justify-center">

          <div className="bg-[#0f1720] w-[90%] max-w-sm rounded-2xl p-5 text-gray-200">

            {/* HEADER */}
            <div className="flex justify-between items-center mb-4">

              <h2 className="text-lg font-semibold">
                Payment Method
              </h2>

              <button onClick={() => setShowPayment(false)}>
                <BiX size={22} className="text-orange-500" />
              </button>
            </div>

            {/* CUSTOMER NAME */}
            <div className="mb-4">

              <label className="text-sm text-gray-400 mb-1 block">
                Customer Name
              </label>

              <input
                value={customerName}
                onChange={e => setCustomerName(e.target.value)}
                placeholder="Enter customer name"
                className="w-full bg-slate-900 border border-gray-700 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-orange-500"
              />
            </div>

            {/* PAYMENT OPTIONS */}
            <div className="grid grid-cols-3 gap-3 mb-4">

              {[
  { id: "card", label: "Credit Card", icon: <FaCreditCard size={20} /> },
  { id: "paypal", label: "Paypal", icon: <FaPaypal size={20} /> },
  { id: "cash", label: "Cash", icon: <FaMoneyBillWave size={20} /> },
]
.map(opt => (

                <button
  key={opt.id}
  onClick={() => setPaymentMethod(opt.id)}
  className={`border rounded-lg py-3 text-sm font-medium flex flex-col items-center gap-2
    ${
      paymentMethod === opt.id
        ? "border-orange-500 bg-orange-500/10 text-orange-400"
        : "border-gray-700 text-gray-400 hover:border-gray-500"
    }
  `}
>
  {opt.icon}
  <span>{opt.label}</span>
</button>


              ))}

            </div>

            

            {/* CONFIRM */}
            <button
              onClick={handleConfirmPayment}
              className="w-full bg-orange-500 py-2.5 rounded-lg font-semibold"
            >
              Confirm Payment
            </button>

          </div>
        </div>

      )}

    </>
  );
};

export default Receipt;
