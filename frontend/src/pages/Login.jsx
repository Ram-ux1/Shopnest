
import React, { useState } from "react";
import { useAuth } from "../context/authContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    const result = await login(formData.email, formData.password);
    setLoading(false);
    if (result.success) {
      navigate("/");
    } else {
      setError(result.message || "Login failed");
    }
  };

  return (
    <div className="min-h-full bg-[#FEF4F4] flex items-center justify-center p-3 md:p-4 overflow-hidden">

      <div className="w-full max-w-5xl min-h-[490px] bg-white rounded-3xl shadow-[0_15px_60px_rgba(74,74,74,0.10)] overflow-hidden grid md:grid-cols-2">

        {/* LEFT SECTION */}
        <div className="hidden md:flex flex-col justify-between bg-[#F7D6D0] p-6 relative overflow-hidden">

          {/* Decorative circles */}
          <div className="absolute -top-20 -left-20 w-60 h-60 bg-white/30 rounded-full" />
          <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-[#E2B4BD]/40 rounded-full" />

          {/* Branding */}
          <div className="relative z-10 flex items-center gap-3">
            <img
              src="/Logo.png"
              alt="Shopnest"
              className="w-10 h-10 object-contain"
            />

            <h1 className="text-xl font-extrabold text-[#4A4A4A]">
              Shopnest
            </h1>
          </div>

          {/* Main Content */}
          <div className="relative z-10">

            <span className="bg-white/60 text-[#4A4A4A] px-3 py-1 rounded-full text-xs font-semibold">
              Your Shopping Destination
            </span>

            <h2 className="text-3xl font-extrabold text-[#4A4A4A] leading-tight mt-4">
              Discover.
              <br />
              Shop.
              <br />
              Enjoy.
            </h2>

            <p className="text-[#4A4A4A]/80 text-sm mt-3 max-w-sm leading-relaxed">
              Find everything you love in one place.
              Enjoy amazing deals and a seamless shopping experience.
            </p>

            {/* Shopping Illustration */}
            <div className="mt-4 flex items-center justify-center">

              <div className="relative w-44 h-28 bg-white/40 rounded-3xl flex items-center justify-center">

                <div className="absolute w-28 h-24 bg-[#E2B4BD] rounded-2xl rotate-[-10deg]" />

                <div className="absolute w-28 h-24 bg-[#F7D6D0] border-2 border-white rounded-2xl rotate-[8deg] flex items-center justify-center shadow-lg">

                  <img
                    src="/Logo.png"
                    alt="Shopping"
                    className="w-16 h-16 object-contain"
                  />

                </div>

                <span className="absolute -top-3 right-4 text-2xl">
                  ✨
                </span>

                <span className="absolute -bottom-2 left-4 text-xl">
                  🛍️
                </span>

              </div>
            </div>
          </div>

          {/* Footer */}
          <p className="relative z-10 text-xs text-[#4A4A4A]/70">
            © 2026 Shopnest. All rights reserved.
          </p>

        </div>

        {/* RIGHT SECTION */}
        <div className="flex items-center justify-center p-4 sm:p-5 md:p-6">

          <div className="w-full max-w-sm">

            {/* Mobile Logo */}
            <div className="md:hidden flex items-center justify-center gap-3 mb-5">
              <img
                src="/Logo.png"
                alt="Shopnest"
                className="w-9 h-9 object-contain"
              />

              <h1 className="text-xl font-extrabold text-[#4A4A4A]">
                Shopnest
              </h1>
            </div>

            {/* Heading */}
            <div className="mb-5">

              <p className="text-[#B77D87] font-semibold text-xs tracking-widest uppercase">
                Welcome Back
              </p>

              <h2 className="text-2xl font-extrabold text-[#4A4A4A] mt-2">
                Login to your
                <span className="block text-[#E2B4BD]">
                  Account
                </span>
              </h2>

              <p className="text-gray-500 text-sm mt-2">
                Enter your details to continue shopping.
              </p>

            </div>

            {/* Login Form */}
            <form onSubmit={handleLogin} className="space-y-3">

              {error && (
                <div className="p-3 rounded-lg bg-red-50 text-red-700 text-sm border border-red-100">
                  {error}
                </div>
              )}

              {/* Email */}
              <div>
                <label className="block text-sm font-semibold text-[#4A4A4A] mb-1.5">
                  Email Address
                </label>

                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  required
                  autoComplete="email"
                  className="w-full px-4 py-2 rounded-xl border border-[#E2B4BD] bg-[#FFF5F5]/50 outline-none text-sm text-[#4A4A4A] placeholder:text-gray-400 focus:border-[#B77D87] focus:ring-4 focus:ring-[#E2B4BD]/20 transition-all"
                />
              </div>

              {/* Password */}
              <div>
                <div className="flex justify-between items-center mb-1.5">

                  <label className="text-sm font-semibold text-[#4A4A4A]">
                    Password
                  </label>

                </div>

                <div className="relative">

                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter your password"
                    required
                    autoComplete="current-password"
                    className="w-full px-4 py-2 pr-16 rounded-xl border border-[#E2B4BD] bg-[#FFF5F5]/50 outline-none text-sm text-[#4A4A4A] placeholder:text-gray-400 focus:border-[#B77D87] focus:ring-4 focus:ring-[#E2B4BD]/20 transition-all"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-semibold text-[#B77D87] hover:text-[#4A4A4A]"
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>

                </div>
              </div>

              {/* Remember Me */}
              <div className="flex items-center gap-2">

                <input
                  type="checkbox"
                  id="remember"
                  className="w-4 h-4 accent-[#B77D87] cursor-pointer"
                />

                <label
                  htmlFor="remember"
                  className="text-xs text-gray-600 cursor-pointer"
                >
                  Remember me
                </label>

              </div>

              {/* Login Button */}
              <button
                type="submit"
                disabled={loading}
                className={`w-full py-2 rounded-xl text-white font-bold text-sm shadow-lg hover:bg-[#333333] hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 ${
                  loading
                    ? "bg-[#999999] cursor-not-allowed"
                    : "bg-[#4A4A4A]"
                }`}
              >
                {loading ? "Logging in..." : "Login to Shopnest →"}
              </button>

            </form>

            {/* Register */}
            <div className="mt-5 text-center">

              <p className="text-sm text-gray-500">
                Don't have an account?

                <a
                  href="/register"
                  className="ml-2 font-bold text-[#B77D87] hover:text-[#4A4A4A] transition"
                >
                  Create Account
                </a>

              </p>

            </div>

            {/* Bottom */}
            <div className="mt-6 text-center">

              <div className="h-px bg-[#E2B4BD]/50 mb-4" />

              <p className="text-xs text-gray-400">
                Secure Login · Shopnest © 2026
              </p>

            </div>

          </div>
        </div>

      </div>
    </div>
  );
};

export default Login;
