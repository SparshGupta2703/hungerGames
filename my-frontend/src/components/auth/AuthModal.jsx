import { useEffect } from "react";
import { Broccoli, X } from "lucide-react";

import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";

const AuthModal = ({
  open,
  setOpen,
  mode,
  setMode,
}) => {

  useEffect(() => {

    const handleEscape = (e) => {
      if (e.key === "Escape") {
        setOpen(false);
      }
    };

    window.addEventListener("keydown", handleEscape);

    return () => window.removeEventListener("keydown", handleEscape);

  }, [setOpen]);

  if (!open) return null;

  return (

    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm px-5"
      onClick={() => setOpen(false)}
    >

      <div

        onClick={(e) => e.stopPropagation()}

        className="relative w-full max-w-md rounded-3xl border border-base-300 bg-base-100 shadow-2xl p-8 animate-in fade-in zoom-in duration-200"

      >

        {/* Close */}

        <button

          onClick={() => setOpen(false)}

          className="btn btn-circle btn-sm btn-ghost absolute right-4 top-4"

        >

          <X size={18} />

        </button>

        {/* Heading */}

        <div className="mb-8">

          <div className="w-14 h-14 rounded-2xl bg-primary text-primary-content flex items-center justify-center text-xl font-black">

            <Broccoli/>

          </div>

          <h1 className="text-3xl font-black mt-5">

            {mode === "login"
              ? "Welcome Back "
              : "Create your Account"}

          </h1>

          <p className="opacity-60 mt-2">

            {mode === "login"
              ? "Login to continue your healthy journey."
              : "Join HungerGames and start competing."}

          </p>

        </div>

        {/* Forms */}

        {mode === "login" ? (

          <LoginForm
            closeModal={() => setOpen(false)}
          />

        ) : (

          <SignupForm
            closeModal={() => setOpen(false)}
          />

        )}

        {/* Switch */}

        <div className="divider my-6">
          OR
        </div>

        <p className="text-center text-sm">

          {mode === "login"
            ? "Don't have an account?"
            : "Already have an account?"}

          <button

            className="ml-2 font-semibold text-primary hover:underline"

            onClick={() =>
              setMode(
                mode === "login"
                  ? "signup"
                  : "login"
              )
            }

          >

            {mode === "login"
              ? "Sign Up"
              : "Login"}

          </button>

        </p>

      </div>

    </div>

  );
};

export default AuthModal;