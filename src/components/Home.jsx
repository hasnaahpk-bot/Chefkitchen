// import { useEffect, useMemo, useRef, useState } from "react";
// import { FaSearch } from "react-icons/fa";
// import { BiCartAlt } from "react-icons/bi";

// import { DISHES, LABELS } from "../CONSTANTS";
// import { useCart, useUI } from "../context";

// import DishCard from "./DishCard";
// import Sidebar from "./Sidebar";
// import OrdersPanel from "./OrdersPanel";
// import Receipt from "./Recipt";


// const Home = () => {
//   // 🔹 CONTEXT
//   const { cart, addToCart, totalItems } = useCart();
//   const { isCartOpen, setIsCartOpen, showReceipt, setShowReceipt } = useUI();

//   // 🔹 PAGE-LOCAL STATE
//   const [orderType, setOrderType] = useState("all");
//   const [query, setQuery] = useState("");
//   const [active, setActive] = useState(0);
//   const [showToast, setShowToast] = useState(false);
//   const [now, setNow] = useState(new Date());

//   // 🔹 CLOCK
//   useEffect(() => {
//     const timer = setInterval(() => setNow(new Date()), 1000);
//     return () => clearInterval(timer);
//   }, []);

//   // 🔹 CATEGORY MAP
//   const categoryMap = {
//     0: "all",
//     1: "today",
//     2: "our",
//     3: "south",
//   };

//   // 🔹 FILTERING (LOCAL LOGIC)
//   const filteredDishes = useMemo(() => {
//     return DISHES.filter((dish) => {
//       const matchQuery =
//         !query.trim() ||
//         dish.title.toLowerCase().includes(query.toLowerCase());

//       const matchCategory =
//         categoryMap[active] === "all"
//           ? true
//           : dish.category === categoryMap[active];

//       const matchType =
//         orderType === "all" ? true : dish.type === orderType;

//       return matchQuery && matchCategory && matchType;
//     });
//   }, [query, active, orderType]);

//   // 🔹 ADD TO CART (CONTEXT SAFE)
//   const handleAdd = (dish) => {
//     addToCart(dish);
//     setIsCartOpen(true);
//     setShowToast(true);
//     setTimeout(() => setShowToast(false), 1500);
//   };

// const prevCartLength = useRef(cart.length);

// useEffect(() => {
//   if (cart.length > prevCartLength.current) {
//     setIsCartOpen(true);
//   }
//   prevCartLength.current = cart.length;
// }, [cart.length, setIsCartOpen]);


//   return (
//     <>
//       {showToast && (
//         <div className="fixed top-4 left-1/2 -translate-x-1/2 z-[1000]">
//           <div className="bg-green-600 text-black px-4 py-2 rounded-md shadow-lg text-sm font-medium">
//             Item added to cart!
//           </div>
//         </div>
//       )}

//       <div className="min-h-screen bg-black w-full flex justify-center">
//         <div className="h-screen bg-slate-900 text-gray-200 max-w-[1600px] w-full overflow-hidden">
//           <div className="grid grid-cols-1 lg:grid-cols-[70px_1fr_auto] gap-2 h-full">
//             <div className="hidden lg:block">
//               <Sidebar />
//             </div>

//             <main className="bg-slate-900 overflow-y-auto no-scrollbar">
//               <header className="sticky top-0 z-30 bg-slate-900 pb-3">
//                 {/* top row */}
//                 <div className="flex flex-col sm:flex-row justify-between p-2 mb-4 gap-3">
//                   <div>
//                     <h1 className="text-2xl font-semibold hidden sm:block">
//                       Chef Kitchen
//                     </h1>

//                     <p className="text-sm text-gray-400 hidden sm:block">
//                       {now.toLocaleDateString("en-US", {
//                         weekday: "long",
//                         day: "numeric",
//                         month: "long",
//                         year: "numeric",
//                       })}{" "}
//                       •{" "}
//                       {now.toLocaleTimeString("en-US", {
//                         hour: "2-digit",
//                         minute: "2-digit",
//                         second: "2-digit",
//                       })}
//                     </p>
//                   </div>

//                   <div className="flex items-center gap-2 w-full sm:w-auto ">
//                     <div className="relative w-full sm:w-[240px] md:w-[280px]">
//                       <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />

//                       <input
//                         value={query}
//                          onChange={(e) => setQuery(e.target.value)}
//                         type="text"
//                         placeholder="Search for food, coffee, etc..."
//                         className="
//           w-full
//           rounded-md
//           py-2
//           pl-11
//           pr-4
//           text-sm
//           text-gray-200
//           placeholder:text-gray-500
//           bg-gradient-to-r from-[#1f2430] to-[#1b1f2a]
//           border border-white/10
//           focus:outline-none
//           focus:ring-1 focus:ring-orange-500/50
//           shadow-inner
//         "
//                       />
//                     </div>

//                     <button
//                       onClick={() => setIsCartOpen(true)}
//                       className="relative bg-[#232936] p-2 rounded"
//                     >
//                       <BiCartAlt size={22} color="orange" />
//                       {totalItems > 0 && (
//                         <span className="absolute -top-1 -right-1 bg-orange-500 w-5 h-5 rounded-full text-xs flex items-center justify-center">
//                           {totalItems}
//                         </span>
//                       )}
//                     </button>
//                   </div>
//                 </div>

//                 {/* 🔥 YOUR PREVIOUS CODE — NOW INSIDE HEADER */}
//                 <div className="flex flex-col gap-3">
//                   <div
//                     className="
//     relative
//     flex gap-6
//     overflow-x-auto no-scrollbar
//     sm:flex-wrap sm:overflow-visible
//     border-b border-[#393C49]
//      px-2 whitespace-nowrap
//   "
//                   >
//                     {[
//                       "All",
//                       "Today Special",
//                       "Our Specials",
//                       "South Indian Special",
//                     ].map((label, i) => (
//                       <button
//                         key={label}
//                         onClick={() => setActive(i)}
//                         className={`
//         relative
//         pb-3
//         text-sm
//         font-medium
//         transition-colors duration-300
//         ${active === i ? "text-orange-500" : "text-gray-300 hover:text-white"}

//         after:content-['']
//         after:absolute
//         after:left-0
//         after:-bottom-[2px]
//         after:h-[3px]
//         after:w-full
//         after:rounded-full
//         after:bg-orange-500
//         after:transition-transform
//         after:duration-300
//         after:ease-out
//         ${active === i ? "after:scale-x-100" : "after:scale-x-0"}
//         after:origin-left
//       `}
//                       >
//                         {label}
//                       </button>
//                     ))}
//                   </div>

//                   {/* </div> */}

//                   <div className="flex items-center justify-between font-medium gap-3 text-base text-gray-200 py-2 px-4">
//                     <span className="text-lg">Choose Dishes</span>

//                     <select
//                       value={orderType}
//                       onChange={(e) => setOrderType(e.target.value)}
//                       className="bg-slate-950 text-gray-300 border border-[#393C49] rounded px-2 py-1"
//                     >
//                       <option value="dine-in">Dine In</option>
//                       <option value="takeaway">Takeaway</option>
//                     </select>
//                   </div>
//                 </div>
//               </header>
//               <section className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-x-5 gap-y-12 py-12 px-4 sm:px-4 overflow-hidden">
//                 {filteredDishes.length === 0 ? (
//                   <div className="fixed inset-0 flex items-center justify-center">
//     <p className="text-gray-400 text-sm sm:text-base">
//       {LABELS.NO_MATCH}
//     </p>
//   </div>
//                 ) : (
//                   filteredDishes.map((d) => (
//                     <DishCard key={d.id} dish={d} />
//                   ))
//                 )}
//               </section>
//             </main>
            

//             <div className="hidden lg:block">
//             {isCartOpen && (
//               <OrdersPanel />
//             )}
//             </div>
//           </div>
//         </div>
//       </div>

//       {showReceipt && cart.length > 0 && (
//         <Receipt />
//       )}

//      {/* MOBILE CART */}
// <div
//   className={`
//     fixed inset-0 z-[999] lg:hidden
//     bg-black/50
//     transition-opacity duration-300
//     ${isCartOpen ? "opacity-100" : "opacity-0 pointer-events-none"}
//   `}
//   onClick={() => setIsCartOpen(false)}
// >
//   <div
//     className={`
//       absolute top-0 right-0 h-full
//       w-[85%] max-w-[380px]
//       transition-transform duration-300 ease-out
//       ${isCartOpen ? "translate-x-0" : "translate-x-full"}
//     `}
//     onClick={(e) => e.stopPropagation()}
//   >
//    <OrdersPanel />

//   </div>
// </div>


//     </>
//   );
// };

// export default Home;

