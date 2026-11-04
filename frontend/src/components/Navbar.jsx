import React, { useState } from "react";
import { useAuth } from "../context/authContext";
import { useCart } from "../context/cartContext";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, logout, loading } = useAuth();
  const { items } = useCart();
  const navigate = useNavigate();

  const links = [
    { name: "Home", path: "/" },
    { name: "Shop", path: "/shop" },
    { name: "Categories", path: "/categories" },
    { name: "About", path: "/about" },
    ...(user?.role === "admin"
      ? [{ name: "Admin Dashboard", path: "/admin-dashboard" }]
      : []),
  ];

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="sticky top-0 z-50 w-full bg-[#FFFFFF]/95 backdrop-blur-md border-b border-[#EADFCB] shadow-sm">

      <div className="max-w-[1440px] mx-auto px-5 lg:px-10">

        <div className="h-20 flex items-center justify-between">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 shrink-0">
            <img
              src="/Logo.png"
              alt="Shopnest"
              className="h-14 w-14 object-contain"
            />

            <div>
              <h1 className="text-2xl font-extrabold text-[#173E38] tracking-tight">
                Shopnest
              </h1>
              <p className="text-[10px] tracking-widest text-[#B77932]">
                SHOP SMART. SAVE MORE.
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-7">

            {links.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="relative text-[15px] font-semibold text-[#34433F] hover:text-[#E58A16] transition-colors duration-200 group py-2"
              >
                {link.name}

                <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#E58A16] group-hover:w-full transition-all duration-300"></span>
              </Link>
            ))}

          </div>

          {/* Right Actions */}
          <div className="hidden md:flex items-center gap-5">

            <Link
              to="/shop"
              aria-label="Search"
              className="text-[#173E38] hover:text-[#E58A16] transition"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <circle cx="11" cy="11" r="7" strokeWidth="2"/>
                <path d="m16 16 4 4" strokeWidth="2"/>
              </svg>
            </Link>

            <Link
              to="/cart"
              aria-label="Shopping cart"
              className="relative text-[#173E38] hover:text-[#E58A16] transition"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  d="M3 3h2l2.5 12h10l3-9H6"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <circle cx="9" cy="19" r="1" strokeWidth="2"/>
                <circle cx="17" cy="19" r="1" strokeWidth="2"/>
              </svg>
              {items.length > 0 && (
                <span className="absolute -top-2 -right-2 min-w-5 rounded-full bg-[#E2B4BD] px-1 text-center text-xs font-bold">
                  {items.reduce((count, item) => count + item.quantity, 0)}
                </span>
              )}
            </Link>

            {loading ? null : user ? (
              <>
                <Link
                  to="/profile"
                  className="font-semibold text-[#173E38] hover:text-[#E58A16] transition"
                >
                  {user.name}
                </Link>

                <button
                  onClick={handleLogout}
                  className="px-6 py-2.5 rounded-xl bg-[#E2B4BD] text-[#24564D] font-semibold hover:bg-[#F7D6D0] transition-all duration-300"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="font-semibold text-[#173E38] hover:text-[#E58A16] transition"
                >
                  Login
                </Link>

                <Link
                  to="/register"
                  className="px-6 py-2.5 rounded-xl bg-[#173E38] text-white font-semibold hover:bg-[#24564D] hover:shadow-lg transition-all duration-300"
                >
                  Register
                </Link>
              </>
            )}

          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden p-2 text-[#173E38]"
            aria-label="Toggle navigation menu"
            aria-expanded={menuOpen}
          >
            {menuOpen ? (
              <span className="text-3xl leading-none">&times;</span>
            ) : (
              <span className="text-2xl">☰</span>
            )}
          </button>

        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden border-t border-[#EADFCB] py-5 space-y-4">

            {links.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setMenuOpen(false)}
                className="block font-semibold text-[#34433F] hover:text-[#E58A16] transition"
              >
                {link.name}
              </Link>
            ))}

            {loading ? null : user ? (
              <div className="pt-3 border-t border-[#EADFCB]">
                <Link
                  to="/profile"
                  onClick={() => setMenuOpen(false)}
                  className="flex-1 text-center border border-[#173E38] rounded-xl py-2 text-[#173E38] font-semibold block"
                >
                  Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex-1 text-center bg-[#E2B4BD] text-[#24564D] rounded-xl py-2 font-semibold block mt-3"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex gap-3 pt-3">
                <Link
                  to="/login"
                  onClick={() => setMenuOpen(false)}
                  className="flex-1 text-center border border-[#173E38] rounded-xl py-2 text-[#173E38] font-semibold"
                >
                  Login
                </Link>

                <Link
                  to="/register"
                  onClick={() => setMenuOpen(false)}
                  className="flex-1 text-center bg-[#173E38] text-white rounded-xl py-2 font-semibold"
                >
                  Register
                </Link>
              </div>
            )}

          </div>
        )}

      </div>
    </nav>
  );
};

export default Navbar;
