import { FaBell, FaUserCircle, FaBars, FaTimes } from "react-icons/fa";

const Dheader = ({ title = "Dashboard", sidebarOpen, setSidebarOpen }) => {
  return (
    <header className="
      w-full h-14 sm:h-16
      bg-gray-200 border-b border-slate-300
      flex items-center justify-between
      px-3 sm:px-6
    ">

      {/* LEFT */}
      <div className="flex items-center gap-3">

        {/* MOBILE MENU BUTTON */}
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="md:hidden text-black text-lg"
        >
          {sidebarOpen ? <FaTimes /> : <FaBars />}
        </button>

        <h2 className="
          text-base sm:text-lg
          font-semibold text-black
          truncate
        ">
          {title}
        </h2>

      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-3 sm:gap-4">

        <button className="relative text-black hover:text-slate-700">
          <FaBell size={18} />
          <span className="absolute -top-1 -right-1 w-2 h-2 bg-orange-500 rounded-full" />
        </button>

        <button className="flex items-center gap-2 text-black hover:text-slate-700">
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
