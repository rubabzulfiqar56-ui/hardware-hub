<<<<<<< HEAD
import CategoryCard from "../components/CategoryCard";
import categories from "../data/categories";

function Categories() {
  return (
    <main className="min-h-screen bg-slate-950 py-14 sm:py-20">

      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">

        {/* HEADER */}

        <div className="text-center">

          <p className="text-sm font-bold uppercase tracking-[0.2em] text-blue-400">
            Explore
          </p>

          <h1 className="mt-3 text-4xl font-black text-white sm:text-5xl">
            Shop by Category
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-slate-400">
            Browse hardware products by category and find
            exactly what you need for your next project.
          </p>

        </div>

        {/* CATEGORIES */}

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">

          {categories.map((category) => (
            <CategoryCard
              key={category.id}
              category={category}
            />
          ))}

        </div>

      </div>

    </main>
  );
}

=======
import CategoryCard from "../components/CategoryCard";
import categories from "../data/categories";

function Categories() {
  return (
    <main className="min-h-screen bg-slate-950 py-14 sm:py-20">

      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">

        {/* HEADER */}

        <div className="text-center">

          <p className="text-sm font-bold uppercase tracking-[0.2em] text-blue-400">
            Explore
          </p>

          <h1 className="mt-3 text-4xl font-black text-white sm:text-5xl">
            Shop by Category
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-slate-400">
            Browse hardware products by category and find
            exactly what you need for your next project.
          </p>

        </div>

        {/* CATEGORIES */}

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">

          {categories.map((category) => (
            <CategoryCard
              key={category.id}
              category={category}
            />
          ))}

        </div>

      </div>

    </main>
  );
}

>>>>>>> a3a503e951cddc352190fd106797d05f2ee95a51
export default Categories;