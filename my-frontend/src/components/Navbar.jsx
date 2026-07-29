import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../stores/AuthStore";

const Navbar = () => {
  const navigate = useNavigate();

  const { logout, user } = useAuthStore();

  const handleLogOut = () => {
    logout();
    navigate("/landing");
  };

  return (
    <div className="navbar bg-base-100 border-b border-base-300 px-6 shadow-sm">

      {/* Logo */}

      <div className="flex-1">
        <Link
          to="/home"
          className="text-2xl font-bold text-primary hover:scale-105 transition-transform"
        >
          🍽️ HungerGames
        </Link>
      </div>

      {/* Right Side */}

      <div className="flex items-center gap-3">

        <div className="dropdown dropdown-end">

          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            <div className="w-11 rounded-full ring ring-primary ring-offset-2 ring-offset-base-100">

              <img
                src={user?.userImg}
                alt={user?.name}
              />

            </div>
          </div>

         <ul
  tabIndex={0}
  className="menu menu-sm dropdown-content mt-3 w-56 rounded-box bg-base-100 shadow-xl border border-base-300 z-[1]"
>

  <li className="menu-title">
    <span>{user?.name}</span>
  </li>

  <li>
    <Link to="/profile">
      👤 Profile
    </Link>
  </li>

  <li>
    <label className="flex justify-between items-center px-4 py-2 cursor-pointer">
      <span>🌞 Light Theme</span>

      <input
        type="checkbox"
        className="toggle toggle-primary"
        onChange={(e) =>
          document.documentElement.setAttribute(
            "data-theme",
            e.target.checked ? "light" : "dark"
          )
        }
      />
    </label>
  </li>

  <div className="divider my-1"></div>

  <li>
    <button
      onClick={handleLogOut}
      className="text-error"
    >
      🚪 Logout
    </button>
  </li>

</ul>

        </div>

      </div>

    </div>
  );
};

export default Navbar;