import { BrowserRouter, Routes, Route, Navigate, Link } from "react-router-dom";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import CategoryCard from "./components/CategoryCard";
import ProductCard from "./components/ProductCard";

import Products from "./pages/Products";
import CategoryProducts from "./pages/CategoryProducts";
import ProductDetails from "./pages/ProductDetails";
import Contact from "./pages/Contact";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Admin from "./pages/Admin";
import AdminLogin from "./pages/AdminLogin";

import categories from "./data/categories";
import products from "./data/products";

function Home() {
  return (
    <main className="bg-slate-950 text-white">

      {/* HERO */}
      <Hero />

      {/* CATEGORIES */}
      <section
        id="categories"
        className="scroll-mt-24 border-t border-slate-800 bg-slate-950 py-16 sm:py-20"
      >
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">

          <div className="mb-10 text-center">
            <p className="font-semibold uppercase tracking-[0.2em] text-blue-400">
              Shop by Category
            </p>

            <h2 className="mt-3 text-3xl font-black text-white md:text-4xl">
              Find the Right Hardware
            </h2>

            <p className="mx-auto mt-4 max-w-2xl text-slate-400">
              Explore our wide range of quality hardware products for
              professional work, home projects and workshops.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((category) => (
              <CategoryCard
                key={category.id}
                category={category}
              />
            ))}
          </div>

        </div>
      </section>

      {/* FEATURED PRODUCTS */}
      <section
        id="products"
        className="scroll-mt-24 border-t border-slate-800 bg-slate-900 py-16 sm:py-20"
      >
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">

          <div className="mb-10 text-center">
            <p className="font-semibold uppercase tracking-[0.2em] text-blue-400">
              Featured Products
            </p>

            <h2 className="mt-3 text-3xl font-black text-white md:text-4xl">
              Popular Hardware Products
            </h2>

            <p className="mx-auto mt-4 max-w-2xl text-slate-400">
              Discover quality tools and hardware products for your
              professional and home projects.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
              />
            ))}
          </div>

        </div>
      </section>

      {/* WHY HARDWAREHUB */}
      <section
        id="about"
        className="scroll-mt-24 border-t border-slate-800 bg-slate-950 py-16 sm:py-20"
      >
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">

          <div className="mb-12 text-center">
            <p className="font-semibold uppercase tracking-[0.2em] text-blue-400">
              Why HardwareHub?
            </p>

            <h2 className="mt-3 text-3xl font-black text-white md:text-4xl">
              Everything You Need in One Place
            </h2>

            <p className="mx-auto mt-4 max-w-2xl text-slate-400">
              We make it easier to find reliable hardware products
              for professional and everyday projects.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">

            {/* QUALITY */}
            <div className="group rounded-2xl border border-slate-800 bg-slate-900 p-8 text-center shadow-lg shadow-black/20 transition duration-300 hover:-translate-y-2 hover:border-blue-500/60">

              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-blue-500/20 bg-blue-500/10 text-4xl transition group-hover:scale-110">
                🛠️
              </div>

              <h3 className="mt-6 text-xl font-bold text-white">
                Quality Products
              </h3>

              <p className="mt-3 leading-7 text-slate-400">
                Reliable hardware products selected for professional
                and everyday projects.
              </p>

            </div>

            {/* DELIVERY */}
            <div className="group rounded-2xl border border-slate-800 bg-slate-900 p-8 text-center shadow-lg shadow-black/20 transition duration-300 hover:-translate-y-2 hover:border-blue-500/60">

              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-blue-500/20 bg-blue-500/10 text-4xl transition group-hover:scale-110">
                🚚
              </div>

              <h3 className="mt-6 text-xl font-bold text-white">
                Fast Delivery
              </h3>

              <p className="mt-3 leading-7 text-slate-400">
                Get your tools and hardware delivered conveniently
                to your location.
              </p>

            </div>

            {/* SUPPORT */}
            <div className="group rounded-2xl border border-slate-800 bg-slate-900 p-8 text-center shadow-lg shadow-black/20 transition duration-300 hover:-translate-y-2 hover:border-blue-500/60">

              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-blue-500/20 bg-blue-500/10 text-4xl transition group-hover:scale-110">
                💬
              </div>

              <h3 className="mt-6 text-xl font-bold text-white">
                Customer Support
              </h3>

              <p className="mt-3 leading-7 text-slate-400">
                Get help choosing the right hardware products for
                your requirements.
              </p>

            </div>

          </div>
        </div>
      </section>

      {/* CALL TO ACTION */}
      <section className="border-t border-slate-700 bg-slate-800 py-16 sm:py-20">
        <div className="mx-auto max-w-4xl px-5 text-center">

          <p className="font-semibold uppercase tracking-[0.2em] text-blue-300">
            HardwareHub
          </p>

          <h2 className="mt-3 text-3xl font-black text-white md:text-4xl">
            Ready for Your Next Project?
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-slate-300">
            Explore our hardware collection and find the tools
            you need today.
          </p>

          <Link
            to="/products"
            className="mt-8 inline-flex items-center justify-center rounded-lg bg-blue-500 px-7 py-3 font-semibold text-white shadow-lg shadow-blue-900/30 transition duration-300 hover:-translate-y-0.5 hover:bg-blue-400"
          >
            Browse Products
            <span className="ml-2">→</span>
          </Link>

        </div>
      </section>

      {/* CONTACT */}
      <section
        id="contact"
        className="scroll-mt-24 border-t border-slate-800"
      >
        <Contact />
      </section>

    </main>
  );
}


/* PROTECTED ADMIN ROUTE */
function ProtectedAdmin() {
  const isAdmin = localStorage.getItem("adminLoggedIn") === "true";

  if (!isAdmin) {
    return <Navigate to="/admin-login" replace />;
  }

  return <Admin />;
}


function App() {
  return (
    <BrowserRouter>

      <Navbar />

      <Routes>

        {/* HOME */}
        <Route
          path="/"
          element={<Home />}
        />

        {/* ALL PRODUCTS */}
        <Route
          path="/products"
          element={<Products />}
        />

        {/* CATEGORY PRODUCTS */}
        <Route
          path="/categories/:category"
          element={<CategoryProducts />}
        />

        {/* PRODUCT DETAILS */}
        <Route
          path="/products/:id"
          element={<ProductDetails />}
        />

        {/* CART */}
        <Route
          path="/cart"
          element={<Cart />}
        />

        {/* CHECKOUT */}
        <Route
          path="/checkout"
          element={<Checkout />}
        />

        {/* NORMAL USER LOGIN */}
        <Route
          path="/login"
          element={<Login />}
        />

        {/* REGISTER */}
        <Route
          path="/register"
          element={<Register />}
        />

        {/* ADMIN LOGIN */}
        <Route
          path="/admin-login"
          element={<AdminLogin />}
        />

        {/* PROTECTED ADMIN DASHBOARD */}
        <Route
          path="/admin"
          element={<ProtectedAdmin />}
        />

      </Routes>

    </BrowserRouter>
  );
}

export default App;