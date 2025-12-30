import { useWishlist } from "../context/WishlistContext";
import DishCard from "../components/DishCard";
import Sidebar from "../components/Sidebar";

const Wishlist = () => {
  const { wishlist } = useWishlist();

  return (
    <div className="flex h-screen bg-slate-900 overflow-hidden">
      {/* SIDEBAR — hidden on mobile */}
      <div className="hidden md:block">
        <Sidebar />
      </div>

      {/* CONTENT */}
      <main className="flex-1 flex flex-col px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* HEADING */}
        <div className="pt-4 pb-3 flex justify-center border-b border-[#393C49]">
          <h1 className="text-base sm:text-lg font-semibold text-white">
            My Wishlist
          </h1>
        </div>

        {/* BODY */}
        {wishlist.length === 0 ? (
          <div className="flex-1 flex items-center justify-center text-gray-400 text-sm sm:text-base">
            No favorites yet ❤️
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 md:grid-cols-3  gap-x-5 gap-y-12 py-12 px-4 sm:px-4 overflow-y-auto no-scrollbar flex-1"
            
          >
            {wishlist.map((dish) => (
              <DishCard key={dish.id} dish={dish} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default Wishlist;
