import { useEffect, useState } from "react";
import { useCart } from "../context/CartContext";

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

  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem("user"));

    if (savedUser && savedUser.isLoggedIn) {
      setUser(savedUser);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    setOpen(false);
    window.location.href = "/";
  };

  return (
    <>
      {/* TOP BAR */}
      <div className="hidden bg-slate-950 text-slate-300 md:block">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-2 text-xs">
          <div className="flex gap-6">
            <span>☎ +92 300 1234567</span>
            <span>✉ support@hardwarehub.com</span>
          </div>

          <span className="font-semibold text-blue-400">
            Free Delivery on orders over PKR 5,000
          </span>

          <div className="flex gap-5">
            <span className="cursor-pointer hover:text-white">
              Track Order
            </span>

            <span className="cursor-pointer hover:text-white">
              Help Center
            </span>
          </div>
        </div>
      </div>

      {/* NAVBAR */}
      <nav className="sticky top-0 z-50 border-b border-slate-700 bg-slate-900/95 shadow-lg backdrop-blur-md">
        <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-5 sm:px-6 lg:px-8">

          {/* LOGO */}
          <a href="/" className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white shadow-lg shadow-blue-600/30">
              <Icon>
                <path d="m14.5 6.5 3-3 3 3-3 3" />
                <path d="m3.5 20.5 6-6" />
                <path d="m8 8 8 8" />
                <path d="m15.5 12.5 2-2 4 4-2 2z" />
              </Icon>
            </div>

            <span className="text-xl font-extrabold tracking-tight text-white sm:text-2xl">
              Hardware
              <span className="text-blue-400">Hub</span>
            </span>
          </a>

          {/* DESKTOP MENU */}
          <div className="hidden items-center gap-7 lg:flex">
            <a href="/" className="nav-link nav-link-active">
              Home
            </a>

            <a href="/products" className="nav-link">
              Products
            </a>

            <a href="/#categories" className="nav-link">
              Categories
            </a>

            <a href="/#about" className="nav-link">
              About
            </a>

            <a href="/#contact" className="nav-link">
              Contact
            </a>
          </div>

          {/* RIGHT SIDE */}
          <div className="hidden items-center gap-2.5 md:flex">

            {/* SEARCH */}
            <div className="hidden items-center rounded-lg border border-slate-700 bg-slate-800 px-3 xl:flex">
              <Icon className="h-4 w-4 text-slate-400">
                <circle cx="11" cy="11" r="7" />
                <path d="m20 20-4-4" />
              </Icon>

              <input
                className="w-44 bg-transparent px-2 py-2 text-sm text-white outline-none placeholder:text-slate-500"
                placeholder="Search products..."
              />
            </div>

            {/* CART */}
            <a
              href="/cart"
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
            </a>

            {/* ADMIN */}
            <a
              href="/admin"
              className="rounded-lg border border-blue-500/40 bg-blue-500/10 px-3 py-2 text-sm font-bold text-blue-400 transition hover:border-blue-500 hover:bg-blue-600 hover:text-white"
            >
              Admin
            </a>

            {/* USER / LOGIN */}
            {user ? (
              <>
                <div className="flex items-center gap-2 rounded-lg border border-slate-700 bg-slate-800 px-3 py-2">
                  <div className="flex h-7 w-7 items-center justify-center rounded-full bg-blue-600 text-sm font-bold text-white">
                    {user.name
                      ? user.name.charAt(0).toUpperCase()
                      : "U"}
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
              <a
                href="/login"
                className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-bold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-500"
              >
                Login
              </a>
            )}
          </div>

          {/* MOBILE MENU BUTTON */}
          <button
            onClick={() => setOpen(!open)}
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

        {/* MOBILE MENU */}
        {open && (
          <div className="border-t border-slate-700 bg-slate-900 px-5 py-4 lg:hidden">
            <div className="flex flex-col gap-1">

              {["Home", "Products", "Categories", "About", "Contact"].map(
                (item) => (
                  <a
                    key={item}
                    href={
                      item === "Home"
                        ? "/"
                        : item === "Products"
                          ? "/products"
                          : `/#${item.toLowerCase()}`
                    }
                    onClick={() => setOpen(false)}
                    className="rounded-lg px-3 py-3 font-semibold text-slate-300 hover:bg-slate-800 hover:text-blue-400"
                  >
                    {item}
                  </a>
                )
              )}

              {/* MOBILE ADMIN */}
              <a
                href="/admin"
                onClick={() => setOpen(false)}
                className="mt-2 rounded-lg border border-blue-500/40 bg-blue-500/10 px-4 py-3 text-center font-bold text-blue-400 transition hover:bg-blue-600 hover:text-white"
              >
                ⚙ Admin Dashboard
              </a>

              {/* MOBILE CART */}
              <a
                href="/cart"
                onClick={() => setOpen(false)}
                className="mt-2 flex items-center justify-center gap-2 rounded-lg border border-blue-500 px-4 py-3 font-semibold text-blue-400 hover:bg-blue-600 hover:text-white"
              >
                🛒 Cart

                <span className="grid h-5 min-w-5 place-items-center rounded-full bg-blue-600 px-1 text-xs text-white">
                  {cartCount}
                </span>
              </a>

              {/* MOBILE USER */}
              {user ? (
                <>
                  <div className="mt-2 flex items-center justify-center gap-2 rounded-lg border border-slate-700 bg-slate-800 px-4 py-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 font-bold text-white">
                      {user.name
                        ? user.name.charAt(0).toUpperCase()
                        : "U"}
                    </div>

                    <span className="font-semibold text-white">
                      {user.name}
                    </span>
                  </div>

                  <button
                    onClick={handleLogout}
                    className="rounded-lg bg-red-600 px-4 py-3 text-center font-semibold text-white hover:bg-red-500"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <a
                  href="/login"
                  onClick={() => setOpen(false)}
                  className="rounded-lg bg-blue-600 px-4 py-3 text-center font-semibold text-white hover:bg-blue-500"
                >
                  Login
                </a>
              )}
            </div>
          </div>
        )}
      </nav>
    </>
  );
}

export default Navbar;

