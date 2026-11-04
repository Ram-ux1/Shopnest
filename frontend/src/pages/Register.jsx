
import React, { useState } from "react";
import { useAuth } from "../context/authContext";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError("");
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    setLoading(true);
    const result = await register({
      name: formData.name,
      email: formData.email,
      password: formData.password,
    });
    setLoading(false);

    if (result.success) {
      navigate("/");
    } else {
      setError(result.message || "Registration failed");
    }
  };

  return (
    <div className="max-h-full w-full overflow-hidden bg-[#FFF5F5] p-2 sm:p-4 md:p-6">

      <div className="mx-auto grid h-full w-full max-w-6xl grid-cols-1 overflow-hidden rounded-3xl bg-white shadow-[0_15px_60px_rgba(74,74,74,0.10)] md:grid-cols-2">

        {/* LEFT SECTION */}

        <div className="relative hidden flex-col justify-between overflow-hidden bg-[#F7D6D0] p-10 lg:p-12 md:flex">

          {/* Decorative Circles */}

          <div className="absolute -left-20 -top-20 h-72 w-72 rounded-full bg-white/30" />

          <div className="absolute -bottom-20 -right-20 h-80 w-80 rounded-full bg-[#E2B4BD]/40" />

          {/* Branding */}

          <div className="relative z-10 flex items-center gap-3">

            <img
              src="/Logo.png"
              alt="Shopnest"
              className="h-14 w-14 object-contain"
            />

            <h1 className="text-3xl font-extrabold text-[#4A4A4A]">
              Shopnest
            </h1>

          </div>


          {/* Main Content */}

          <div className="relative z-10">

            <span className="rounded-full bg-white/60 px-4 py-2 text-sm font-semibold text-[#4A4A4A]">
              Join Our Shopping Community
            </span>

            <h2 className="mt-8 text-5xl font-extrabold leading-tight text-[#4A4A4A]">
              Start Your
              <br />
              Shopping
              <br />
              Journey.
            </h2>

            <p className="mt-6 max-w-sm text-lg leading-relaxed text-[#4A4A4A]/80">
              Create your account and discover amazing
              products, exclusive deals and a better
              shopping experience.
            </p>


            {/* Shopping Illustration */}

            <div className="mt-8 flex items-center justify-center">

              <div className="relative flex h-44 w-60 items-center justify-center rounded-3xl bg-white/40">

                <div className="absolute h-28 w-32 rotate-[-10deg] rounded-2xl bg-[#E2B4BD]" />

                <div className="absolute flex h-28 w-32 rotate-[8deg] items-center justify-center rounded-2xl border-2 border-white bg-[#F7D6D0] shadow-lg">

                  <img
                    src="/Logo.png"
                    alt="Shopping"
                    className="h-20 w-20 object-contain"
                  />

                </div>

                <span className="absolute -right-2 -top-3 text-4xl">
                  ✨
                </span>

                <span className="absolute -bottom-2 left-3 text-3xl">
                  🛍️
                </span>

              </div>

            </div>

          </div>


          {/* Footer */}

          <p className="relative z-10 text-sm text-[#4A4A4A]/70">
            © 2026 Shopnest. All rights reserved.
          </p>

        </div>


        {/* RIGHT SECTION */}

        <div className="flex min-h-0 items-center justify-center overflow-hidden px-5 py-3 sm:px-8 md:px-10 lg:px-12">

          <div className="w-full max-w-md">

            {/* Mobile Branding */}

            <div className="mb-3 flex items-center justify-center gap-2 md:hidden">

              <img
                src="/Logo.png"
                alt="Shopnest"
                className="h-10 w-10 object-contain"
              />

              <h1 className="text-2xl font-extrabold text-[#4A4A4A]">
                Shopnest
              </h1>

            </div>


            {/* Heading */}

            <div className="mb-4">

              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#B77D87]">
                Join Shopnest
              </p>

              <h2 className="mt-1 text-3xl font-extrabold text-[#4A4A4A] sm:text-4xl">
                Create Account
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Sign up to explore amazing shopping deals.
              </p>

            </div>


            {/* Registration Form */}

            <form onSubmit={handleRegister} className="space-y-3">

              {error && (
                <div className="p-3 rounded-lg bg-red-50 text-red-700 text-sm border border-red-100 mb-3">
                  {error}
                </div>
              )}

              {/* Full Name */}

              <div>

                <label className="mb-1 block text-sm font-semibold text-[#4A4A4A]">
                  Full Name
                </label>

                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  required
                  autoComplete="name"
                  className="w-full rounded-xl border border-[#E2B4BD] bg-[#FFF5F5]/50 px-4 py-3 text-sm text-[#4A4A4A] outline-none transition-all placeholder:text-gray-400 focus:border-[#B77D87] focus:ring-4 focus:ring-[#E2B4BD]/20"
                />

              </div>


              {/* Email */}

              <div>

                <label className="mb-1 block text-sm font-semibold text-[#4A4A4A]">
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
                  className="w-full rounded-xl border border-[#E2B4BD] bg-[#FFF5F5]/50 px-4 py-3 text-sm text-[#4A4A4A] outline-none transition-all placeholder:text-gray-400 focus:border-[#B77D87] focus:ring-4 focus:ring-[#E2B4BD]/20"
                />

              </div>


              {/* Password */}

              <div>

                <label className="mb-1 block text-sm font-semibold text-[#4A4A4A]">
                  Password
                </label>

                <div className="relative">

                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Create a password"
                    required
                    minLength={8}
                    autoComplete="new-password"
                    className="w-full rounded-xl border border-[#E2B4BD] bg-[#FFF5F5]/50 px-4 py-3 pr-16 text-sm text-[#4A4A4A] outline-none transition-all placeholder:text-gray-400 focus:border-[#B77D87] focus:ring-4 focus:ring-[#E2B4BD]/20"
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


              {/* Confirm Password */}

              <div>

                <label className="mb-1 block text-sm font-semibold text-[#4A4A4A]">
                  Confirm Password
                </label>

                <div className="relative">

                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Confirm your password"
                    required
                    minLength={8}
                    autoComplete="new-password"
                    className="w-full rounded-xl border border-[#E2B4BD] bg-[#FFF5F5]/50 px-4 py-3 pr-16 text-sm text-[#4A4A4A] outline-none transition-all placeholder:text-gray-400 focus:border-[#B77D87] focus:ring-4 focus:ring-[#E2B4BD]/20"
                  />

                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-semibold text-[#B77D87] hover:text-[#4A4A4A]"
                  >
                    {showConfirmPassword ? "Hide" : "Show"}
                  </button>

                </div>

              </div>


              {/* Terms */}

              <div className="flex items-start gap-2 pt-1">

                <input
                  type="checkbox"
                  id="terms"
                  required
                  className="mt-1 h-4 w-4 shrink-0 cursor-pointer accent-[#B77D87]"
                />

                <label
                  htmlFor="terms"
                  className="text-xs leading-relaxed text-gray-500"
                >
                  I agree to the{" "}
                  <a href="/terms" className="font-semibold text-[#B77D87]">
                    Terms & Conditions
                  </a>{" "}
                  and{" "}
                  <a href="/privacy-policy" className="font-semibold text-[#B77D87]">
                    Privacy Policy
                  </a>.
                </label>

              </div>


              {/* Register Button */}

              <button
                type="submit"
                disabled={loading}
                className={`w-full rounded-xl text-white py-3.5 text-base font-bold shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#333333] hover:shadow-xl active:translate-y-0 ${
                  loading
                    ? "bg-[#999999] cursor-not-allowed"
                    : "bg-[#4A4A4A] hover:bg-[#333333]"
                }`}
              >
                {loading ? "Creating account..." : "Create Account →"}
              </button>

            </form>


            {/* Login Link */}

            <div className="mt-4 text-center">

              <p className="text-sm text-gray-500">

                Already have an account?

                <a
                  href="/login"
                  className="ml-2 font-bold text-[#B77D87] transition hover:text-[#4A4A4A]"
                >
                  Login
                </a>

              </p>

            </div>


            {/* Footer */}

            <div className="mt-4 text-center">

              <div className="mb-3 h-px bg-[#E2B4BD]/50" />

              <p className="text-xs text-gray-400">
                Secure Registration · Shopnest © 2026
              </p>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

export default Register;
