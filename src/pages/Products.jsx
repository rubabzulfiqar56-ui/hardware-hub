import { useMemo, useState } from "react";
import ProductCard from "../components/ProductCard";
import products from "../data/products";
import categories from "../data/categories";

function Products() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const categoryMatch =
        selectedCategory === "All" ||
        product.category === selectedCategory;

      const searchMatch =
        product.name
          .toLowerCase()
          .includes(search.toLowerCase());

      return categoryMatch && searchMatch;
    });
  }, [search, selectedCategory]);

  return (
    <main className="min-h-screen bg-slate-950 py-12 sm:py-16">

      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">

        {/* ================= HEADER ================= */}

        <div className="text-center">

          <p className="text-sm font-bold uppercase tracking-[0.2em] text-blue-400">
            Our Collection
          </p>

          <h1 className="mt-3 text-4xl font-black text-white sm:text-5xl">
            Featured Products
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-slate-400">
            Explore our collection of quality hardware products
            designed for professionals, workshops and home projects.
          </p>

        </div>

        {/* ================= SEARCH ================= */}

        <div className="mx-auto mt-10 max-w-2xl">

          <div className="flex items-center rounded-xl border border-slate-700 bg-slate-900 px-4 shadow-lg">

            <span className="text-lg text-slate-500">
              🔍
            </span>

            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-transparent px-3 py-4 text-sm text-white outline-none placeholder:text-slate-500"
            />

          </div>

        </div>

        {/* ================= CATEGORY FILTER ================= */}

        <div className="mt-8 flex gap-2 overflow-x-auto pb-2">

          <button
            onClick={() => setSelectedCategory("All")}
            className={`whitespace-nowrap rounded-full px-5 py-2.5 text-sm font-bold transition ${
              selectedCategory === "All"
                ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20"
                : "border border-slate-700 bg-slate-900 text-slate-300 hover:border-blue-500 hover:text-blue-400"
            }`}
          >
            All Products
          </button>

          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() =>
                setSelectedCategory(category.name)
              }
              className={`whitespace-nowrap rounded-full px-5 py-2.5 text-sm font-bold transition ${
                selectedCategory === category.name
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20"
                  : "border border-slate-700 bg-slate-900 text-slate-300 hover:border-blue-500 hover:text-blue-400"
              }`}
            >
              {category.name}
            </button>
          ))}

        </div>

        {/* ================= PRODUCT COUNT ================= */}

        <div className="mt-8 flex items-center justify-between border-b border-slate-800 pb-4">

          <p className="text-sm text-slate-400">
            Showing{" "}
            <span className="font-bold text-white">
              {filteredProducts.length}
            </span>{" "}
            products
          </p>

          <p className="hidden text-sm text-slate-500 sm:block">
            Quality Hardware Collection
          </p>

        </div>

        {/* ================= PRODUCTS ================= */}

        {filteredProducts.length > 0 ? (

          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">

            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
              />
            ))}

          </div>

        ) : (

          <div className="mt-10 rounded-2xl border border-slate-700 bg-slate-900 p-12 text-center">

            <div className="text-5xl">
              🔍
            </div>

            <h2 className="mt-4 text-xl font-bold text-white">
              No Products Found
            </h2>

            <p className="mt-2 text-slate-400">
              Try another product name or category.
            </p>

          </div>

        )}

      </div>

    </main>
  );
}

export default Products;