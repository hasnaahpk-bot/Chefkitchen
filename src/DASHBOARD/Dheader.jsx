import { FaBell, FaUserCircle } from "react-icons/fa";

const Dheader = ({ title = "Dashboard" }) => {
  return (
    <header className="
      w-full h-14 sm:h-16
      bg-gray-200 border-b border-slate-300
      flex items-center justify-between
      px-3 sm:px-6
    ">
      {/* LEFT: PAGE TITLE */}
      <h2 className="
        text-base sm:text-lg
        font-semibold text-black
        truncate
      ">
        {title}
      </h2>

      {/* RIGHT: ACTIONS */}
      <div className="flex items-center gap-3 sm:gap-4">
        {/* NOTIFICATION */}
        <button
          className="relative text-black hover:text-slate-700 transition"
          aria-label="Notifications"
        >
          <FaBell size={18} />
          <span className="absolute -top-1 -right-1 w-2 h-2 bg-orange-500 rounded-full" />
        </button>

        {/* USER */}
        <button
          className="flex items-center gap-2 text-black hover:text-slate-700 transition"
          aria-label="User menu"
        >
          <FaUserCircle size={22} />
          <span className="text-sm font-medium hidden md:block">
            Admin
          </span>
        </button>
      </div>
    </header>
  );
};

export default Dheader;
