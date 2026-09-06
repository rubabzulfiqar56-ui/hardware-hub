function Hero() {
  return (
    <section className="relative overflow-hidden bg-slate-950 text-white">

      {/* BLUE GLOW */}
      <div className="absolute -left-32 top-10 h-96 w-96 rounded-full bg-blue-600/20 blur-3xl" />

      <div className="absolute right-0 top-0 h-96 w-96 rounded-full bg-sky-500/10 blur-3xl" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-5 py-16 sm:px-6 md:py-20 lg:grid-cols-2 lg:px-8">

        {/* CONTENT */}
        <div>

          <span className="inline-flex rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-2 text-xs font-bold uppercase tracking-widest text-blue-400">
            Hardware Store
          </span>

          <h1 className="mt-6 text-5xl font-black leading-tight sm:text-6xl">
            Build Better.

            <span className="block bg-gradient-to-r from-blue-400 to-sky-300 bg-clip-text text-transparent">
              Choose Better.
            </span>
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-8 text-slate-300">
            Quality tools, electrical equipment and hardware
            products for professionals, workshops and home projects.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">

            <a
              href="/products"
              className="rounded-lg bg-blue-600 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-blue-600/30 transition hover:-translate-y-0.5 hover:bg-blue-500"
            >
              Shop Products →
            </a>

            <a
              href="#categories"
              className="rounded-lg border border-slate-600 bg-slate-900/50 px-6 py-3 text-sm font-bold text-slate-200 transition hover:border-blue-500 hover:text-blue-400"
            >
              Explore Categories
            </a>

          </div>

          {/* STATS */}
          <div className="mt-10 grid max-w-xl grid-cols-3 border-t border-slate-800 pt-7">

            <div>
              <p className="text-2xl font-black text-white">
                6+
              </p>

              <p className="mt-1 text-xs text-slate-400">
                Categories
              </p>
            </div>

            <div className="border-l border-slate-800 pl-5">
              <p className="text-2xl font-black text-white">
                24/7
              </p>

              <p className="mt-1 text-xs text-slate-400">
                Online Access
              </p>
            </div>

            <div className="border-l border-slate-800 pl-5">
              <p className="text-2xl font-black text-white">
                100%
              </p>

              <p className="mt-1 text-xs text-slate-400">
                Quality Focus
              </p>
            </div>

          </div>

        </div>

        {/* IMAGE */}
        <div className="relative">

          <div className="absolute -inset-4 rounded-3xl bg-blue-600/10 blur-2xl" />

          <div className="relative overflow-hidden rounded-3xl border border-slate-700 bg-slate-900 shadow-2xl">

            <img
              src="/hero.webp"
              alt="Hardware tools"
              fetchPriority="high"
              decoding="async"
              className="h-[350px] w-full object-cover sm:h-[450px] lg:h-[500px]"
            />

            <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-slate-950 to-transparent" />

            <div className="absolute bottom-5 left-5 rounded-xl border border-slate-700 bg-slate-950/90 px-4 py-3 backdrop-blur">

              <p className="text-xs font-bold text-blue-400">
                PROFESSIONAL GRADE
              </p>

              <p className="mt-1 text-sm font-bold text-white">
                Tools that get the job done.
              </p>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}

export default Hero;
