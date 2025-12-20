// import { useState, useMemo } from "react";
// import { useCart } from "../context";

// const DishCard = ({ dish }) => {
//   const { cart, addToCart } = useCart();
//   const [selectedSize, setSelectedSize] = useState(null);
  

//   const effectiveSize =
//     selectedSize ?? (dish.sizes?.length ? dish.sizes[0] : null);

//     const effectivePrice = dish.prices?.[effectiveSize];


//   const isAdded = useMemo(
//     () =>
//       cart.some(
//         (item) =>
//           item.id === dish.id && item.size === effectiveSize
//       ),
//     [cart, dish.id, effectiveSize]
//   );

//   const handleAdd = () => {
//     addToCart({
//       id: dish.id ?? dish.title,
//       title: dish.title,
//       img: dish.img,
//       prices: dish.prices,
//       size: effectiveSize,
//       bowls: dish.bowls ?? 0,
//     });

//     if (!selectedSize && effectiveSize) {
//       setSelectedSize(effectiveSize);
//     }
//   };

//   return (
//     <article className="relative bg-slate-950 rounded-2xl p-4 pt-14 shadow-lg flex flex-col items-center w-full">
//       {/* IMAGE */}
//       <div className="absolute left-1/2 -translate-x-1/2 -top-10">
//         <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-[#0c0f13]">
//           <img
//             src={dish.img}
//             alt={dish.title}
//             className="w-full h-full object-cover"
//           />
//         </div>
//       </div>

//       {/* TITLE */}
//       <h3 className="mt-3 text-sm font-semibold text-white truncate text-center w-full">
//         {dish.title}
//       </h3>

//       {/* PRICE */}
//       <div className="mt-2 flex gap-2 items-end">
//         {dish.oldPrice && (
//           <span className="text-xs text-red-500 line-through">
//             {dish.oldPrice.toFixed(2)}
//           </span>
//         )}
//         <span className="text-sm font-semibold text-[#9fe79f]">
//     {Number(effectivePrice ?? 0).toFixed(2)} AED
//   </span>
//       </div>

//       {/* BOWLS */}
//       <div className="mt-2 text-xs text-gray-400">
//         {dish.bowls} Bowls Available
//       </div>

//       {/* SIZES */}
//       <div className="mt-3 flex gap-2 flex-wrap justify-center">
//         {dish.sizes?.map((size) => {
//           const active =
//             size === selectedSize ||
//             (!selectedSize && size === dish.sizes[0]);

//           return (
//             <button
//               key={size}
//               onClick={() => setSelectedSize(size)}
//               className={`text-[11px] px-2 py-1 rounded-md border ${
//                 active
//                   ? "bg-[#9fe79f] text-black border-[#9fe79f]"
//                   : "bg-[#111827] text-gray-300 border-[#1f2937]"
//               }`}
//             >
//               {size}
//             </button>
//           );
//         })}
//       </div>

//       {/* ADD BUTTON */}
//       <div className="mt-4">
//         <button
//           onClick={handleAdd}
//           disabled={isAdded}
//           className={`px-4 py-1.5 rounded-md font-semibold transition ${
//             isAdded
//               ? "bg-green-500 text-black cursor-default"
//               : "bg-[#141823] text-orange-400 hover:bg-[#1a1f2e]"
//           }`}
//         >
//           {isAdded ? "Added" : "Add"}
//         </button>
//       </div>
//     </article>
//   );
// };

// export default DishCard;


import { useState, useMemo } from "react";
import { useCart } from "../context";

const DishCard = ({ dish }) => {
  const { cart, addToCart } = useCart();
  const [selectedSize, setSelectedSize] = useState(null);

  const effectiveSize =
    selectedSize ?? (dish.sizes?.length ? dish.sizes[0] : null);

  const effectivePrice = dish.prices?.[effectiveSize];

  const isAdded = useMemo(
    () =>
      cart.some(
        (item) =>
          item.id === dish.id && item.size === effectiveSize
      ),
    [cart, dish.id, effectiveSize]
  );

  const handleAdd = () => {
    addToCart({
      id: dish.id ?? dish.title,
      title: dish.title,
      img: dish.img,
      prices: dish.prices,
      size: effectiveSize,
      bowls: dish.bowls ?? 0,
    });

    if (!selectedSize && effectiveSize) {
      setSelectedSize(effectiveSize);
    }
  };

  return (
    <article className="relative bg-slate-950 rounded-2xl p-3 sm:p-4 pt-12 sm:pt-14 shadow-lg flex flex-col items-center w-full">
      {/* IMAGE */}
      <div className="absolute left-1/2 -translate-x-1/2 -top-8 sm:-top-10">
        <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden border-4 border-[#0c0f13] ">
          <img
            src={dish.img}
            alt={dish.title}
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* TITLE */}
      <h3 className="mt-3 text-xs sm:text-sm font-semibold text-white truncate text-center w-full px-1 py-1">
        {dish.title}
      </h3>

      {/* PRICE */}
      <div className="mt-2 flex gap-2 items-end flex-wrap justify-center">
        {dish.oldPrice && (
          <span className="text-[10px] sm:text-xs text-red-500 line-through">
            {dish.oldPrice.toFixed(2)}
          </span>
        )}
        <span className="text-xs sm:text-sm font-semibold text-[#9fe79f]">
          {Number(effectivePrice ?? 0).toFixed(2)} AED
        </span>
      </div>

      {/* BOWLS */}
      <div className="mt-1 sm:mt-2 text-[10px] sm:text-xs text-gray-400">
        {dish.bowls} Bowls Available
      </div>

      {/* SIZES */}
      <div className="mt-3 flex gap-2 flex-wrap justify-center">
        {dish.sizes?.map((size) => {
          const active =
            size === selectedSize ||
            (!selectedSize && size === dish.sizes[0]);

          return (
            <button
              key={size}
              onClick={() => setSelectedSize(size)}
              className={`text-[10px] sm:text-[11px] px-2 py-1 rounded-md border ${
                active
                  ? "bg-[#9fe79f] text-black border-[#9fe79f]"
                  : "bg-[#111827] text-gray-300 border-[#1f2937]"
              }`}
            >
              {size}
            </button>
          );
        })}
      </div>

      {/* ADD BUTTON */}
      <div className="mt-3 sm:mt-4 w-full flex justify-center">
        <button
          onClick={handleAdd}
          disabled={isAdded}
          className={`px-4 py-1.5 text-xs sm:text-sm rounded-md font-semibold transition w-full sm:w-auto ${
            isAdded
              ? "bg-green-500 text-black cursor-default"
              : "bg-[#141823] text-orange-400 hover:bg-[#1a1f2e]"
          }`}
        >
          {isAdded ? "Added" : "Add"}
        </button>
      </div>
    </article>
  );
};

export default DishCard;
