import { useState, useMemo } from "react";
import { useCart, useUI } from "../context";
import { useWishlist } from "../context/WishlistContext";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";

const DishCard = ({ dish, variant = "default", hideActions = false }) => {
  const { cart, addToCart, stock } = useCart();
  const { orderType } = useUI();
  const { toggleWishlist, isWishlisted } = useWishlist();

  const [selectedSize, setSelectedSize] = useState(null);

  const fav = isWishlisted(dish.id);
  const isDashboard = variant === "dashboard";

  /* ---------- DERIVED ---------- */
  const effectiveSize =
    selectedSize ?? (dish.sizes?.length ? dish.sizes[0] : null);

  const effectivePrice = dish.prices?.[effectiveSize];
  // const effectiveBowls = stock?.[dish.id]?.[effectiveSize] ?? 0;

  const effectiveBowls =
  stock?.[dish.id]?.[effectiveSize] ??
  dish.bowls?.[effectiveSize] ??
  0;


  const isOutOfStock = effectiveBowls <= 0;

  const isAdded = useMemo(
    () =>
      cart.some((item) => item.id === dish.id && item.size === effectiveSize),
    [cart, dish.id, effectiveSize]
  );

  /* ---------- THEME ---------- */
  const theme = {
    card: isDashboard
      ? "bg-gray-300 border border-gray-200 text-gray-800"
      : "bg-slate-950 text-white",

    price: isDashboard ? "text-gray-900" : "text-[#9fe79f]",

    sizeActive: isDashboard
      ? "bg-gray-800 text-white border-gray-800"
      : "bg-[#9fe79f] text-black border-[#9fe79f]",

    sizeInactive: isDashboard
      ? "bg-gray-100 text-gray-700 border-gray-300"
      : "bg-[#111827] text-gray-300 border-[#1f2937]",

    addBtn: isDashboard
      ? "bg-gray-800 text-white hover:bg-gray-900"
      : "bg-[#141823] text-orange-400 hover:bg-[#1a1f2e]",
  };

  /* ---------- HANDLERS ---------- */
  const handleAdd = () => {
    addToCart(
      {
        id: dish.id ?? dish.title,
        title: dish.title,
        img: dish.img,
        prices: dish.prices,
        size: effectiveSize,
        bowls: effectiveBowls,
      },
      orderType
    );

    if (!selectedSize && effectiveSize) {
      setSelectedSize(effectiveSize);
    }
  };

  return (
    
    <article
  className={`relative rounded-2xl p-3 pt-10 shadow-lg flex flex-col items-center w-full h-[240px]
    ${isDashboard ? theme.card : "bg-slate-950 text-white"}
  `}
>

      {/* IMAGE */}
      <div className="absolute left-1/2 -translate-x-1/2 -top-8 sm:-top-10">
        <div
          className={`w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden border-4 ${
            isDashboard ? "border-gray-200" : "border-[#0c0f13]"
          }`}
        >
          <img
            src={dish.img}
            alt={dish.title}
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* TITLE */}
      <h3 className="mt-3 text-xs sm:text-sm font-semibold truncate text-center w-full px-1">
        {dish.title}
      </h3>

      {/* PRICE */}
      <div className="mt-2 flex gap-2 items-end flex-wrap justify-center">
        {dish.oldPrice && (
          <span className="text-[10px] sm:text-xs text-red-500 line-through">
            {dish.oldPrice.toFixed(2)}
          </span>
        )}
        <span className={`text-xs sm:text-sm font-semibold ${theme.price}`}>
          {Number(effectivePrice ?? 0).toFixed(2)}
        </span>
      </div>

      {/* BOWLS */}
      <div className="mt-1 text-[10px] sm:text-xs text-gray-500">
        {effectiveBowls} Bowls Available
      </div>

      {/* SIZES */}
      <div className="mt-3 flex gap-2 flex-wrap justify-center">
        {dish.sizes?.map((size) => {
          const active =
            size === selectedSize || (!selectedSize && size === dish.sizes[0]);

          return (
            <button
              key={size}
              onClick={() => setSelectedSize(size)}
              className={`text-[10px] sm:text-[11px] px-2 py-1 rounded-md border ${
                active ? theme.sizeActive : theme.sizeInactive
              }`}
            >
              {size}
            </button>
          );
        })}
      </div>

      

      {!hideActions && (
        <div className="mt-auto w-full flex justify-center">
          <button
            onClick={handleAdd}
            disabled={isAdded || isOutOfStock}
            className={`px-4 py-1.5 text-xs sm:text-sm rounded-md font-semibold transition w-full sm:w-auto ${
              isAdded
                ? "bg-green-500 text-black cursor-default"
                : isOutOfStock
                ? "bg-gray-200 text-red-600"
                : theme.addBtn
            }`}
          >
            {isAdded ? "Added" : isOutOfStock ? "Sold Out" : "Add"}
          </button>
        </div>
      )}

      {/* WISHLIST */}
      

 {!hideActions && (
   <button
     onClick={() =>
       toggleWishlist({
         id: dish.id,
         title: dish.title,
         img: dish.img,
         prices: dish.prices,
         sizes: dish.sizes,
       })
     }
     className="absolute right-3 top-3 text-lg sm:text-xl"
   >
     {fav ? (
       <AiFillHeart className="text-red-600" />
     ) : (
       <AiOutlineHeart className="text-gray-400 hover:text-red-400" />
     )}
   </button>
 )}

    </article>
  );
};

export default DishCard;
