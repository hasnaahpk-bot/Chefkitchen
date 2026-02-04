import { useNavigate, useLocation } from "react-router-dom";
import Logo from "../assets/logo.svg";

const Dsidebar = ({ sidebarOpen, setSidebarOpen }) => {

  const navigate = useNavigate();
  const location = useLocation();

  const menu = [
    { label: "Category", path: "category" },
    { label: "Products", path: "products" },
    { label: "Orders", path: "orders" },
  ];

  return (
    <>
      {/* OVERLAY (mobile) */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
        />
      )}

      {/* SIDEBAR */}
      <aside
        className={`
          fixed md:static z-50
          top-0 left-0
          h-screen 
          w-64
          bg-gray-300 border-r
          transform transition-transform duration-300
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0
        `}
      >

        {/* LOGO */}
        <div className="flex items-center gap-3 px-6 py-4 border-b">

          <img src={Logo} className="w-10 h-10" />

          <h1 className="text-lg font-semibold text-slate-800">
            Chef Kitchen
          </h1>

        </div>

        {/* MENU */}
        <div className="p-4">

          {menu.map(item => {

            const isActive = location.pathname.includes(item.path);

            return (
              <button
                key={item.path}
                onClick={() => {
                  navigate(item.path);
                  setSidebarOpen(false);
                }}
                className={`w-full mb-2 px-4 py-3 rounded-lg text-left text-sm font-medium transition
                  ${
                    isActive
                      ? "bg-orange-500 text-black shadow"
                      : "text-slate-800 hover:bg-slate-800 hover:text-white"
                  }
                `}
              >
                {item.label}
              </button>
            );
          })}

        </div>

      </aside>
    </>
  );
};

export default Dsidebar;
