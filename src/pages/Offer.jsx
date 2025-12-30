import Sidebar from "../components/Sidebar";
import DishCard from "../components/DishCard";
import { DISHES } from "../CONSTANTS";

const Offer = () => {
  // 🔎 Offer = oldPrice exists AND at least one size is cheaper
  const offerDishes = DISHES.filter(
    (dish) =>
      typeof dish.oldPrice === "number" &&
      dish.prices &&
      Object.values(dish.prices).some(
        (price) => price < dish.oldPrice
      )
  );

  return (
    <div className="flex h-screen bg-slate-900 overflow-hidden">
      {/* SIDEBAR (hidden on mobile) */}
      <div className="hidden md:block">
        <Sidebar />
      </div>

      {/* CONTENT */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* HEADER (fixed height, no scroll) */}
        <div className="shrink-0 pt-4 pb-3 flex justify-center border-b border-[#393C49] px-4 sm:px-6">
          <h1 className="text-base sm:text-lg font-semibold text-white">
            Special Offers
          </h1>
        </div>

        {/* BODY (ONLY internal scroll here) */}
        <div className="flex-1 overflow-y-auto px-4 sm:px-6 lg:px-8 py-12">
          {offerDishes.length === 0 ? (
            <div className="h-full flex items-center justify-center text-gray-400 text-sm sm:text-base">
              No offers available right now
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {offerDishes.map((dish) => (
                <DishCard key={dish.id} dish={dish} />
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Offer;
