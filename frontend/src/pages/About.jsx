
import React from "react";
import {
  Heart,
  Target,
  Eye,
  ShieldCheck,
  Truck,
  Headphones,
  Sparkles,
  ShoppingBag,
  Star,
  ArrowRight,
  CheckCircle2,
  Users,
  Award,
  Package,
} from "lucide-react";

const values = [
  {
    icon: Heart,
    title: "Customer First",
    description:
      "Our customers are at the heart of everything we do. Your satisfaction is our priority.",
  },
  {
    icon: ShieldCheck,
    title: "Trust & Quality",
    description:
      "We believe in offering quality products and a shopping experience you can trust.",
  },
  {
    icon: Sparkles,
    title: "Innovation",
    description:
      "We continuously improve our platform to make online shopping easier and better.",
  },
  {
    icon: Users,
    title: "Community",
    description:
      "We believe in building lasting relationships with our customers and partners.",
  },
];

const features = [
  {
    icon: Package,
    title: "Quality Products",
    description:
      "Carefully selected products that bring value and quality to your everyday life.",
  },
  {
    icon: Truck,
    title: "Fast Delivery",
    description:
      "We aim to deliver your favorite products safely and conveniently to your doorstep.",
  },
  {
    icon: ShieldCheck,
    title: "Secure Shopping",
    description:
      "Enjoy a secure shopping experience with a focus on protecting your information.",
  },
  {
    icon: Headphones,
    title: "Customer Support",
    description:
      "Our support team is here to help you whenever you need assistance.",
  },
];

const About = () => {
  return (
    <main className="min-h-screen bg-[#FFF5F5]">

      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* BREADCRUMB */}
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
          <a href="/" className="hover:text-[#24564D]">
            Home
          </a>
          <span>/</span>
          <span className="font-semibold text-[#24564D]">
            About Us
          </span>
        </div>

        {/* HERO SECTION */}
        <section className="relative bg-[#F7D6D0] rounded-3xl overflow-hidden">

          <div className="grid md:grid-cols-2 items-center">

            {/* CONTENT */}
            <div className="relative z-10 p-7 sm:p-10 lg:p-14">

              <span className="inline-flex items-center gap-2 bg-white/60 text-[#24564D] px-4 py-2 rounded-full text-xs font-bold tracking-wider">
                <Heart size={15} />
                WELCOME TO SHOPNEST
              </span>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#24564D] leading-tight mt-6">
                More Than
                <br />
                Just Shopping.
              </h1>

              <p className="text-[#4A4A4A]/80 text-sm sm:text-base mt-5 max-w-md leading-relaxed">
                We believe shopping should be simple, enjoyable
                and accessible to everyone. Discover a world of
                amazing products and a better shopping experience
                with Shopnest.
              </p>

              <a
                href="/shop"
                className="inline-flex items-center gap-2 bg-[#24564D] text-white px-7 py-3.5 rounded-xl font-bold mt-7 hover:bg-[#193F38] transition-all duration-300 shadow-lg"
              >
                Explore Our Store
                <ArrowRight size={18} />
              </a>

            </div>

            {/* HERO IMAGE */}
            <div className="h-64 md:h-[430px] p-5 sm:p-7">

              <img
                src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1000"
                alt="Shopnest shopping experience"
                className="w-full h-full object-cover rounded-2xl shadow-xl"
              />

            </div>

          </div>

        </section>

        {/* OUR STORY */}
        <section className="mt-16">

          <div className="grid md:grid-cols-2 gap-10 lg:gap-16 items-center">

            {/* IMAGE */}
            <div className="relative">

              <img
                src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=900"
                alt="Online shopping experience"
                className="w-full h-[320px] sm:h-[400px] object-cover rounded-3xl"
              />

              <div className="absolute -bottom-5 right-5 sm:right-8 bg-white rounded-2xl p-5 shadow-xl border border-[#E2B4BD]/30">

                <div className="flex items-center gap-3">

                  <div className="w-11 h-11 bg-[#F7D6D0] rounded-xl flex items-center justify-center text-[#24564D]">
                    <ShoppingBag size={23} />
                  </div>

                  <div>
                    <h3 className="text-lg font-extrabold text-[#24564D]">
                      Shopnest
                    </h3>
                    <p className="text-xs text-gray-500">
                      Your Shopping Destination
                    </p>
                  </div>

                </div>

              </div>

            </div>

            {/* STORY CONTENT */}
            <div className="mt-5 md:mt-0">

              <p className="text-xs text-[#B77D87] font-bold tracking-widest uppercase">
                Who We Are
              </p>

              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#24564D] mt-3 leading-tight">
                Our Story
              </h2>

              <p className="text-sm text-gray-600 mt-5 leading-7">
                Shopnest is an online shopping platform created
                with a simple idea: make shopping easier,
                convenient and enjoyable for everyone.
              </p>

              <p className="text-sm text-gray-600 mt-4 leading-7">
                We bring different product categories together
                in one place, helping customers explore their
                favorite products without the hassle of visiting
                multiple stores.
              </p>

              <p className="text-sm text-gray-600 mt-4 leading-7">
                From everyday essentials to lifestyle products,
                our goal is to create a smooth shopping journey
                where quality, convenience and customer
                satisfaction come first.
              </p>

              <div className="flex flex-col gap-3 mt-6">

                {[
                  "Easy and convenient shopping",
                  "Wide range of product categories",
                  "Customer-focused experience",
                ].map((item, index) => (

                  <div key={index} className="flex items-center gap-3">
                    <CheckCircle2
                      size={19}
                      className="text-[#24564D] shrink-0"
                    />
                    <span className="text-sm font-medium text-[#24564D]">
                      {item}
                    </span>
                  </div>

                ))}

              </div>

            </div>

          </div>

        </section>

        {/* MISSION AND VISION */}
        <section className="mt-20">

          <div className="text-center mb-9">

            <p className="text-xs text-[#B77D87] font-bold tracking-widest uppercase">
              Our Purpose
            </p>

            <h2 className="text-3xl font-extrabold text-[#24564D] mt-2">
              Mission & Vision
            </h2>

            <p className="text-sm text-gray-500 mt-3 max-w-xl mx-auto">
              What drives us and what we aspire to achieve.
            </p>

          </div>

          <div className="grid md:grid-cols-2 gap-6">

            {/* MISSION */}
            <div className="bg-[#F7D6D0] rounded-3xl p-7 sm:p-9">

              <div className="w-14 h-14 bg-white/70 rounded-2xl flex items-center justify-center text-[#24564D]">
                <Target size={28} />
              </div>

              <h3 className="text-2xl font-extrabold text-[#24564D] mt-5">
                Our Mission
              </h3>

              <p className="text-sm text-[#4A4A4A]/80 mt-4 leading-7">
                Our mission is to provide customers with a
                convenient, reliable and enjoyable online
                shopping experience by bringing quality
                products and great value together on one platform.
              </p>

            </div>

            {/* VISION */}
            <div className="bg-[#E2B4BD] rounded-3xl p-7 sm:p-9">

              <div className="w-14 h-14 bg-white/70 rounded-2xl flex items-center justify-center text-[#24564D]">
                <Eye size={28} />
              </div>

              <h3 className="text-2xl font-extrabold text-[#24564D] mt-5">
                Our Vision
              </h3>

              <p className="text-sm text-[#24564D]/80 mt-4 leading-7">
                Our vision is to become a trusted shopping
                destination where customers can discover
                everything they need through innovation,
                convenience and exceptional service.
              </p>

            </div>

          </div>

        </section>

        {/* WHY CHOOSE US */}
        <section className="mt-20">

          <div className="text-center mb-9">

            <p className="text-xs text-[#B77D87] font-bold tracking-widest uppercase">
              The Shopnest Experience
            </p>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#24564D] mt-2">
              Why Choose Shopnest?
            </h2>

            <p className="text-sm text-gray-500 mt-3 max-w-xl mx-auto">
              We focus on making every part of your shopping
              journey simple, safe and satisfying.
            </p>

          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">

            {features.map((feature, index) => {

              const Icon = feature.icon;

              return (
                <div
                  key={index}
                  className="bg-white rounded-2xl p-6 text-center border border-[#E2B4BD]/30 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                >

                  <div className="w-14 h-14 mx-auto rounded-2xl bg-[#F7D6D0] flex items-center justify-center text-[#24564D]">
                    <Icon size={25} />
                  </div>

                  <h3 className="text-base font-bold text-[#24564D] mt-5">
                    {feature.title}
                  </h3>

                  <p className="text-xs text-gray-500 mt-3 leading-relaxed">
                    {feature.description}
                  </p>

                </div>
              );

            })}

          </div>

        </section>

        {/* OUR VALUES */}
        <section className="mt-20">

          <div className="grid md:grid-cols-2 gap-10 items-center">

            <div>

              <p className="text-xs text-[#B77D87] font-bold tracking-widest uppercase">
                What We Believe In
              </p>

              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#24564D] mt-3">
                Our Core Values
              </h2>

              <p className="text-sm text-gray-500 mt-4 leading-7">
                Our values shape the way we work, the way we
                serve our customers and the experience we
                aim to create every day.
              </p>

              <div className="mt-7 space-y-5">

                {values.map((value, index) => {

                  const Icon = value.icon;

                  return (
                    <div
                      key={index}
                      className="flex items-start gap-4"
                    >

                      <div className="w-11 h-11 shrink-0 bg-[#F7D6D0] rounded-xl flex items-center justify-center text-[#24564D]">
                        <Icon size={21} />
                      </div>

                      <div>
                        <h3 className="text-base font-bold text-[#24564D]">
                          {value.title}
                        </h3>

                        <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                          {value.description}
                        </p>
                      </div>

                    </div>
                  );

                })}

              </div>

            </div>

            <div className="relative">

              <img
                src="https://images.unsplash.com/photo-1556740738-b6a63e27c4df?w=900"
                alt="Customer shopping experience"
                className="w-full h-[400px] object-cover rounded-3xl"
              />

              <div className="absolute bottom-5 left-5 right-5 bg-white/95 backdrop-blur-sm rounded-2xl p-5">

                <div className="flex items-center gap-3">

                  <div className="w-11 h-11 rounded-xl bg-[#F7D6D0] flex items-center justify-center text-[#24564D]">
                    <Star size={22} fill="currentColor" />
                  </div>

                  <div>
                    <h3 className="text-sm font-extrabold text-[#24564D]">
                      Shopping Made Simple
                    </h3>

                    <p className="text-xs text-gray-500 mt-1">
                      Everything you love in one place.
                    </p>
                  </div>

                </div>

              </div>

            </div>

          </div>

        </section>

        {/* BRAND PROMISE */}
        <section className="mt-20">

          <div className="bg-[#24564D] rounded-3xl p-8 sm:p-12 text-center">

            <div className="w-14 h-14 mx-auto bg-white/10 rounded-2xl flex items-center justify-center text-[#E2B4BD]">
              <Award size={28} />
            </div>

            <h2 className="text-2xl sm:text-4xl font-extrabold text-white mt-5">
              Your Happiness, Our Priority.
            </h2>

            <p className="text-sm text-white/70 mt-4 max-w-xl mx-auto leading-relaxed">
              At Shopnest, we want every shopping experience
              to be convenient, enjoyable and worth coming back for.
              Thank you for being a part of our journey.
            </p>

            <div className="flex flex-wrap justify-center gap-4 mt-8">

              <a
                href="/shop"
                className="inline-flex items-center gap-2 bg-[#E2B4BD] text-[#24564D] px-7 py-3 rounded-xl font-bold text-sm hover:bg-[#F7D6D0] transition"
              >
                Start Shopping
                <ArrowRight size={17} />
              </a>

              <a
                href="/contact"
                className="inline-flex items-center gap-2 border border-white/50 text-white px-7 py-3 rounded-xl font-bold text-sm hover:bg-white/10 transition"
              >
                Contact Us
              </a>

            </div>

          </div>

        </section>

      </div>

    </main>
  );
};

export default About;
