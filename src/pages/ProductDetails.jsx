import { Link, useParams } from "react-router-dom";
import products from "../data/products";
import { useCart } from "../context/CartContext";

function ProductDetails() {
  const { id } = useParams();
  const { addToCart } = useCart();

  const product = products.find(
    (item) => String(item.id) === String(id)
  );

  if (!product) {
    return (
      <main className="min-h-screen bg-slate-950 px-5 py-20 text-center">
        <h1 className="text-3xl font-black text-white">
          Product Not Found
        </h1>

        <Link
          to="/products"
          className="mt-6 inline-block rounded-lg bg-blue-600 px-5 py-3 text-sm font-bold text-white hover:bg-blue-500"
        >
          Back to Products
        </Link>
      </main>
    );
  }

  const handleAddToCart = () => {
    addToCart(product);
    alert(`${product.name} added to cart!`);
  };

  return (
    <main className="min-h-screen bg-slate-950 py-12 sm:py-16">

      <div className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-8">

        <Link
          to="/products"
          className="text-sm font-bold text-blue-400 hover:text-blue-300"
        >
          ← Back to Products
        </Link>

        <div className="mt-6 grid overflow-hidden rounded-3xl border border-slate-700 bg-slate-900 shadow-2xl md:grid-cols-2">

          {/* IMAGE */}

          <div className="flex min-h-[420px] items-center justify-center bg-slate-800">

            <img
              src={product.image}
              alt={product.name}
              className="h-full max-h-[550px] w-full object-cover"
            />

          </div>

          {/* DETAILS */}

          <div className="p-7 sm:p-10">

            <span className="rounded-full bg-blue-600/10 px-3 py-1 text-xs font-bold text-blue-400">
              {product.category}
            </span>

            <h1 className="mt-5 text-3xl font-black text-white sm:text-4xl">
              {product.name}
            </h1>

            <div className="mt-4 text-blue-400">
              ★★★★★
            </div>

            <p className="mt-6 text-3xl font-black text-white">
              Rs. {product.price.toLocaleString()}
            </p>

            <p className="mt-5 leading-7 text-slate-400">
              {product.description}
            </p>

            <div className="mt-7 grid gap-3 sm:grid-cols-2">

              <div className="rounded-xl border border-slate-700 bg-slate-800 p-4">
                <p className="text-xs uppercase text-slate-500">
                  Availability
                </p>

                <p className="mt-1 font-bold text-green-400">
                  {product.stock > 0 ? "In Stock" : "Out of Stock"}
                </p>
              </div>

              <div className="rounded-xl border border-slate-700 bg-slate-800 p-4">
                <p className="text-xs uppercase text-slate-500">
                  Stock
                </p>

                <p className="mt-1 font-bold text-white">
                  {product.stock} Available
                </p>
              </div>

            </div>

            <button
              type="button"
              onClick={handleAddToCart}
              disabled={product.stock <= 0}
              className="mt-8 w-full rounded-xl bg-blue-600 px-6 py-3.5 text-sm font-bold text-white transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:bg-slate-700"
            >
              {product.stock > 0 ? "Add to Cart" : "Out of Stock"}
            </button>

          </div>

        </div>

      </div>

    </main>
  );
}

export default ProductDetails;