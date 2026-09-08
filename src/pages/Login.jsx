import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { readStorage, writeStorage } from "../utils/storage";

// ==================================================
// API CONFIGURATION
// ==================================================
//
// Local development:
// /api requests Vite proxy ke through localhost:5000
// backend par jayengi.
//
// Vercel deployment:
// /api requests Vercel API function par jayengi.
//
// Isliye API URL blank rakha gaya hai.
//
const API_URL = "";

function Login() {
  const navigate = useNavigate();

  // ==================================================
  // NORMAL LOGIN STATES
  // ==================================================

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  // ==================================================
  // FORGOT PASSWORD STATES
  // ==================================================

  const [showForgotPassword, setShowForgotPassword] =
    useState(false);

  const [resetStep, setResetStep] = useState(1);

  const [resetEmail, setResetEmail] = useState("");
  const [otp, setOtp] = useState("");

  const [resetPassword, setResetPassword] = useState("");
  const [confirmResetPassword, setConfirmResetPassword] =
    useState("");

  const [showResetPassword, setShowResetPassword] =
    useState(false);

  const [resetError, setResetError] = useState("");
  const [resetSuccess, setResetSuccess] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  // Temporary reset token received after OTP verification
  const [resetToken, setResetToken] = useState("");

  // ==================================================
  // NORMAL LOGIN
  // ==================================================

  const handleLogin = (e) => {
    e.preventDefault();

    setError("");

    if (!email || !password) {
      setError("Please enter email and password.");
      return;
    }

    const users = readStorage("users", []);

    const user = users.find(
      (user) =>
        user.email?.toLowerCase() ===
          email.toLowerCase() &&
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

    writeStorage("user", loggedInUser);

    alert("Login successful!");

    navigate("/");
  };

  // ==================================================
  // OPEN FORGOT PASSWORD
  // ==================================================

  const openForgotPassword = () => {
    setShowForgotPassword(true);

    setResetStep(1);

    setResetEmail("");
    setOtp("");

    setResetPassword("");
    setConfirmResetPassword("");

    setResetToken("");

    setResetError("");
    setResetSuccess("");

    setIsLoading(false);
  };

  // ==================================================
  // CLOSE FORGOT PASSWORD
  // ==================================================

  const closeForgotPassword = () => {
    setShowForgotPassword(false);

    setResetStep(1);

    setResetEmail("");
    setOtp("");

    setResetPassword("");
    setConfirmResetPassword("");

    setResetToken("");

    setResetError("");
    setResetSuccess("");

    setIsLoading(false);
  };

  // ==================================================
  // STEP 1
  // CHECK EMAIL + SEND OTP
  // ==================================================

  const handleVerifyEmail = async (e) => {
    e.preventDefault();

    setResetError("");
    setResetSuccess("");

    if (!resetEmail.trim()) {
      setResetError("Please enter your email address.");
      return;
    }

    const normalizedEmail = resetEmail
      .trim()
      .toLowerCase();

    // Check if account exists in project storage
    const users = readStorage("users", []);

    const userExists = users.some(
      (user) =>
        user.email?.toLowerCase() === normalizedEmail
    );

    if (!userExists) {
      setResetError(
        "No account was found with this email address."
      );
      return;
    }

    try {
      setIsLoading(true);

      const response = await fetch(
        `${API_URL}/api/auth/forgot-password/request-otp`,
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            email: normalizedEmail,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        setResetError(
          data.message || "Unable to send OTP."
        );

        return;
      }

      setResetEmail(normalizedEmail);

      setResetSuccess(
        "OTP has been sent to your email. Please check your inbox."
      );

      setResetStep(2);
    } catch (error) {
      console.error("OTP Request Error:", error);

      setResetError(
        "Unable to connect to the OTP server. Please make sure the backend server is running."
      );
    } finally {
      setIsLoading(false);
    }
  };

  // ==================================================
  // STEP 2
  // VERIFY OTP
  // ==================================================

  const handleVerifyOTP = async (e) => {
    e.preventDefault();

    setResetError("");
    setResetSuccess("");

    if (!otp.trim()) {
      setResetError("Please enter the OTP.");
      return;
    }

    if (!/^\d{6}$/.test(otp.trim())) {
      setResetError(
        "Please enter the valid 6-digit OTP."
      );
      return;
    }

    try {
      setIsLoading(true);

      const response = await fetch(
        `${API_URL}/api/auth/forgot-password/verify-otp`,
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            email: resetEmail,
            otp: otp.trim(),
          }),
        }
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        setResetError(
          data.message || "Invalid OTP."
        );

        return;
      }

      // Save temporary reset token
      setResetToken(data.resetToken);

      setResetSuccess(
        "OTP verified successfully. You can now create a new password."
      );

      setResetStep(3);
    } catch (error) {
      console.error(
        "OTP Verification Error:",
        error
      );

      setResetError(
        "Unable to verify OTP. Please make sure the backend server is running."
      );
    } finally {
      setIsLoading(false);
    }
  };

  // ==================================================
  // RESEND OTP
  // ==================================================

  const handleResendOTP = async () => {
    setResetError("");
    setResetSuccess("");

    if (!resetEmail.trim()) {
      setResetError(
        "Email address is missing. Please go back and enter your email again."
      );

      return;
    }

    try {
      setIsLoading(true);

      const response = await fetch(
        `${API_URL}/api/auth/forgot-password/request-otp`,
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            email: resetEmail,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        setResetError(
          data.message || "Unable to resend OTP."
        );

        return;
      }

      setOtp("");

      setResetSuccess(
        "A new OTP has been sent to your email."
      );
    } catch (error) {
      console.error("Resend OTP Error:", error);

      setResetError(
        "Unable to connect to the OTP server."
      );
    } finally {
      setIsLoading(false);
    }
  };

  // ==================================================
  // STEP 3
  // RESET PASSWORD
  // ==================================================

  const handleResetPassword = async (e) => {
    e.preventDefault();

    setResetError("");
    setResetSuccess("");

    if (!resetPassword || !confirmResetPassword) {
      setResetError(
        "Please enter and confirm your new password."
      );

      return;
    }

    if (resetPassword.length < 6) {
      setResetError(
        "Password must be at least 6 characters long."
      );

      return;
    }

    if (resetPassword !== confirmResetPassword) {
      setResetError("Passwords do not match.");
      return;
    }

    if (!resetToken) {
      setResetError(
        "Password reset authorization is missing. Please verify the OTP again."
      );

      return;
    }

    try {
      setIsLoading(true);

      // Authorize password reset with backend
      const response = await fetch(
        `${API_URL}/api/auth/forgot-password/reset`,
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            email: resetEmail,
            resetToken: resetToken,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        setResetError(
          data.message ||
            "Password reset authorization failed."
        );

        return;
      }

      // Update existing project users in localStorage
      const users = readStorage("users", []);

      const updatedUsers = users.map((user) => {
        if (
          user.email?.toLowerCase() ===
          resetEmail.toLowerCase()
        ) {
          return {
            ...user,
            password: resetPassword,
          };
        }

        return user;
      });

      writeStorage("users", updatedUsers);

      setResetSuccess(
        "Password reset successfully! You can now login with your new password."
      );

      setTimeout(() => {
        closeForgotPassword();

        setEmail(resetEmail);
        setPassword("");
      }, 1800);
    } catch (error) {
      console.error(
        "Password Reset Error:",
        error
      );

      setResetError(
        "Unable to reset password. Please make sure the backend server is running."
      );
    } finally {
      setIsLoading(false);
    }
  };

  // ==================================================
  // BACK BUTTON
  // ==================================================

  const handleBack = () => {
    setResetError("");
    setResetSuccess("");

    if (resetStep === 2) {
      setOtp("");
      setResetStep(1);
    } else if (resetStep === 3) {
      setResetPassword("");
      setConfirmResetPassword("");
      setResetToken("");
      setResetStep(2);
    }
  };

  // ==================================================
  // UI
  // ==================================================

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
                onChange={(e) =>
                  setEmail(e.target.value)
                }
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
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) =>
                    setPassword(e.target.value)
                  }
                  className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 pr-20 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-blue-500"
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowPassword(
                      !showPassword
                    )
                  }
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-blue-400 hover:text-blue-300"
                >
                  {showPassword
                    ? "Hide"
                    : "Show"}
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
                onClick={openForgotPassword}
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

      {/* ==================================================
          FORGOT PASSWORD MODAL
          ================================================== */}

      {showForgotPassword && (

        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-5 backdrop-blur-sm">

          <div className="w-full max-w-md rounded-2xl border border-slate-700 bg-slate-900 p-6 shadow-2xl sm:p-8">

            {/* MODAL HEADER */}

            <div className="mb-6 text-center">

              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-xl bg-blue-600/20 text-2xl">
                🔑
              </div>

              <h2 className="mt-4 text-2xl font-black text-white">

                {resetStep === 1
                  ? "Forgot Password?"
                  : resetStep === 2
                  ? "Verify OTP"
                  : "Create New Password"}

              </h2>

              <p className="mt-2 text-sm text-slate-400">

                {resetStep === 1
                  ? "Enter your registered email address to receive an OTP."
                  : resetStep === 2
                  ? `Enter the 6-digit OTP sent to ${resetEmail}.`
                  : "Enter a new password for your account."}

              </p>

            </div>

            {/* ERROR */}

            {resetError && (

              <div className="mb-5 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm font-semibold text-red-400">
                {resetError}
              </div>

            )}

            {/* SUCCESS */}

            {resetSuccess && (

              <div className="mb-5 rounded-lg border border-green-500/30 bg-green-500/10 px-4 py-3 text-sm font-semibold text-green-400">
                {resetSuccess}
              </div>

            )}

            {/* ==================================================
                STEP 1 - EMAIL
                ================================================== */}

            {resetStep === 1 && (

              <form onSubmit={handleVerifyEmail}>

                <label className="mb-2 block text-sm font-bold text-slate-300">
                  Email Address
                </label>

                <input
                  type="email"
                  placeholder="Enter your registered email"
                  value={resetEmail}
                  onChange={(e) =>
                    setResetEmail(
                      e.target.value
                    )
                  }
                  autoFocus
                  disabled={isLoading}
                  className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-blue-500 disabled:opacity-60"
                />

                <button
                  type="submit"
                  disabled={isLoading}
                  className="mt-6 w-full rounded-xl bg-blue-600 px-6 py-3.5 font-bold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isLoading
                    ? "Sending OTP..."
                    : "Send OTP"}
                </button>

              </form>

            )}

            {/* ==================================================
                STEP 2 - OTP
                ================================================== */}

            {resetStep === 2 && (

              <form onSubmit={handleVerifyOTP}>

                <label className="mb-2 block text-sm font-bold text-slate-300">
                  Enter OTP
                </label>

                <input
                  type="text"
                  inputMode="numeric"
                  maxLength={6}
                  placeholder="Enter 6-digit OTP"
                  value={otp}
                  onChange={(e) =>
                    setOtp(
                      e.target.value
                        .replace(/\D/g, "")
                        .slice(0, 6)
                    )
                  }
                  autoFocus
                  disabled={isLoading}
                  className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-center text-lg font-bold tracking-[0.5em] text-white outline-none transition placeholder:text-slate-500 placeholder:tracking-normal focus:border-blue-500 disabled:opacity-60"
                />

                <button
                  type="submit"
                  disabled={isLoading}
                  className="mt-6 w-full rounded-xl bg-blue-600 px-6 py-3.5 font-bold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isLoading
                    ? "Verifying..."
                    : "Verify OTP"}
                </button>

                <button
                  type="button"
                  onClick={handleResendOTP}
                  disabled={isLoading}
                  className="mt-3 w-full text-sm font-semibold text-blue-400 transition hover:text-blue-300 disabled:opacity-50"
                >
                  {isLoading
                    ? "Please wait..."
                    : "Resend OTP"}
                </button>

                <button
                  type="button"
                  onClick={handleBack}
                  disabled={isLoading}
                  className="mt-3 w-full rounded-xl border border-slate-700 px-6 py-3 font-semibold text-slate-300 transition hover:bg-slate-800 disabled:opacity-50"
                >
                  Back
                </button>

              </form>

            )}

            {/* ==================================================
                STEP 3 - NEW PASSWORD
                ================================================== */}

            {resetStep === 3 && (

              <form onSubmit={handleResetPassword}>

                <label className="mb-2 block text-sm font-bold text-slate-300">
                  New Password
                </label>

                <div className="relative">

                  <input
                    type={
                      showResetPassword
                        ? "text"
                        : "password"
                    }
                    placeholder="Enter new password"
                    value={resetPassword}
                    onChange={(e) =>
                      setResetPassword(
                        e.target.value
                      )
                    }
                    autoFocus
                    disabled={isLoading}
                    className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 pr-20 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-blue-500 disabled:opacity-60"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowResetPassword(
                        !showResetPassword
                      )
                    }
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-blue-400 hover:text-blue-300"
                  >
                    {showResetPassword
                      ? "Hide"
                      : "Show"}
                  </button>

                </div>

                <label className="mb-2 mt-5 block text-sm font-bold text-slate-300">
                  Confirm New Password
                </label>

                <input
                  type={
                    showResetPassword
                      ? "text"
                      : "password"
                  }
                  placeholder="Confirm new password"
                  value={confirmResetPassword}
                  onChange={(e) =>
                    setConfirmResetPassword(
                      e.target.value
                    )
                  }
                  disabled={isLoading}
                  className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-blue-500 disabled:opacity-60"
                />

                <button
                  type="submit"
                  disabled={isLoading}
                  className="mt-6 w-full rounded-xl bg-blue-600 px-6 py-3.5 font-bold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isLoading
                    ? "Resetting Password..."
                    : "Reset Password"}
                </button>

                <button
                  type="button"
                  onClick={handleBack}
                  disabled={isLoading}
                  className="mt-3 w-full rounded-xl border border-slate-700 px-6 py-3 font-semibold text-slate-300 transition hover:bg-slate-800 disabled:opacity-50"
                >
                  Back
                </button>

              </form>

            )}

            {/* CLOSE */}

            <button
              type="button"
              onClick={closeForgotPassword}
              disabled={isLoading}
              className="mt-4 w-full text-sm font-semibold text-slate-500 transition hover:text-slate-300 disabled:opacity-50"
            >
              Cancel
            </button>

          </div>

        </div>

      )}

    </main>
  );
}

export default Login;