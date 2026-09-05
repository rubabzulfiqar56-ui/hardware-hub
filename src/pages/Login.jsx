import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please enter email and password.");
      return;
    }

    const users =
      JSON.parse(localStorage.getItem("users")) || [];

    const user = users.find(
      (user) =>
        user.email.toLowerCase() === email.toLowerCase() &&
        user.password === password
    );

    if (!user) {
      setError("Invalid email or password.");
      return;
    }

    const loggedInUser = {
      id: user.id,
      name: user.name,
      email: user.email,
      isLoggedIn: true,
    };

    localStorage.setItem(
      "user",
      JSON.stringify(loggedInUser)
    );

    alert("Login successful!");

    navigate("/");
  };

  return (
    <main className="min-h-screen bg-slate-950 px-5 py-16">

      <div className="mx-auto max-w-md">

        {/* HEADER */}

        <div className="text-center">

          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-600 text-2xl text-white shadow-lg shadow-blue-600/30">
            🔐
          </div>

          <h1 className="mt-6 text-3xl font-black text-white">
            Welcome Back
          </h1>

          <p className="mt-2 text-slate-400">
            Login to your HardwareHub account
          </p>

        </div>

        {/* LOGIN CARD */}

        <div className="mt-8 rounded-2xl border border-slate-700 bg-slate-900 p-6 shadow-2xl sm:p-8">

          <form onSubmit={handleLogin}>

            {/* ERROR */}

            {error && (
              <div className="mb-5 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm font-semibold text-red-400">
                {error}
              </div>
            )}

            {/* EMAIL */}

            <div>

              <label className="mb-2 block text-sm font-bold text-slate-300">
                Email Address
              </label>

              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-blue-500"
              />

            </div>

            {/* PASSWORD */}

            <div className="mt-5">

              <label className="mb-2 block text-sm font-bold text-slate-300">
                Password
              </label>

              <div className="relative">

                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 pr-20 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-blue-500"
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowPassword(!showPassword)
                  }
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-blue-400 hover:text-blue-300"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>

              </div>

            </div>

            {/* REMEMBER / FORGOT */}

            <div className="mt-5 flex items-center justify-between">

              <label className="flex items-center gap-2 text-sm text-slate-400">

                <input
                  type="checkbox"
                  className="h-4 w-4 rounded border-slate-600 bg-slate-800"
                />

                Remember me

              </label>

              <button
                type="button"
                className="text-sm font-semibold text-blue-400 hover:text-blue-300"
              >
                Forgot Password?
              </button>

            </div>

            {/* LOGIN BUTTON */}

            <button
              type="submit"
              className="mt-7 w-full rounded-xl bg-blue-600 px-6 py-3.5 font-bold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-500"
            >
              Login
            </button>

          </form>

          {/* REGISTER */}

          <div className="mt-6 border-t border-slate-700 pt-6 text-center">

            <p className="text-sm text-slate-400">
              Don't have an account?
            </p>

            <Link
              to="/register"
              className="mt-2 inline-block text-sm font-bold text-blue-400 hover:text-blue-300"
            >
              Create an Account
            </Link>

          </div>

        </div>

      </div>

    </main>
  );
}

export default Login;