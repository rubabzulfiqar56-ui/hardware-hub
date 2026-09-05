import { Link } from "react-router-dom";

function ProductCard({ product }) {
  return (
    <article className="group overflow-hidden rounded-2xl border border-slate-700 bg-slate-900 shadow-lg transition duration-300 hover:-translate-y-1 hover:border-blue-500/70 hover:shadow-blue-950/30">
      {/* IMAGE */}
      <div className="relative flex h-60 items-center justify-center overflow-hidden bg-slate-800">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />

        <span className="absolute left-3 top-3 rounded-full border border-slate-600 bg-slate-950/90 px-3 py-1 text-xs font-bold text-slate-200">
          {product.category}
        </span>
      </div>

      {/* CONTENT */}
      <div className="p-5">
        <h3 className="text-lg font-extrabold text-white">
          {product.name}
        </h3>

        <p className="mt-2 line-clamp-2 text-sm leading-6 text-slate-400">
          {product.description}
        </p>

        {/* RATING */}
        <div className="mt-4 flex items-center gap-1 text-sm text-blue-400">
          ★★★★★

          <span className="ml-1 text-xs text-slate-500">
            Excellent
          </span>
        </div>

        {/* PRICE */}
        <div className="mt-5 flex items-center justify-between gap-3">
          <span className="text-xl font-black text-white">
            Rs. {product.price.toLocaleString()}
          </span>

          <Link
            to={`/products/${product.id}`}
            className="rounded-lg bg-blue-600 px-3.5 py-2 text-sm font-bold text-white shadow-lg shadow-blue-600/10 transition hover:bg-blue-500"
          >
            View Details
          </Link>
        </div>
      </div>
    </article>
  );
}

export default ProductCard;
