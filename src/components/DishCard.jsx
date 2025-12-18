import React, { useState } from "react";

const DishCard = ({ dish, onAdd = () => {}, cart = []  }) => {
  const [selectedSize, setSelectedSize] = useState(null);

  const effectiveSize =
    selectedSize ?? (dish.sizes?.length ? dish.sizes[0] : null);

  const handleAdd = () => {
    onAdd({
      id: dish.id ?? dish.title,
      title: dish.title,
      img: dish.img,
      price: dish.newPrice,
      size: effectiveSize,
      bowls: dish.bowls ?? 0,
      quantity: 1,
    });

    if (!selectedSize && effectiveSize) {
      setSelectedSize(effectiveSize);
    }
  };

  const isAdded = cart.some(
  (item) => item.id === dish.id && item.size === effectiveSize
);


  return (
    <article
      className="
        relative bg-slate-950 rounded-2xl
        p-3 sm:p-4 
        pt-14 sm:pt-16
        shadow-[0_6px_20px_rgba(2,6,23,0.6)]
        flex flex-col items-center
        w-full
      "
    >
      {/* IMAGE */}
      <div className="absolute left-1/2 -translate-x-1/2 -top-8 sm:-top-10 z-10">
        <div
          className="
            w-24 h-24
            sm:w-28 sm:h-28
            rounded-full bg-[#0b1116]
            border-4 border-[#0c0f13]
            overflow-hidden
          "
        >
          <img
            src={dish.img}
            alt={dish.title}
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* TITLE */}
      <h3
        className="
          mt-2 sm:mt-3
          text-xs sm:text-sm
          font-semibold text-white
          truncate w-full text-center
          px-1
        "
      >
        {dish.title}
      </h3>

      {/* PRICE */}
      <div className="mt-2 flex items-end gap-2">
        {dish.oldPrice && (
          <span className="text-xs sm:text-sm text-red-500 line-through">
            {dish.oldPrice.toFixed(2)}
          </span>
        )}
        <span className="text-xs sm:text-sm font-semibold text-[#9fe79f]">
          {dish.newPrice.toFixed(2)} AED
        </span>
      </div>

      {/* BOWLS */}
      <div className="mt-2 text-[11px] sm:text-xs text-gray-400">
        {dish.bowls} Bowls Available
      </div>

      {/* SIZES */}
      <div className="mt-3 flex flex-wrap justify-center gap-2">
        {dish.sizes?.map((size) => {
          const active =
            size === selectedSize ||
            (!selectedSize && size === dish.sizes[0]);

          return (
            <button
              key={size}
              onClick={() => setSelectedSize(size)}
              className={`
                text-[10px] sm:text-[11px]
                px-2 py-[3px]
                rounded-md border select-none
                transition
                ${
                  active
                    ? "bg-[#9fe79f] text-black border-[#9fe79f]"
                    : "bg-[#111827] text-gray-300 border-[#1f2937]"
                }
              `}
            >
              {size}
            </button>
          );
        })}
      </div>

    
      <div className="mt-4 w-full flex justify-center">
  <button
    onClick={handleAdd}
    disabled={isAdded}
    className={`
      px-4 py-1.5
      rounded-md
      text-sm sm:text-base
      font-semibold
      transition
      ${
        isAdded
          ? "bg-green-500 text-black cursor-default"
          : "bg-[#141823] text-orange-400 hover:bg-[#1a1f2e]"
      }
    `}
  >
    {isAdded ? "Added" : "Add"}
  </button>
</div>

    </article>
  );
};

export default DishCard;
