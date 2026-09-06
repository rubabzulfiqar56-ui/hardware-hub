import { useState } from "react";

function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setStatus("");
    setLoading(true);

    try {
      const response = await fetch("http://localhost:5000/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Unable to send message.");
      }

      setStatus("success");

      setForm({
        name: "",
        email: "",
        message: "",
      });
    } catch (error) {
      console.error("Contact form error:", error);
      setStatus("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-950 py-14 sm:py-20">

      <div className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-8">

        {/* HEADER */}

        <div className="text-center">

          <p className="text-sm font-bold uppercase tracking-[0.2em] text-blue-400">
            Contact Us
          </p>

          <h1 className="mt-3 text-4xl font-black text-white sm:text-5xl">
            Get In Touch
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-slate-400">
            Have a question about a product or order?
            Our team is here to help.
          </p>

        </div>

        {/* CONTACT AREA */}

        <div className="mt-12 grid gap-6 lg:grid-cols-2">

          {/* LEFT */}

          <div className="rounded-2xl border border-slate-700 bg-slate-900 p-7 shadow-xl sm:p-9">

            <h2 className="text-2xl font-black text-white">
              Contact HardwareHub
            </h2>

            <p className="mt-3 leading-7 text-slate-400">
              We would love to hear from you. Contact us
              for product information, delivery questions
              or general support.
            </p>

            <div className="mt-8 space-y-5">

              <div className="flex gap-4">

                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-600/10 text-xl">
                  📍
                </div>

                <div>
                  <p className="font-bold text-white">
                    Location
                  </p>

                  <p className="mt-1 text-sm text-slate-400">
                    Rawalpindi, Pakistan
                  </p>
                </div>

              </div>

              <div className="flex gap-4">

                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-600/10 text-xl">
                  ✉️
                </div>

                <div>
                  <p className="font-bold text-white">
                    Email
                  </p>

                  <p className="mt-1 text-sm text-slate-400">
                    support@hardwarehub.com
                  </p>
                </div>

              </div>

              <div className="flex gap-4">

                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-600/10 text-xl">
                  ☎️
                </div>

                <div>
                  <p className="font-bold text-white">
                    Phone
                  </p>

                  <p className="mt-1 text-sm text-slate-400">
                    +92 300 1234567
                  </p>
                </div>

              </div>

            </div>

          </div>

          {/* RIGHT FORM */}

          <div className="rounded-2xl border border-slate-700 bg-slate-900 p-7 shadow-xl sm:p-9">

            <h2 className="text-2xl font-black text-white">
              Send Us a Message
            </h2>

            <form onSubmit={handleSubmit} className="mt-6 space-y-5">

              <div>

                <label className="mb-2 block text-sm font-semibold text-slate-300">
                  Your Name
                </label>

                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Enter your name"
                  required
                  className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                />

              </div>

              <div>

                <label className="mb-2 block text-sm font-semibold text-slate-300">
                  Email Address
                </label>

                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  required
                  className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                />

              </div>

              <div>

                <label className="mb-2 block text-sm font-semibold text-slate-300">
                  Message
                </label>

                <textarea
                  rows="5"
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Write your message..."
                  required
                  className="w-full resize-none rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                />

              </div>

              {status === "success" && (
                <div className="rounded-xl border border-green-500/30 bg-green-500/10 px-4 py-3 text-sm font-semibold text-green-400">
                  ✅ Message sent successfully! We will get back to you soon.
                </div>
              )}

              {status === "error" && (
                <div className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm font-semibold text-red-400">
                  ❌ Unable to send your message. Please try again.
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-xl bg-blue-600 px-5 py-3.5 text-sm font-bold text-white transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? "Sending..." : "Send Message"}
              </button>

            </form>

          </div>

        </div>

      </div>

    </main>
  );
}

export default Contact;
