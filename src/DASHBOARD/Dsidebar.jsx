import { useNavigate, useLocation } from "react-router-dom";
import Logo from "../assets/logo.svg";

const Dsidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const menu = [
    { label: "Category", path: "category" },
    { label: "Products", path: "products" },
    { label: "Orders", path: "orders" },
  ];

  return (
    <aside className="hidden md:flex md:flex-col h-screen w-60 bg-gray-300 border-r">
      {/* LOGO + HEADING */}
      <div className="flex items-center gap-3 px-6 py-4">
        <img src={Logo} alt="Chef Kitchen Logo" className="w-10 h-10" />
        <h1 className="text-lg font-semibold tracking-wide text-slate-800">
          Chef Kitchen
        </h1>
      </div>

      {/* MENU */}
      <div className="flex-1 p-4">
        {menu.map((item) => {
          const isActive = location.pathname.includes(item.path);

          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`w-full mb-2 px-4 py-3 rounded-md text-left text-sm font-medium transition
                ${
                  isActive
                    ? "bg-orange-500 text-black"
                    : "text-black hover:bg-slate-800 hover:text-white"
                }`}
            >
              {item.label}
            </button>
          );
        })}
      </div>
    </aside>
  );
};

export default Dsidebar;
