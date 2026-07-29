import { useEffect, useState } from "react";
import { Broccoli, Menu, X } from "lucide-react";

const LandingNavbar = ({ onLogin, onSignup }) => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToFeatures = () => {
    document
      .getElementById("features")
      ?.scrollIntoView({ behavior: "smooth" });

    setOpen(false);
  };

  return (
    <div
      className={`navbar fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 lg:px-12 ${
        scrolled
          ? "bg-base-100/80 backdrop-blur-xl shadow-lg border-b border-base-300"
          : "bg-transparent"
      }`}
    >
      <div className="navbar-start">

        <button
          className="btn btn-ghost p-0 hover:bg-transparent"
          onClick={() =>
            window.scrollTo({
              top: 0,
              behavior: "smooth",
            })
          }
        >
          <div className="w-11 h-11 rounded-xl bg-primary text-primary-content flex items-center justify-center font-black text-lg">
           <Broccoli />
          </div>

          <div className="ml-3 text-left hidden sm:block">
            <h1 className="font-black text-xl">
              HungerGames
            </h1>

            <p className="text-xs opacity-60">
              Healthy Competition
            </p>
          </div>
        </button>

      </div>

      {/* Desktop */}

      <div className="navbar-center hidden lg:flex">

        <ul className="menu menu-horizontal gap-2 text-base font-medium">

          <li>
            <button
              className="hover:text-primary transition-colors"
              onClick={scrollToFeatures}
            >
              Features
            </button>
          </li>

          <li>
            <button
              className="hover:text-primary transition-colors"
              onClick={() =>
                window.scrollTo({
                  top: document.body.scrollHeight,
                  behavior: "smooth",
                })
              }
            >
              About
            </button>
          </li>

        </ul>

      </div>

      <div className="navbar-end hidden lg:flex gap-3">

        <button
          className="btn btn-ghost rounded-full"
          onClick={onLogin}
        >
          Login
        </button>

        <button
          className="btn btn-primary rounded-full px-6"
          onClick={onSignup}
        >
          Sign Up
        </button>

      </div>

      {/* Mobile */}

      <div className="navbar-end lg:hidden">

        <button
          className="btn btn-square btn-ghost"
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>

      </div>

      {open && (
        <div className="absolute top-full left-4 right-4 mt-2 rounded-2xl bg-base-100 shadow-2xl border border-base-300 p-4 lg:hidden">

          <div className="flex flex-col gap-3">

            <button
              className="btn btn-ghost justify-start"
              onClick={scrollToFeatures}
            >
              Features
            </button>

            <button
              className="btn btn-ghost justify-start"
              onClick={() => {
                window.scrollTo({
                  top: document.body.scrollHeight,
                  behavior: "smooth",
                });
                setOpen(false);
              }}
            >
              About
            </button>

            <div className="divider my-1"></div>

            <button
              className="btn btn-outline"
              onClick={() => {
                onLogin();
                setOpen(false);
              }}
            >
              Login
            </button>

            <button
              className="btn btn-primary"
              onClick={() => {
                onSignup();
                setOpen(false);
              }}
            >
              Sign Up
            </button>

          </div>

        </div>
      )}
    </div>
  );
};

export default LandingNavbar;