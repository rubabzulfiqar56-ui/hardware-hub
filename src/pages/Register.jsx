import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");

  const handleRegister = (e) => {
    e.preventDefault();
    setError("");

    if (!name || !email || !password || !confirmPassword) {
      setError("Please fill in all fields.");
      return;
    }

    if (!email.includes("@")) {
      setError("Please enter a valid email address.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    const existingUsers =
      JSON.parse(localStorage.getItem("users")) || [];

    const userExists = existingUsers.some(
      (user) => user.email.toLowerCase() === email.toLowerCase()
    );

    if (userExists) {
      setError("An account with this email already exists.");
      return;
    }

    const newUser = {
      id: Date.now(),
      name: name,
      email: email,
      password: password,
    };

    existingUsers.push(newUser);

    localStorage.setItem(
      "users",
      JSON.stringify(existingUsers)
    );

    alert("Account created successfully!");

    navigate("/login");
  };

  return (
    <main className="min-h-screen bg-slate-950 px-5 py-16">
      <div className="mx-auto max-w-md">

        <div className="text-center">

          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-600 text-2xl text-white shadow-lg shadow-blue-600/30">
            👤
          </div>

          <h1 className="mt-6 text-3xl font-black text-white">
            Create Account
          </h1>

          <p className="mt-2 text-slate-400">
            Create your HardwareHub account
          </p>

        </div>

        <div className="mt-8 rounded-2xl border border-slate-700 bg-slate-900 p-6 shadow-2xl sm:p-8">

          <form onSubmit={handleRegister}>

            {error && (
              <div className="mb-5 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm font-semibold text-red-400">
                {error}
              </div>
            )}

            <div>
              <label className="mb-2 block text-sm font-bold text-slate-300">
                Full Name
              </label>

              <input
                type="text"
                placeholder="Enter your full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-500 focus:border-blue-500"
              />
            </div>

            <div className="mt-5">
              <label className="mb-2 block text-sm font-bold text-slate-300">
                Email Address
              </label>

              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-500 focus:border-blue-500"
              />
            </div>

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
                  className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 pr-20 text-sm text-white outline-none placeholder:text-slate-500 focus:border-blue-500"
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowPassword(!showPassword)
                  }
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-blue-400"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>

              </div>
            </div>

            <div className="mt-5">
              <label className="mb-2 block text-sm font-bold text-slate-300">
                Confirm Password
              </label>

              <div className="relative">

                <input
                  type={
                    showConfirmPassword
                      ? "text"
                      : "password"
                  }
                  placeholder="Confirm your password"
                  value={confirmPassword}
                  onChange={(e) =>
                    setConfirmPassword(e.target.value)
                  }
                  className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 pr-20 text-sm text-white outline-none placeholder:text-slate-500 focus:border-blue-500"
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowConfirmPassword(
                      !showConfirmPassword
                    )
                  }
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-blue-400"
                >
                  {showConfirmPassword ? "Hide" : "Show"}
                </button>

              </div>
            </div>

            <button
              type="submit"
              className="mt-7 w-full rounded-xl bg-blue-600 px-6 py-3.5 font-bold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-500"
            >
              Create Account
            </button>

          </form>

          <div className="mt-6 border-t border-slate-700 pt-6 text-center">

            <p className="text-sm text-slate-400">
              Already have an account?
            </p>

            <Link
              to="/login"
              className="mt-2 inline-block text-sm font-bold text-blue-400 hover:text-blue-300"
            >
              Login Here
            </Link>

          </div>

        </div>
      </div>
    </main>
  );
}

export default Register;