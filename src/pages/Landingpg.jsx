import { useNavigate } from "react-router-dom";   
import Salad from "../assets/salad.svg";
import logo from "../assets/logo.svg";

export default function Landingpg() {

  const navigate = useNavigate();   

  return (
    <div
      className="h-screen bg-cover bg-center w-full flex items-center justify-center p-4 relative overflow-hidden"
      style={{ backgroundImage: `url(${Salad})` }}
      id="Header"
    >
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />

      <section className="relative z-10 w-full max-w-[360px]">

        <div className="p-[3px] rounded-[18px] flex justify-center">
          <div className="rounded-[14px] relative">

            <img
              src={Salad}
              alt="Chef Kitchen hero"
              className="object-cover w-full h-[400px]"
            />

            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
              <div className="p-[3px] rounded-full">
                <div
                  className="w-32 h-32 rounded-full bg-white/10 backdrop-blur-lg border border-white/10 flex items-center justify-center"
                  style={{ boxShadow: "0 12px 30px rgba(0,0,0,0.6)" }}
                >
                  <img
                    src={logo}
                    alt="logo"
                    className="w-24 h-24 object-contain z-10"
                  />
                </div>
              </div>
            </div>

          </div>
        </div>

        <div className="mt-6 relative z-30 text-center px-1 -translate-y-2 font-sans">
          <h1
            className="text-white"
            style={{ fontSize: "30px", lineHeight: "34px", letterSpacing: "-0.01em" }}
          >
            Welcome to Chef Kitchen
          </h1>

          <p
            className="text-gray-300 mt-2 mx-auto"
            style={{ fontSize: "13px", maxWidth: "320px", lineHeight: "18px" }}
          >
            Check out the awesome food experience! It's super fresh, quick, and oh-so tasty!
          </p>

          <button
            onClick={() => navigate("/home")}   
            className="mt-5 w-full rounded-xl font-medium shadow-lg"
            style={{
              background:
                "linear-gradient(180deg,#ff8a3d 0%, #ffb86c 100%)",
              color: "#000",
              padding: "12px 18px",
              boxShadow: "0 8px 24px rgba(255,140,60,0.18)",
            }}
          >
            Explore Menu
          </button>
        </div>

      </section>
    </div>
  );
}


