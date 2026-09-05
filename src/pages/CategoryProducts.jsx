import { Link, useParams } from "react-router-dom";
import products from "../data/products";

function CategoryProducts() {
  const { category } = useParams();

  const decodedCategory = decodeURIComponent(category);

  const filteredProducts = products.filter(
    (product) =>
      product.category.toLowerCase() === decodedCategory.toLowerCase()
  );

  return (
    <main className="min-h-screen bg-slate-950 py-14 sm:py-20">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">

        {/* HEADER */}
        <div className="mb-12 text-center">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-blue-400">
            Category
          </p>

          <h1 className="mt-3 text-4xl font-black text-white sm:text-5xl">
            {decodedCategory}
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-slate-400">
            Explore all products available in the {decodedCategory} category.
          </p>
        </div>

        {/* PRODUCTS */}
        {filteredProducts.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredProducts.map((product) => (
              <article
                key={product.id}
                className="group overflow-hidden rounded-2xl border border-slate-700 bg-slate-900 shadow-lg transition duration-300 hover:-translate-y-1 hover:border-blue-500 hover:shadow-blue-950/30"
              >
                {/* IMAGE */}
                <div className="h-56 overflow-hidden bg-slate-800">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  />
                </div>

                {/* CONTENT */}
                <div className="p-5">
                  <p className="text-xs font-bold uppercase tracking-wider text-blue-400">
                    {product.category}
                  </p>

                  <h2 className="mt-2 text-xl font-extrabold text-white">
                    {product.name}
                  </h2>

                  <p className="mt-3 text-sm leading-6 text-slate-400">
                    {product.description}
                  </p>

                  <div className="mt-5 flex items-center justify-between">
                    <span className="text-xl font-black text-white">
                      Rs. {product.price.toLocaleString()}
                    </span>

                    <Link
                      to={`/products/${product.id}`}
                      className="rounded-lg bg-blue-500 px-4 py-2 text-sm font-bold text-white transition hover:bg-blue-400"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-slate-700 bg-slate-900 p-10 text-center">
            <h2 className="text-2xl font-bold text-white">
              No Products Found
            </h2>

            <p className="mt-3 text-slate-400">
              There are no products available in this category.
            </p>

            <Link
              to="/"
              className="mt-6 inline-flex rounded-lg bg-blue-500 px-5 py-3 font-bold text-white hover:bg-blue-400"
            >
              Back to Home
            </Link>
          </div>
        )}

      </div>
    </main>
  );
}

export default CategoryProducts;