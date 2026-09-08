import { useEffect } from "react";
import Hero from "../components/Hero";
import CategoryCard from "../components/CategoryCard";
import Contact from "./Contact";
import categories from "../data/categories";

function Home() {
  useEffect(() => {
    if (window.location.hash === "#contact") {
      setTimeout(() => {
        const contactSection = document.getElementById("contact");

        if (contactSection) {
          contactSection.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
      }, 300);
    }
  }, []);

  return (
    <main className="bg-slate-900">

      {/* HERO */}
      <Hero />

      {/* CATEGORIES */}
      <section
        id="categories"
        className="bg-slate-100 py-16 sm:py-20"
      >
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">

          <div className="mb-10 text-center">
            <p className="font-bold uppercase tracking-widest text-blue-600">
              Shop by Category
            </p>

            <h2 className="mt-3 text-3xl font-black text-slate-900 md:text-4xl">
              Find the Right Hardware
            </h2>

            <p className="mx-auto mt-4 max-w-2xl text-slate-600">
              Explore our wide range of quality hardware products
              for professional work, home projects and workshops.
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

      {/* WHY CHOOSE US */}
      <section
        id="about"
        className="bg-slate-900 py-16 sm:py-20"
      >
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">

          <div className="mb-10 text-center">
            <p className="font-bold uppercase tracking-widest text-blue-400">
              Why HardwareHub?
            </p>

            <h2 className="mt-3 text-3xl font-black text-white">
              Built for Your Projects
            </h2>

            <p className="mx-auto mt-4 max-w-2xl text-slate-400">
              Reliable products, convenient delivery and
              professional customer support.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">

            {/* QUALITY PRODUCTS */}
            <div className="rounded-2xl border border-slate-700 bg-slate-800 p-7 text-center shadow-lg transition hover:-translate-y-1 hover:border-blue-500">

              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-600/10 text-3xl">
                🛠️
              </div>

              <h3 className="mt-5 text-xl font-bold text-white">
                Quality Products
              </h3>

              <p className="mt-3 leading-7 text-slate-400">
                Reliable hardware products selected for everyday
                professional and home projects.
              </p>

            </div>

            {/* FAST DELIVERY */}
            <div className="rounded-2xl border border-slate-700 bg-slate-800 p-7 text-center shadow-lg transition hover:-translate-y-1 hover:border-blue-500">

              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-600/10 text-3xl">
                🚚
              </div>

              <h3 className="mt-5 text-xl font-bold text-white">
                Fast Delivery
              </h3>

              <p className="mt-3 leading-7 text-slate-400">
                Get your hardware products delivered conveniently
                to your location.
              </p>

            </div>

            {/* CUSTOMER SUPPORT */}
            <div className="rounded-2xl border border-slate-700 bg-slate-800 p-7 text-center shadow-lg transition hover:-translate-y-1 hover:border-blue-500">

              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-600/10 text-3xl">
                💬
              </div>

              <h3 className="mt-5 text-xl font-bold text-white">
                Customer Support
              </h3>

              <p className="mt-3 leading-7 text-slate-400">
                Our team is ready to help you find the right
                product for your requirements.
              </p>

            </div>

          </div>

        </div>
      </section>

      {/* CONTACT SECTION */}
      <section
        id="contact"
        className="bg-slate-950"
      >
        <Contact />
      </section>

      {/* CTA */}
      <section className="bg-blue-600 py-16">

        <div className="mx-auto max-w-4xl px-5 text-center">

          <p className="font-bold uppercase tracking-widest text-blue-200">
            HardwareHub
          </p>

          <h2 className="mt-3 text-3xl font-black text-white md:text-4xl">
            Ready to Start Your Next Project?
          </h2>

          <p className="mt-4 text-blue-100">
            Explore our hardware collection and find the tools
            you need today.
          </p>

          <a
            href="/products"
            className="mt-8 inline-block rounded-lg bg-white px-6 py-3 font-bold text-blue-700 shadow-lg transition hover:bg-slate-100"
          >
            Browse Products
          </a>

        </div>

      </section>

    </main>
  );
}

export default Home;