import { Link } from "react-router-dom";

function CategoryCard({ category }) {
  return (
    <article className="group overflow-hidden rounded-2xl border border-slate-700 bg-slate-900 shadow-lg transition duration-300 hover:-translate-y-1 hover:border-blue-500 hover:shadow-blue-950/30">
      <div className="h-52 overflow-hidden bg-slate-800">
        <img
          src={category.image}
          alt={category.name}
          loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />
      </div>

      <div className="p-5">
        <p className="text-xs font-bold uppercase tracking-wider text-blue-400">
          Category
        </p>

        <h3 className="mt-1 text-xl font-extrabold text-white">
          {category.name}
        </h3>

        <p className="mt-3 text-sm leading-6 text-slate-400">
          {category.description}
        </p>

        <Link
          to={`/categories/${encodeURIComponent(category.name)}`}
          className="mt-5 inline-flex items-center text-sm font-bold text-blue-400 transition hover:text-blue-300"
        >
          Explore Category
          <span className="ml-1 transition group-hover:translate-x-1">
            →
          </span>
        </Link>
      </div>
    </article>
  );
}

export default CategoryCard;

