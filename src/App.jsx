import { lazy, Suspense } from "react";
import {
  BrowserRouter,
  Link,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import CategoryCard from "./components/CategoryCard";
import ProductCard from "./components/ProductCard";
import Contact from "./pages/Contact";
import categories from "./data/categories";
import products from "./data/products";
import { readStorage } from "./utils/storage";

const Products = lazy(() => import("./pages/Products"));
const CategoryProducts = lazy(() => import("./pages/CategoryProducts"));
const ProductDetails = lazy(() => import("./pages/ProductDetails"));
const Cart = lazy(() => import("./pages/Cart"));
const Checkout = lazy(() => import("./pages/Checkout"));
const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));
const Admin = lazy(() => import("./pages/Admin"));
const AdminLogin = lazy(() => import("./pages/AdminLogin"));
const Categories = lazy(() => import("./pages/Categories"));
const About = lazy(() => import("./pages/About"));

function PageLoader() {
  return (
    <div className="flex min-h-[50vh] items-center justify-center bg-slate-950 text-slate-300">
      <div className="flex items-center gap-3 rounded-xl border border-slate-800 bg-slate-900 px-5 py-4">
        <span
          className="h-5 w-5 animate-spin rounded-full border-2 border-slate-600 border-t-blue-500"
          aria-hidden="true"
        />
        <span className="text-sm font-semibold">Loading…</span>
      </div>
    </div>
  );
}

function Home() {
  // Only render the first six featured products on the home page.
  // The complete catalogue remains available on /products.
  const featuredProducts = products.slice(0, 6);

  return (
    <main className="bg-slate-950 text-white">
      <Hero />

      <section
        id="categories"
        className="scroll-mt-24 border-t border-slate-800 bg-slate-950 py-16 sm:py-20"
      >
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
          <div className="mb-10 text-center">
            <p className="font-semibold uppercase tracking-[0.2em] text-blue-400">
              Shop by Category
            </p>
            <h2 className="mt-3 text-3xl font-black md:text-4xl">
              Find the Right Hardware
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-slate-400">
              Explore our wide range of quality hardware products for
              professional work, home projects and workshops.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((category) => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </div>
        </div>
      </section>

      <section
        id="products"
        className="scroll-mt-24 border-t border-slate-800 bg-slate-900 py-16 sm:py-20"
      >
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
          <div className="mb-10 text-center">
            <p className="font-semibold uppercase tracking-[0.2em] text-blue-400">
              Featured Products
            </p>
            <h2 className="mt-3 text-3xl font-black md:text-4xl">
              Popular Hardware Products
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-slate-400">
              Discover quality tools and hardware products for your
              professional and home projects.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link
              to="/products"
              className="inline-flex rounded-xl border border-slate-700 bg-slate-800 px-6 py-3 font-bold text-white transition hover:border-blue-500 hover:bg-slate-700"
            >
              View All Products →
            </Link>
          </div>
        </div>
      </section>

      <section
        id="about"
        className="scroll-mt-24 border-t border-slate-800 bg-slate-950 py-16 sm:py-20"
      >
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <p className="font-semibold uppercase tracking-[0.2em] text-blue-400">
              Why HardwareHub?
            </p>
            <h2 className="mt-3 text-3xl font-black md:text-4xl">
              Everything You Need in One Place
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-slate-400">
              We make it easier to find reliable hardware products for
              professional and everyday projects.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {[
              ["🛠️", "Quality Products", "Reliable hardware products selected for professional and everyday projects."],
              ["🚚", "Fast Delivery", "Get your tools and hardware delivered conveniently to your location."],
              ["💬", "Customer Support", "Get help choosing the right hardware products for your requirements."],
            ].map(([icon, title, text]) => (
              <div
                key={title}
                className="group rounded-2xl border border-slate-800 bg-slate-900 p-8 text-center shadow-lg shadow-black/20 transition duration-300 hover:-translate-y-2 hover:border-blue-500/60"
              >
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-blue-500/20 bg-blue-500/10 text-4xl transition group-hover:scale-110">
                  {icon}
                </div>
                <h3 className="mt-6 text-xl font-bold">{title}</h3>
                <p className="mt-3 leading-7 text-slate-400">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-slate-700 bg-slate-800 py-16 sm:py-20">
        <div className="mx-auto max-w-4xl px-5 text-center">
          <p className="font-semibold uppercase tracking-[0.2em] text-blue-300">
            HardwareHub
          </p>
          <h2 className="mt-3 text-3xl font-black md:text-4xl">
            Ready for Your Next Project?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-slate-300">
            Explore our hardware collection and find the tools you need today.
          </p>
          <Link
            to="/products"
            className="mt-8 inline-flex items-center justify-center rounded-lg bg-blue-500 px-7 py-3 font-semibold text-white shadow-lg shadow-blue-900/30 transition duration-300 hover:-translate-y-0.5 hover:bg-blue-400"
          >
            Browse Products <span className="ml-2">→</span>
          </Link>
        </div>
      </section>

      <section id="contact" className="scroll-mt-24 border-t border-slate-800">
        <Contact />
      </section>
    </main>
  );
}

function ProtectedAdmin() {
  const isAdmin = readStorage("adminLoggedIn", false) === true;

  return isAdmin ? <Admin /> : <Navigate to="/admin-login" replace />;
}

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/categories/:category" element={<CategoryProducts />} />
          <Route path="/products/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/admin-login" element={<AdminLogin />} />
          <Route path="/admin" element={<ProtectedAdmin />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
