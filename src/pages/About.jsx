function About() {
  const features = [
    [
      "Quality First",
      "We focus on reliable products and clear product information.",
    ],
    [
      "Simple Shopping",
      "Categories and search help customers find products quickly.",
    ],
    [
      "Built to Grow",
      "The platform is designed for future cart, authentication and order features.",
    ],
  ];

  return (
    <main>
      <section className="bg-gray-950 py-20 text-white">
        <div className="mx-auto max-w-4xl px-5 text-center">
          <p className="text-xs font-bold uppercase tracking-wider text-blue-400">
            About HardwareHub
          </p>

          <h1 className="mt-3 text-4xl font-black sm:text-5xl">
            Hardware for every project.
          </h1>

          <p className="mt-6 leading-8 text-gray-300">
            HardwareHub is a modern hardware selling platform designed to make
            tools and essential hardware easier to discover and purchase.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-6xl px-5">
          <div className="grid gap-6 md:grid-cols-3">
            {features.map(([title, text]) => (
              <div
                key={title}
                className="rounded-2xl border p-7 shadow-sm"
              >
                <h2 className="text-xl font-extrabold">{title}</h2>

                <p className="mt-3 leading-7 text-gray-600">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

export default About;