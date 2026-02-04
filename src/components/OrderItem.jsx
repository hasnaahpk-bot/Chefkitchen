import Trash from "../assets/trash.svg?react";
import { useCart } from "../context";
import { useProducts } from "../context/ProductsContext";

const OrderItem = ({ item }) => {

  const { removeFromCart, increaseQty, decreaseQty, updateNote } = useCart();
  const { items } = useProducts();

  const dish = items.find(d => d.id === item.id);

  const available = dish?.bowls?.[item.size] ?? 0;

  const atLimit = item.quantity >= available;

  return (
    <div className="w-full space-y-2">

      <div className="grid grid-cols-[1fr_96px_72px] gap-3">

        <div className="flex gap-3 py-2">
          <img
            src={item.img}
            className="w-10 h-10 rounded-full object-cover"
          />

          <div>
            <p className="text-sm font-medium text-white">
              {item.title}
            </p>
            <p className="text-xs text-green-400">
              {item.price.toFixed(2)} AED
            </p>
          </div>
        </div>

        <div className="flex flex-col items-center gap-1 py-2">

          <div className="flex gap-1">

            <button
              onClick={() => decreaseQty(item.id, item.size)}
              className="w-7 h-7 bg-[#2a2a3a] rounded-md"
            >
              −
            </button>

            <div className="w-7 h-7 bg-[#2a2a3a] rounded-md flex items-center justify-center">
              {item.quantity}
            </div>

            <button
              onClick={() => increaseQty(item.id, item.size)}
              disabled={atLimit}
              className={`w-7 h-7 rounded-md ${
                atLimit
                  ? "bg-[#2a2a3a] opacity-50"
                  : "bg-orange-500 hover:bg-orange-400"
              }`}
            >
              +
            </button>

          </div>

          {atLimit && (
            <p className="text-xs text-orange-400">
              Out of stock
            </p>
          )}

        </div>

        <div className="text-right py-2">
          {(item.price * item.quantity).toFixed(2)}
        </div>

      </div>

      <div className="flex gap-2">

        <input
          value={item.note || ""}
          onChange={e =>
            updateNote(item.id, item.size, e.target.value)
          }
          placeholder="Add note.."
          className="flex-1 bg-[#1f2430] rounded-md p-2 text-sm"
        />

        <button
          onClick={() => removeFromCart(item.id, item.size)}
          className="w-9 h-9 border border-orange-500 rounded-md"
        >
          <Trash className="w-4 h-4" />
        </button>

      </div>
    </div>
  );
};

export default OrderItem;
