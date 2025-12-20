// import logoo from "../assets/logoo.svg";

// // ✅ VITE + SVGR CORRECT IMPORTS
// import HomeIcon from "../assets/home_icon.svg?react";
// import OfferIcon from "../assets/offer.svg?react";
// import LikeIcon from "../assets/like.svg?react";
// import MaleIcon from "../assets/male.svg?react";
// import NotifyIcon from "../assets/notify.svg?react";
// import ExitIcon from "../assets/exit.svg?react";
// import { useLocation, useNavigate } from "react-router-dom";

// const Sidebar = () => {
//   const navigate = useNavigate();
//   const location = useLocation();

//   const items = [
//     { Icon: HomeIcon, alt: "Home", path:"/home" },
//     { Icon: OfferIcon, alt: "Offers", path:"/offer" },
//     { Icon: LikeIcon, alt: "Likes", path:"/like" },
//     { Icon: MaleIcon, alt: "Profile", path:"/mail" },
//     { Icon: NotifyIcon, alt: "Notifications", path:"/notify" },
//   ];

//   return (
//     <aside className="bg-slate-950 w-[72px] h-screen py-6 flex flex-col items-center gap-6 shadow-lg overflow-hidden">
      
//       {/* LOGO */}
//       <img src={logoo} alt="Logo" className="w-10 h-10" />

//       {/* ICONS */}
//       <div className="flex flex-col gap-6 py-4">
//         {items.map((item, i) => {
//           const isActive = location.pathname === item.path;
//           return(
//           <button
//             key={i}
//              onClick={() => navigate(item.path)}
//              className="relative w-12 h-12 flex items-center justify-center"
//           >
//             {/* ACTIVE CURVE */}
//             {isActive && (
//               <>
//                 {/* top */}
//                 <div className="absolute top-[-50%] -right-3 w-3 h-5 bg-slate-900" />
//                 <div className="absolute top-[-50%] -right-3 w-3 h-5 bg-slate-950 rounded-br-2xl" />

//                 {/* center */}
//                 <div className="absolute -right-7 w-20 h-14 bg-slate-900 rounded-l-xl transition-all duration-300" />

//                 {/* bottom */}
//                 <div className="absolute bottom-[-50%] -right-3 w-3 h-5 bg-slate-900" />
//                 <div className="absolute bottom-[-50%] -right-3 w-3 h-5 bg-slate-950 rounded-tr-2xl" />
//               </>
//             )}

//             {/* ICON */}
//             <div
//               className={`relative z-10 p-2 rounded-md transition-all duration-300
//                 ${
//                   isActive
//                     ? "bg-[#FF9F43] shadow-[0_0_18px_rgba(249,115,22,0.75)]"
//                     : "bg-transparent hover:shadow-[0_0_16px_rgba(255,159,67,0.55)]"
//                 }`}
//             >
//               <item.Icon
//                 className={`w-5 h-5 transition-all duration-300
//                   ${
//                     isActive
//                       ? "text-white"
//                       : "text-[#FF9F43]"
//                   }`}
//               />
//             </div>
//           </button>
//           );
// })}
//       </div>

//       {/* LOGOUT */}
//       <button onClick={()=> navigate("/")} className="mt-auto w-12 h-12 flex items-center justify-center rounded-xl hover:bg-white/5">
//         <ExitIcon className="w-5 h-5 text-[#FF9F43]" />
//       </button>
//     </aside>
//   );
// };

// export default Sidebar;


import logoo from "../assets/logoo.svg";
import { useLocation, useNavigate } from "react-router-dom";
import { SIDEBAR_ITEMS } from "../CONSTANTS"
import ExitIcon from "../assets/exit.svg?react";


const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const items = SIDEBAR_ITEMS;

  return (
    <aside className="bg-slate-950 w-[72px] h-screen py-6 flex flex-col items-center gap-6 shadow-lg overflow-hidden">
      
      {/* LOGO */}
      <img src={logoo} alt="Logo" className="w-10 h-10" />

      {/* ICONS */}
      <div className="flex flex-col gap-6 py-4">
        {items.map((item, i) => {
          const isActive = location.pathname === item.path;
          return(
          <button
            key={i}
             onClick={() => navigate(item.path)}
             className="relative w-12 h-12 flex items-center justify-center"
          >
            {/* ACTIVE CURVE */}
            {isActive && (
              <>
                {/* top */}
                <div className="absolute top-[-50%] -right-3 w-3 h-5 bg-slate-900" />
                <div className="absolute top-[-50%] -right-3 w-3 h-5 bg-slate-950 rounded-br-2xl" />

                {/* center */}
                <div className="absolute -right-7 w-20 h-14 bg-slate-900 rounded-l-xl transition-all duration-300" />

                {/* bottom */}
                <div className="absolute bottom-[-50%] -right-3 w-3 h-5 bg-slate-900" />
                <div className="absolute bottom-[-50%] -right-3 w-3 h-5 bg-slate-950 rounded-tr-2xl" />
              </>
            )}

            {/* ICON */}
            <div
              className={`relative z-10 p-2 rounded-md transition-all duration-300
                ${
                  isActive
                    ? "bg-[#FF9F43] shadow-[0_0_18px_rgba(249,115,22,0.75)]"
                    : "bg-transparent hover:shadow-[0_0_16px_rgba(255,159,67,0.55)]"
                }`}
            >
              <item.Icon
                className={`w-5 h-5 transition-all duration-300
                  ${
                    isActive
                      ? "text-white"
                      : "text-[#FF9F43]"
                  }`}
              />
            </div>
          </button>
          );
})}
      </div>

      {/* LOGOUT */}
      <button onClick={()=> navigate("/")} className="mt-auto w-12 h-12 flex items-center justify-center rounded-xl hover:bg-white/5">
        <ExitIcon className="w-5 h-5 text-[#FF9F43]" />
      </button>
    </aside>
  );
};

export default Sidebar;