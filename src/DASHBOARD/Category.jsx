import { useState } from "react";
import { useCategories } from "../context/CategoriesContext";

const Category = () => {

  const {
    categories,
    addCategory,
    toggleCategory,
    deleteCategory
  } = useCategories();

  const [newCategory, setNewCategory] = useState("");

  const handleAddCategory = () => {
    const value = newCategory.trim();
    if (!value) return;

    addCategory(value);
    setNewCategory("");
  };

  return (
    <div className="px-3 sm:px-6 text-gray-800">

      {/* HEADER */}
      <div className="flex flex-col sm:flex-row gap-3 mb-5">

        <input
          type="text"
          value={newCategory}
          onChange={e => setNewCategory(e.target.value)}
          placeholder="New category name"
          className="px-3 py-2 border border-gray-300 rounded-md text-sm w-full sm:w-64"
        />

        <button
          onClick={handleAddCategory}
          className="px-4 py-2 bg-orange-500 text-black rounded-md text-sm font-medium hover:bg-orange-400 w-full sm:w-auto"
        >
          Add Category
        </button>

      </div>

      {/* ================= DESKTOP TABLE ================= */}

      <div className="hidden md:block overflow-x-auto bg-white rounded-lg border">

        <table className="w-full text-sm">

          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="px-4 py-3">Category</th>
              <th className="px-4 py-3">Products</th>
              <th className="px-4 py-3">Stock</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>

          <tbody>

            {categories.length === 0 ? (

              <tr>
                <td colSpan={5} className="px-4 py-6 text-center text-gray-500">
                  No categories available
                </td>
              </tr>

            ) : (

              categories.map(cat => (

                <tr key={cat.id} className="border-t hover:bg-gray-50">

                  <td className="px-4 py-3 font-medium">
                    {cat.name}
                  </td>

                  <td className="px-4 py-3">
                    {cat.products}
                  </td>

                  <td className="px-4 py-3">
                    {cat.stock}
                  </td>

                  <td className="px-4 py-3">

                    <button
                      onClick={() => toggleCategory(cat.id)}
                      role="switch"
                      aria-checked={cat.active}
                      className={`relative inline-flex h-5 w-10 items-center rounded-full transition-colors
                        ${cat.active ? "bg-green-500" : "bg-gray-400"}
                      `}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform
                          ${cat.active ? "translate-x-5" : "translate-x-1"}
                        `}
                      />
                    </button>

                  </td>

                  <td className="px-4 py-3">

                    <button
                      onClick={() => deleteCategory(cat.id)}
                      disabled={cat.products > 0}
                      className={`px-3 py-1 text-xs font-medium rounded
                        ${
                          cat.products > 0
                            ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                            : "bg-red-500 text-white hover:bg-red-400"
                        }
                      `}
                    >
                      Delete
                    </button>

                  </td>

                </tr>

              ))
            )}

          </tbody>
        </table>
      </div>

      {/* ================= MOBILE CARDS ================= */}

      <div className="md:hidden space-y-4">

        {categories.length === 0 && (
          <p className="text-center text-gray-500">
            No categories available
          </p>
        )}

        {categories.map(cat => (

          <div
            key={cat.id}
            className="bg-white rounded-xl shadow p-4"
          >

            <div className="flex justify-between mb-2">

              <h3 className="font-semibold">
                {cat.name}
              </h3>

              <button
                onClick={() => toggleCategory(cat.id)}
                className={`relative inline-flex h-5 w-10 items-center rounded-full transition-colors
                  ${cat.active ? "bg-green-500" : "bg-gray-400"}
                `}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform
                    ${cat.active ? "translate-x-5" : "translate-x-1"}
                  `}
                />
              </button>

            </div>

            <div className="text-sm text-gray-700 space-y-1 mb-3">

              <div className="flex justify-between">
                <span>Products</span>
                <span>{cat.products}</span>
              </div>

              <div className="flex justify-between">
                <span>Stock</span>
                <span>{cat.stock}</span>
              </div>

            </div>

            <div className="flex justify-end">

              <button
                onClick={() => deleteCategory(cat.id)}
                disabled={cat.products > 0}
                className={`px-3 py-1 text-xs font-medium rounded
                  ${
                    cat.products > 0
                      ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                      : "bg-red-500 text-white hover:bg-red-400"
                  }
                `}
              >
                Delete
              </button>

            </div>

          </div>
        ))}
      </div>
    </div>
  );
};

export default Category;
