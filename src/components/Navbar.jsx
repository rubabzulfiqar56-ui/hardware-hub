import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { readStorage, removeStorage } from "../utils/storage";

function Icon({ children, className = "h-5 w-5" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}

function Navbar() {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState(null);
  const { cartCount } = useCart();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const savedUser = readStorage("user", null);
    setUser(savedUser?.isLoggedIn ? savedUser : null);
    setOpen(false);
  }, [location.pathname]);

  const handleLogout = () => {
    removeStorage("user");
    setUser(null);
    setOpen(false);
    navigate("/");
  };

  const scrollToHomeSection = (id) => {
    setOpen(false);

    if (location.pathname === "/") {
      document.getElementById(id)?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
      return;
    }

    navigate(`/#${id}`);
  };

  const linkClass = (path) =>
    `nav-link ${location.pathname === path ? "nav-link-active" : ""}`;

  return (
    <nav className="sticky top-0 z-50 border-b border-slate-700 bg-slate-900/95 shadow-lg backdrop-blur-md">
      <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-5 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-3" aria-label="HardwareHub home">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white shadow-lg shadow-blue-600/30">
            <Icon>
              <path d="m14.5 6.5 3-3 3 3-3 3" />
              <path d="m3.5 20.5 6-6" />
              <path d="m8 8 8 8" />
              <path d="m15.5 12.5 2-2 4 4-2 2z" />
            </Icon>
          </div>
          <span className="text-xl font-extrabold tracking-tight text-white sm:text-2xl">
            Hardware<span className="text-blue-400">Hub</span>
          </span>
        </Link>

        <div className="hidden items-center gap-7 lg:flex">
          <Link to="/" className={linkClass("/")}>Home</Link>
          <Link to="/products" className={linkClass("/products")}>Products</Link>
          <button type="button" onClick={() => scrollToHomeSection("categories")} className="nav-link">
            Categories
          </button>
          <button type="button" onClick={() => scrollToHomeSection("about")} className="nav-link">
            About
          </button>
          <button type="button" onClick={() => scrollToHomeSection("contact")} className="nav-link">
            Contact
          </button>
        </div>

        <div className="hidden items-center gap-2.5 md:flex">
          <Link
            to="/cart"
            className="flex items-center gap-1.5 rounded-lg border border-slate-600 bg-slate-800 px-3.5 py-2 text-sm font-semibold text-slate-200 transition hover:border-blue-500 hover:bg-blue-600 hover:text-white"
          >
            <Icon className="h-[18px] w-[18px]">
              <path d="M3 4h2l2.2 10.2a2 2 0 0 0 2 1.6h7.9a2 2 0 0 0 1.9-1.5L21 7H6" />
              <circle cx="9" cy="20" r="1" />
              <circle cx="18" cy="20" r="1" />
            </Icon>
            Cart
            <span className="grid h-5 min-w-5 place-items-center rounded-full bg-blue-600 px-1 text-[11px] text-white">
              {cartCount}
            </span>
          </Link>

          <Link
            to="/admin-login"
            className="rounded-lg border border-blue-500/40 bg-blue-500/10 px-3 py-2 text-sm font-bold text-blue-400 transition hover:border-blue-500 hover:bg-blue-600 hover:text-white"
          >
            Admin
          </Link>

          {user ? (
            <>
              <div className="flex items-center gap-2 rounded-lg border border-slate-700 bg-slate-800 px-3 py-2">
                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-blue-600 text-sm font-bold text-white">
                  {user.name?.charAt(0).toUpperCase() || "U"}
                </div>
                <span className="max-w-[100px] truncate text-sm font-semibold text-white">
                  {user.name}
                </span>
              </div>
              <button
                onClick={handleLogout}
                className="rounded-lg border border-red-500/50 bg-red-500/10 px-4 py-2 text-sm font-bold text-red-400 transition hover:bg-red-500 hover:text-white"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              to="/login"
              className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-bold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-500"
            >
              Login
            </Link>
          )}
        </div>

        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          aria-label={open ? "Close navigation menu" : "Open navigation menu"}
          className="rounded-lg border border-slate-700 bg-slate-800 p-2 text-slate-200 lg:hidden"
        >
          <Icon>
            {open ? (
              <>
                <path d="m6 6 12 12" />
                <path d="m18 6-12 12" />
              </>
            ) : (
              <>
                <path d="M4 6h16" />
                <path d="M4 12h16" />
                <path d="M4 18h16" />
              </>
            )}
          </Icon>
        </button>
      </div>

      {open && (
        <div className="border-t border-slate-700 bg-slate-900 px-5 py-4 lg:hidden">
          <div className="flex flex-col gap-1">
            <Link to="/" onClick={() => setOpen(false)} className="rounded-lg px-3 py-3 font-semibold text-slate-300 hover:bg-slate-800 hover:text-blue-400">
              Home
            </Link>
            <Link to="/products" onClick={() => setOpen(false)} className="rounded-lg px-3 py-3 font-semibold text-slate-300 hover:bg-slate-800 hover:text-blue-400">
              Products
            </Link>
            <button type="button" onClick={() => scrollToHomeSection("categories")} className="rounded-lg px-3 py-3 text-left font-semibold text-slate-300 hover:bg-slate-800 hover:text-blue-400">
              Categories
            </button>
            <button type="button" onClick={() => scrollToHomeSection("about")} className="rounded-lg px-3 py-3 text-left font-semibold text-slate-300 hover:bg-slate-800 hover:text-blue-400">
              About
            </button>
            <button type="button" onClick={() => scrollToHomeSection("contact")} className="rounded-lg px-3 py-3 text-left font-semibold text-slate-300 hover:bg-slate-800 hover:text-blue-400">
              Contact
            </button>
            <Link to="/admin-login" onClick={() => setOpen(false)} className="mt-2 rounded-lg border border-blue-500/40 bg-blue-500/10 px-4 py-3 text-center font-bold text-blue-400 transition hover:bg-blue-600 hover:text-white">
              ⚙ Admin Login
            </Link>
            <Link to="/cart" onClick={() => setOpen(false)} className="mt-2 flex items-center justify-center gap-2 rounded-lg border border-blue-500 px-4 py-3 font-semibold text-blue-400 hover:bg-blue-600 hover:text-white">
              🛒 Cart
              <span className="grid h-5 min-w-5 place-items-center rounded-full bg-blue-600 px-1 text-xs text-white">
                {cartCount}
              </span>
            </Link>

            {user ? (
              <>
                <div className="mt-2 flex items-center justify-center gap-2 rounded-lg border border-slate-700 bg-slate-800 px-4 py-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 font-bold text-white">
                    {user.name?.charAt(0).toUpperCase() || "U"}
                  </div>
                  <span className="font-semibold text-white">{user.name}</span>
                </div>
                <button onClick={handleLogout} className="rounded-lg bg-red-600 px-4 py-3 text-center font-semibold text-white hover:bg-red-500">
                  Logout
                </button>
              </>
            ) : (
              <Link to="/login" onClick={() => setOpen(false)} className="rounded-lg bg-blue-600 px-4 py-3 text-center font-semibold text-white hover:bg-blue-500">
                Login
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
