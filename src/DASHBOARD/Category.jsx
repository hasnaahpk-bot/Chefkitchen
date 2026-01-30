

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
    <div className="px-4 text-gray-800">

      {/* HEADER */}
      <div className="flex items-center gap-3 mb-4">

        <input
          type="text"
          value={newCategory}
          onChange={e => setNewCategory(e.target.value)}
          placeholder="New category name"
          className="px-3 py-2 border border-gray-300 rounded-md text-sm"
        />

        <button
          onClick={handleAddCategory}
          className="px-4 py-2 bg-orange-500 text-black rounded-md text-sm font-medium hover:bg-orange-400"
        >
          Add Category
        </button>

      </div>

      {/* TABLE */}

      <div className="overflow-x-auto bg-white rounded-lg border">

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

                  {/* TOGGLE */}
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

                  {/* DELETE */}
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
    </div>
  );
};

export default Category;
