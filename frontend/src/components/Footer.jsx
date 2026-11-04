
import React from "react";
import { useState } from "react";
import { newsletterAPI } from "../lib/api";
import {
  FaInstagram,
  FaYoutube,
  FaFacebookF,
  FaLinkedinIn,
  FaChevronRight,
  FaArrowRight,
  FaEnvelope,
  FaLock,
} from "react-icons/fa";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [newsletterMessage, setNewsletterMessage] = useState("");

  const subscribe = async (event) => {
    event.preventDefault();
    setNewsletterMessage("");
    try {
      const { data } = await newsletterAPI.subscribe(email);
      setNewsletterMessage(data.message);
      setEmail("");
    } catch (error) {
      setNewsletterMessage(error.response?.data?.message || "Subscription failed. Please try again.");
    }
  };

  const quickLinks = [
    { name: "Home", path: "/" },
    { name: "Shop", path: "/shop" },
    { name: "Categories", path: "/categories" },
    { name: "Deals", path: "/shop" },
    { name: "About Us", path: "/about" },
  ];

  const supportLinks = [
    { name: "Contact Us", path: "/contact" },
    { name: "FAQs", path: "/faq" },
    { name: "Shipping Policy", path: "/shipping" },
    { name: "Returns & Refunds", path: "/returns" },
    { name: "Track Order", path: "/track-order" },
  ];

  const legalLinks = [
    { name: "Privacy Policy", path: "/privacy-policy" },
    { name: "Terms & Conditions", path: "/terms" },
    { name: "Refund Policy", path: "/refund-policy" },
  ];

  const socialLinks = [
    { icon: <FaInstagram />, link: "https://instagram.com" },
    { icon: <FaFacebookF />, link: "https://facebook.com" },
    { icon: <FaYoutube />, link: "https://youtube.com" },
    { icon: <FaLinkedinIn />, link: "https://linkedin.com" },
  ];

  return (
    <footer className="bg-[#FDF3F3] text-[#24564D]">

      <div className="max-w-[1280px] mx-auto px-5 lg:px-8 pt-9 pb-7">

        {/* MAIN FOOTER */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-7 lg:gap-6">

          {/* BRAND SECTION */}
          <div>

            <div className="flex items-center gap-2 mb-3">

              <img
                src="/Logo.png"
                alt="Shopnest"
                className="w-11 h-11 object-contain"
              />

              <h2 className="text-2xl font-extrabold tracking-wide">
                Shopnest
              </h2>

            </div>

            <p className="text-[#24564D]/80 text-sm leading-relaxed max-w-xs">
              Your one-stop destination for everything you love.
              Discover amazing products, enjoy exciting deals
              and experience seamless shopping.
            </p>

            {/* SOCIAL LINKS */}
            <div className="flex items-center gap-2 mt-4">

              {socialLinks.map((item, index) => (
                <a
                  key={index}
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-sm hover:bg-[#E2B4BD] hover:text-[#24564D] transition-all duration-300"
                >
                  {item.icon}
                </a>
              ))}

            </div>

          </div>

          {/* QUICK LINKS */}
          <div>

            <h3 className="text-base font-bold mb-4">
              Quick Links
            </h3>

            <ul className="space-y-2.5">

              {quickLinks.map((link, index) => (
                <li key={index}>

                  <a
                    href={link.path}
                    className="flex items-center gap-2 text-sm text-[#24564D]/80 hover:text-[#E2B4BD] transition-all duration-300"
                  >
                    <FaChevronRight className="text-[9px]" />
                    {link.name}
                  </a>

                </li>
              ))}

            </ul>

          </div>

          {/* SUPPORT */}
          <div>

            <h3 className="text-base font-bold mb-4">
              Customer Support
            </h3>

            <ul className="space-y-2.5">

              {supportLinks.map((link, index) => (
                <li key={index}>

                  <a
                    href={link.path}
                    className="flex items-center gap-2 text-sm text-[#24564D]/80 hover:text-[#E2B4BD] transition-all duration-300"
                  >
                    <FaChevronRight className="text-[9px]" />
                    {link.name}
                  </a>

                </li>
              ))}

            </ul>

          </div>

          {/* NEWSLETTER */}
          <div>

            <h3 className="text-base font-bold mb-3">
              Subscribe to Newsletter
            </h3>

            <p className="text-[#24564D]/80 text-sm leading-relaxed mb-4">
              Get updates about new arrivals, exclusive offers
              and exciting deals.
            </p>

            <form
              onSubmit={subscribe}
              className="flex items-center bg-white rounded-lg overflow-hidden p-1"
            >

              <input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="Enter your email"
                required
                className="w-full min-w-0 px-3 py-2 text-sm text-[#24564D] outline-none placeholder:text-gray-400"
              />

              <button
                type="submit"
                className="bg-[#E2B4BD] text-[#24564D] px-3 py-2 rounded-md hover:bg-[#F7D6D0] transition-all duration-300"
              >
                <FaArrowRight className="text-sm" />
              </button>

            </form>
            {newsletterMessage && <p role="status" className="mt-2 text-xs">{newsletterMessage}</p>}

            <div className="flex items-center gap-2 mt-3 text-[#24564D]/80 text-xs">
              <FaEnvelope />
              <span>Stay connected with Shopnest</span>
            </div>

          </div>

        </div>

        {/* LEGAL LINKS */}
        <div className="border-t border-[#24564D]/20 mt-7 pt-5">

          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">

            <div className="flex flex-wrap justify-center gap-x-5 gap-y-2">

              {legalLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.path}
                  className="text-xs text-[#24564D]/80 hover:text-[#E2B4BD] transition"
                >
                  {link.name}
                </a>
              ))}

            </div>

            {/* SECURE PAYMENT */}
            <div className="flex items-center gap-2 text-[#24564D]">

              <FaLock className="text-xs" />

              <span className="text-xs">
                Secure & Safe Payments
              </span>

            </div>

          </div>

        </div>

        {/* COPYRIGHT */}
        <div className="border-t border-[#24564D]/20 mt-5 pt-4 text-center">

          <p className="text-xs text-[#24564D]/80">
            © 2026 Shopnest. All rights reserved.
          </p>

        </div>

      </div>

    </footer>
  );
};

export default Footer;
