import { useState } from "react";
import { useProducts } from "../context/ProductsContext";
import { useCategories } from "../context/CategoriesContext";

export default function ProductList() {

  const {
    paginatedItems,
    addDish,
    updateDish,
    deleteDish
  } = useProducts();

  const { categories } = useCategories();

  const [open, setOpen] = useState(false);
  const [editId, setEditId] = useState(null);

  const [title, setTitle] = useState("");
  const [img, setImg] = useState("");
  const [category, setCategory] = useState("");

  const [sizes, setSizes] = useState({ S:false, M:false, L:false });
  const [prices, setPrices] = useState({ S:"", M:"", L:"" });
  const [stocks, setStocks] = useState({ S:"", M:"", L:"" });

  const [orderTypes, setOrderTypes] = useState({
    dinein:false,
    takeaway:false,
    delivery:false
  });

  // ================= RESET =================

  const resetForm = () => {
    setTitle("");
    setImg("");
    setCategory("");
    setSizes({ S:false, M:false, L:false });
    setPrices({ S:"", M:"", L:"" });
    setStocks({ S:"", M:"", L:"" });
    setOrderTypes({ dinein:false, takeaway:false, delivery:false });
    setEditId(null);
  };

  // ================= IMAGE =================

  const handleImageUpload = file => {
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => setImg(reader.result);
    reader.readAsDataURL(file);
  };

  // ================= SAVE =================

  const handleSaveDish = () => {

    if (!title || !category) return alert("Enter name & category");

    const activeSizes = Object.keys(sizes).filter(s => sizes[s]);
    if (!activeSizes.length) return alert("Select size");

    const selectedOrderTypes = Object.keys(orderTypes)
      .filter(k => orderTypes[k])
      .map(k =>
        k === "dinein" ? "Dine In" :
        k === "takeaway" ? "Takeaway" :
        "Delivery"
      );

    if (!selectedOrderTypes.length) return alert("Select order type");

    const pricesObj = {};
    const stocksObj = {};

    activeSizes.forEach(s => {
      if (!prices[s] || !stocks[s]) return;
      pricesObj[s] = Number(prices[s]);
      stocksObj[s] = Number(stocks[s]);
    });

    const dish = {
      id: editId || Date.now(),
      title,
      img,
      category,
      sizes: activeSizes,
      prices: pricesObj,
      bowls: stocksObj,
      orderTypes: selectedOrderTypes
    };

    editId ? updateDish(dish) : addDish(dish);

    resetForm();
    setOpen(false);
  };

  // ================= EDIT =================

  const handleEdit = dish => {

    setEditId(dish.id);
    setTitle(dish.title);
    setImg(dish.img);
    setCategory(dish.category);

    const sizeMap = { S:false, M:false, L:false };
    dish.sizes.forEach(s => sizeMap[s] = true);
    setSizes(sizeMap);

    setPrices({
      S: dish.prices.S || "",
      M: dish.prices.M || "",
      L: dish.prices.L || ""
    });

    setStocks({
      S: dish.bowls.S || "",
      M: dish.bowls.M || "",
      L: dish.bowls.L || ""
    });

    setOrderTypes({
      dinein: dish.orderTypes?.includes("Dine In") || false,
      takeaway: dish.orderTypes?.includes("Takeaway") || false,
      delivery: dish.orderTypes?.includes("Delivery") || false
    });

    setOpen(true);
  };

  // ================= UI =================

  return (
    <div className="px-3 sm:px-6 py-4 bg-gray-200 min-h-full">

      <div className="flex justify-between mb-6">
        <h1 className="text-lg font-semibold">Products</h1>

        <button
          onClick={() => setOpen(true)}
          className="bg-gray-800 text-white px-4 py-2 rounded text-sm"
        >
          Add Dish
        </button>
      </div>

      {/* ================= DESKTOP TABLE ================= */}

      <div className="hidden md:block bg-white rounded-lg shadow overflow-x-auto">

        <table className="w-full text-sm">

          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-3">Image</th>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Category</th>
              <th className="px-4 py-3">Stock</th>
              <th className="px-4 py-3">Sizes</th>
              <th className="px-4 py-3">Price</th>
              <th className="px-4 py-3">Order Type</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>

          <tbody>

            {paginatedItems.length === 0 && (
              <tr>
                <td colSpan="8" className="text-center py-6 text-gray-400">
                  No dishes added
                </td>
              </tr>
            )}

            {paginatedItems.map(dish => (

              <tr key={dish.id} className={`hover:bg-gray-50 ${
    dish.sizes.every(s => dish.bowls[s] <= 0)
      ? "bg-red-50"
      : ""
  }`}>

                <td className="px-4 py-3">
                  <img
                    src={dish.img}
                    className="w-12 h-12 rounded object-cover"
                  />
                </td>

                <td className="px-4 py-3 font-medium">{dish.title}</td>
                <td className="px-4 py-3">{dish.category}</td>

                <td className="px-4 py-3 space-y-1">
                  {/* {dish.sizes.map(s => (
                    <div key={s} className="text-xs">
                      {s}: <b>{dish.bowls[s]}</b>
                    </div>
                  ))} */}

                  {dish.sizes.map(s => {

  const qty = dish.bowls[s];

  return (
    <div key={s} className="text-xs flex items-center gap-2">

      <span>{s}:</span>

      {qty > 0 ? (

        <span className="font-semibold">
          {qty}
        </span>

      ) : (

        <span className="px-2 py-[2px] rounded-full text-[10px] bg-red-100 text-red-600 font-semibold">
          Out of Stock
        </span>

      )}

    </div>
  );
})}

                </td>

                <td className="px-4 py-3">{dish.sizes.join(", ")}</td>

                <td className="px-4 py-3 space-y-1">
                  {dish.sizes.map(s => (
                    <div key={s} className="text-xs">
                      {s}: ₹<b>{dish.prices[s]}</b>
                    </div>
                  ))}
                </td>

                <td className="px-4 py-3 text-xs">
                  {dish.orderTypes?.join(", ")}
                </td>

                <td className="px-4 py-3 flex gap-2">
                  <button
                    onClick={() => handleEdit(dish)}
                    className="text-blue-600 text-xs"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => deleteDish(dish.id)}
                    className="text-red-600 text-xs"
                  >
                    Delete
                  </button>
                </td>

              </tr>
            ))}

          </tbody>
        </table>
      </div>

      {/* ================= MOBILE CARDS (IMPROVED) ================= */}

      <div className="md:hidden space-y-5">

        {paginatedItems.map(dish => (

          <div
            key={dish.id}
            className="bg-white rounded-xl shadow-md overflow-hidden"
          >

            <div className="h-40 w-full">
              <img
                src={dish.img}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="p-4">

              <div className="mb-3">
                <h3 className="font-semibold text-base">
                  {dish.title}
                </h3>

                <p className="text-xs text-gray-500">
                  {dish.category}
                </p>

                <p className="text-xs text-gray-400 mt-1">
                  {dish.orderTypes?.join(", ")}
                </p>
              </div>

              <div className="space-y-2 mb-4 text-sm">

                {dish.sizes.map(s => (
                  <div
                    key={s}
                    className="flex justify-between bg-gray-100 rounded px-3 py-1.5"
                  >
                    <span className="font-medium">{s}</span>

                    <span>
                      ₹{dish.prices[s]} • Stock {dish.bowls[s]}
                    </span>
                  </div>
                ))}

              </div>

              <div className="flex justify-end gap-4 text-sm">

                <button
                  onClick={() => handleEdit(dish)}
                  className="text-blue-600 font-medium"
                >
                  Edit
                </button>

                <button
                  onClick={() => deleteDish(dish.id)}
                  className="text-red-600 font-medium"
                >
                  Delete
                </button>

              </div>

            </div>
          </div>
        ))}
      </div>

      {/* ================= MODAL ================= */}

      {open && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center p-3">

          <div className="bg-white rounded-lg p-4 sm:p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto">

            <h2 className="text-lg font-semibold mb-4">
              {editId ? "Edit Dish" : "Add Dish"}
            </h2>

            <div className="space-y-3">

              <input
                placeholder="Dish name"
                value={title}
                onChange={e => setTitle(e.target.value)}
                className="w-full border px-3 py-2 rounded"
              />

              <input
                type="file"
                accept="image/*"
                onChange={e => handleImageUpload(e.target.files[0])}
                className="w-full border px-3 py-2 rounded"
              />

              {img && (
                <img
                  src={img}
                  className="w-24 h-24 rounded"
                />
              )}

              <select
                value={category}
                onChange={e => setCategory(e.target.value)}
                className="w-full border px-3 py-2 rounded"
              >
                <option value="">Select Category</option>

                {categories.filter(c => c.active).map(c => (
                  <option key={c.id} value={c.name}>
                    {c.name}
                  </option>
                ))}
              </select>

              <div className="flex gap-4 text-sm">

                {["dinein","takeaway","delivery"].map(type => (
                  <label key={type} className="flex items-center gap-1">

                    <input
                      type="checkbox"
                      checked={orderTypes[type]}
                      onChange={() =>
                        setOrderTypes(p => ({ ...p, [type]: !p[type] }))
                      }
                    />

                    {type === "dinein"
                      ? "Dine In"
                      : type === "takeaway"
                      ? "Takeaway"
                      : "Delivery"}
                  </label>
                ))}
              </div>

              {["S","M","L"].map(size => (
                <div key={size} className="flex gap-3 items-center">

                  <input
                    type="checkbox"
                    checked={sizes[size]}
                    onChange={() =>
                      setSizes(p => ({ ...p, [size]: !p[size] }))
                    }
                  />

                  <span className="w-6 font-semibold">{size}</span>

                  <input
                    type="number"
                    placeholder="Price"
                    disabled={!sizes[size]}
                    value={prices[size]}
                    onChange={e =>
                      setPrices(p => ({ ...p, [size]: e.target.value }))
                    }
                    className="border px-2 py-1 w-24 rounded"
                  />

                  <input
                    type="number"
                    placeholder="Stock"
                    disabled={!sizes[size]}
                    value={stocks[size]}
                    onChange={e =>
                      setStocks(p => ({ ...p, [size]: e.target.value }))
                    }
                    className="border px-2 py-1 w-24 rounded"
                  />
                </div>
              ))}

            </div>

            <div className="flex justify-end gap-2 mt-6">

              <button
                onClick={() => { resetForm(); setOpen(false); }}
                className="border px-4 py-2 rounded"
              >
                Cancel
              </button>

              <button
                onClick={handleSaveDish}
                className="bg-gray-800 text-white px-4 py-2 rounded"
              >
                Save
              </button>

            </div>
          </div>
        </div>
      )}
    </div>
  );
}
