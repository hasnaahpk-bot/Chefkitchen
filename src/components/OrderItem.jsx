import Trash from "../assets/trash.svg";

const OrderItem = ({
  item,
  onRemove,
  onNoteChange,
  onIncrease,
  onDecrease,
}) => {
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
            <p className="text-xs text-green-400">$25.00</p>
          </div>
        </div>

        {/* QTY (perfectly under heading) */}
        <div className="flex flex-col items-center gap-1 pl-12 py-2">

          <div className="flex items-center gap-1">
            <button
              onClick={() => onDecrease(item)}
              className="w-7 h-7 bg-[#2a2a3a] text-white rounded-md"
            >
              −
            </button>

            <div className="w-7 h-7 bg-[#2a2a3a] rounded-md flex items-center justify-center text-sm text-white">
              {item.quantity}
            </div>

            <button
              onClick={() => onIncrease(item)}
              className="w-7 h-7 bg-[#2a2a3a] text-white rounded-md"
            >
              +
            </button>
          </div>
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
          onChange={(e) => onNoteChange(item, e.target.value)}
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
          onClick={() => onRemove(item)}
          className="w-9 h-9 border border-orange-500 rounded-md flex items-center justify-center"
        >
          <img src={Trash} alt="delete" className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default OrderItem;
