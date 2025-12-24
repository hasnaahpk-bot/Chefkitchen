import Trash from "../assets/trash.svg?react";
import { useCart } from "../context";

const OrderItem = ({ item }) => {
  const { removeFromCart, increaseQty, decreaseQty, updateNote, stock } =
    useCart();

  const available = stock?.[item.id]?.[item.size] ?? 0;

  const atLimit = item.quantity >= available;

  return (
    <div className="w-full space-y-2">
      {/* ROW */}
      <div className="grid grid-cols-[1fr_96px_72px] gap-3 items-start">
        {/* ITEM */}
        <div className="flex gap-3 min-w-0 py-2">
          <img
            src={item.img}
            alt={item.title}
            className="w-10 h-10 rounded-full object-cover"
          />

          <div className="min-w-0">
            <p className="text-sm font-medium text-white truncate">
              {item.title}
            </p>
            <p className="text-xs text-green-400">
              {Number(item.price).toFixed(2)} AED
            </p>
          </div>
        </div>

        {/* QTY (perfectly under heading) */}

        <div className="flex flex-col items-center gap-1 pl-12 py-2">
          {/* quantity controls row */}
          <div className="flex items-center gap-1">
            <button
              onClick={() => decreaseQty(item.id, item.size)}
              className="w-7 h-7 bg-[#2a2a3a] text-white rounded-md"
            >
              −
            </button>

            <div className="w-7 h-7 bg-[#2a2a3a] rounded-md flex items-center justify-center text-sm text-white">
              {item.quantity}
            </div>

            <button
              onClick={() => {
                if (!atLimit) {
                  increaseQty(item.id, item.size);
                }
              }}
              disabled={atLimit}
              className={`w-7 h-7 bg-[#2a2a3a] text-white rounded-md ${
                atLimit ? "opacity-50 " : ""
              }`}
            >
              +
            </button>
          </div>

          {/* message UNDER controls */}
          {atLimit && (
            <p className="text-[12px] whitespace-nowrap text-red-400">
              No item left!
            </p>
          )}
        </div>

        {/* PRICE (perfectly under heading) */}
        <div className="flex flex-col items-end gap-1 py-2">
          <span className="text-sm text-white">
            {(item.price * item.quantity).toFixed(2)}
          </span>
        </div>
      </div>

      {/* NOTE + DELETE */}
      <div className="flex items-center gap-2">
        <input
          value={item.note || ""}
          onChange={(e) => updateNote(item.id, item.size, e.target.value)}
          placeholder="Add note.."
          className="
            flex-1
            bg-[#1f2430]
            border border-white/10
            rounded-md
            p-2 text-sm
            text-gray-200
            placeholder:text-gray-500
            focus:outline-none
            focus:ring-1 focus:ring-orange-500/50
          "
        />

        <button
          onClick={() => removeFromCart(item.id, item.size)}
          className="w-9 h-9 border border-orange-500 rounded-md flex items-center justify-center  text-orange-500
    hover:text-[#FF7CA3] hover:border-[#FF7CA3]
    transition-colors"
        >
          <Trash className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default OrderItem;
