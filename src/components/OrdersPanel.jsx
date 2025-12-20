import { BiX } from "react-icons/bi";
import { useState } from "react";
import OrderItem from "./OrderItem";
import { useCart, useUI } from "../context";

const OrdersPanel = ({ className = "" }) => {
  // 🔹 CONTEXT
  const {
    cart,
    subtotal,
  } = useCart();

  const { setIsCartOpen, setShowReceipt } = useUI();

  // 🔹 LOCAL UI STATE (stays here)
  const [activeType, setActiveType] = useState("Dine In");


  return (
    <aside
      className={`
        relative w-[380px] min-w-[380px] max-w-[380px] h-screen
        flex flex-col
         bg-gradient-to-b from-[#1b1a2a] to-[#12121c]
        flex-shrink-0
         overflow-x-hidden
        p-4 ${className}
      `}
    >
      {/* CLOSE */}
      <button
        onClick={() => setIsCartOpen(false)}
        className="absolute top-4 right-4 bg-[#1f1f2f] p-2 rounded-md"
      >
        <BiX size={18} className="text-orange-500" />
      </button>

      <h3 className="text-lg font-semibold text-white mb-3">
        Orders
      </h3>

      
     <div className="flex gap-3 mb-4">
      {["Dine In", "Take away", "Delivery"].map((type) => (
        <button
          key={type}
          onClick={() => setActiveType(type)}
          className={`
            text-xs px-3 py-2 rounded-md border transition
            ${
              activeType === type
                ? "bg-[#EA7C69] text-white border-[#EA7C69]"
                : "border-orange-500 text-orange-400 hover:bg-[#EA7C69] hover:text-white"
            }
          `}
        >
          {type}
        </button>
      ))}
    </div>


      {/* HEADER */}
      <div className="grid grid-cols-[1fr_50px_70px] text-xs text-gray-400 border-b border-white/10 pb-2 py-2 mb-3">
        <span>Item</span>
        <span className="text-center">Qty</span>
        <span className="text-right">Price</span>
      </div>

      {/* ITEMS */}
      <div className="flex flex-col gap-4 overflow-y-auto overflow-x-hidden no-scrollbar flex-1 justify-center items-center">
        {cart.length === 0 ? (
          <p className="text-sm text-gray-400">No items yet</p>
        ) : (
          cart.map((item, i) => (
            <OrderItem item={item} />
          ))
        )}
      </div>

      {/* FOOTER */}
      <div className="mt-4 pt-4 border-t border-white/10">
        <div className="flex justify-between text-sm text-white">
          <span>Discount</span>
          <span>5%</span>
        </div>

        <div className="flex justify-between mt-1 text-sm text-white">
          <span>Subtotal</span>
          <span>{subtotal.toFixed(2)} AED</span>
        </div>

        <button
          onClick={() => {
  setShowReceipt(true);
  setIsCartOpen(false);
}}
disabled={!cart.length}

          className="
            w-full mt-4 py-3 rounded-lg
            bg-orange-500 text-white font-semibold
            shadow-[0_0_28px_rgba(249,115,22,0.6)]
            disabled:bg-gray-600 disabled:shadow-none
            transition
          "
        >
          Order now
        </button>
      </div>
    </aside>
  );
};

export default OrdersPanel;


// import { BiX } from "react-icons/bi";
// import { useState } from "react";
// import OrderItem from "./OrderItem";
// import { useCart, useUI } from "../context";

// const OrdersPanel = ({ className = "" }) => {
//   // 🔹 CONTEXT
//   const {
//     cart,
//     removeFromCart,
//     increaseQty,
//     decreaseQty,
//     subtotal,
//   } = useCart();

//   const { setIsCartOpen, setShowReceipt } = useUI();

//   // 🔹 LOCAL UI STATE (stays here)
//   const [activeType, setActiveType] = useState("Dine In");

//   return (
//     <aside
//       className={`
//         relative
//     w-[380px] min-w-[380px] max-w-[380px]
//     h-screen
//     flex flex-col
//     bg-gradient-to-b from-[#1b1a2a] to-[#12121c]
//     flex-shrink-0
//     overflow-x-hidden
//     p-4 ${className}
//       `}
//     >
//       {/* CLOSE */}
//       <button
//         onClick={() => setIsCartOpen(false)}
//         className="absolute top-4 right-4 bg-[#1f1f2f] p-2 rounded-md"
//       >
//         <BiX size={18} className="text-orange-500" />
//       </button>

//       <h3 className="text-lg font-semibold text-white mb-3">
//         Orders
//       </h3>

//       {/* ORDER TYPE */}
//       <div className="flex gap-3 mb-4">
//         {["Dine In", "Take away", "Delivery"].map((type) => (
//           <button
//             key={type}
//             onClick={() => setActiveType(type)}
//             className={`
//               text-xs px-3 py-2 rounded-md border transition
//               ${
//                 activeType === type
//                   ? "bg-[#EA7C69] text-white border-[#EA7C69]"
//                   : "border-orange-500 text-orange-400 hover:bg-[#EA7C69] hover:text-white"
//               }
//             `}
//           >
//             {type}
//           </button>
//         ))}
//       </div>

//       {/* HEADER */}
//       <div className="grid grid-cols-[1fr_50px_70px] text-xs text-gray-400 border-b border-white/10 pb-2 py-2 mb-3">
//         <span>Item</span>
//         <span className="text-center">Qty</span>
//         <span className="text-right">Price</span>
//       </div>

//       {/* ITEMS */}
//       <div className="flex flex-col gap-4 overflow-y-auto overflow-x-hidden no-scrollbar flex-1">
//         {cart.length === 0 ? (
//           <p className="text-sm text-gray-400">No items yet</p>
//         ) : (
//           cart.map((item) => (
//             <OrderItem
//               key={item.id}
//               item={item}
//               onRemove={removeFromCart}
//               onIncrease={increaseQty}
//               onDecrease={decreaseQty}
//             />
//           ))
//         )}
//       </div>

//       {/* FOOTER */}
//       <div className="mt-4 pt-4 border-t border-white/10">
//         <div className="flex justify-between text-sm text-white">
//           <span>Discount</span>
//           <span>5%</span>
//         </div>

//         <div className="flex justify-between mt-1 text-sm text-white">
//           <span>Subtotal</span>
//           <span>{subtotal.toFixed(2)} AED</span>
//         </div>

//         <button
//           onClick={() => {
//             setShowReceipt(true);
//             setIsCartOpen(false);
//           }}
//           disabled={!cart.length}
//           className="
//             w-full mt-4 py-3 rounded-lg
//             bg-orange-500 text-white font-semibold
//             shadow-[0_0_28px_rgba(249,115,22,0.6)]
//             disabled:bg-gray-600 disabled:shadow-none
//             transition
//           "
//         >
//           Order now
//         </button>
//       </div>
//     </aside>
//   );
// };

// export default OrdersPanel;

