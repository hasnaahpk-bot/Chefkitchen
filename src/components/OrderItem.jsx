import Trash from "../assets/trash.svg";

const OrderItem = ({ item, onRemove, onNoteChange }) => {
  return (
    <div className="grid grid-cols-[1fr_48px_64px] gap-3 w-full min-w-0 sm:grid-cols-[1fr_56px_72px]">
      {/* ITEM */}
      <div className="flex gap-3 min-w-0">
        <img
          src={item.img}
          alt={item.title}
          className="w-10 h-10 sm:w-11 sm:h-11 rounded-full object-cover "
        />

        <div className="flex-1 min-w-0">
          <p className="text-sm sm:text-[15px] font-medium text-white truncate">
            {item.title}
          </p>

          <p className="text-xs text-green-400 py-1">
            $25.00
          </p>

          <input
            value={item.note || ""}
            onChange={(e) => onNoteChange(item, e.target.value)}
            placeholder="Add note.."
            className="
              w-full mt-2
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
        </div>
      </div>

      {/* QTY */}
      <div className="flex justify-center items-start pt-1 pl-5">
        <div className="w-8 h-8 sm:w-9 sm:h-9 bg-[#2a2a3a] rounded-md flex items-center justify-center text-sm text-white">
          {item.quantity}
        </div>
      </div>

      {/* PRICE + DELETE */}
      <div className="flex flex-col items-end gap-3 justify-start pt-1 gap-y-6">
        <span className="text-sm sm:text-[15px] text-white">
          {(item.price * item.quantity).toFixed(2)}
        </span>

        <button
          onClick={() => onRemove(item)}
          className="w-8 h-8 sm:w-9 sm:h-9 border border-orange-500 rounded-md flex items-center justify-center"
        >
          <img src={Trash} alt="delete" className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default OrderItem;
