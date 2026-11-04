
import React, { useState } from "react";
import {
  Search,
  ArrowRight,
  ShoppingBag,
  Sparkles,
  Heart,
  Star,
  Grid3X3,
  X,
} from "lucide-react";

const categories = [
  {
    id: 1,
    name: "Fashion",
    description: "Discover the latest fashion trends and styles.",
    products: 120,
    image:
      "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800",
    color: "#F7D6D0",
    subcategories: ["Men", "Women", "Clothing", "Shoes", "Bags"],
  },
  {
    id: 2,
    name: "Electronics",
    description: "Upgrade your lifestyle with smart technology.",
    products: 85,
    image:
      "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=800",
    color: "#E2B4BD",
    subcategories: ["Mobiles", "Headphones", "Laptops", "Speakers"],
  },
  {
    id: 3,
    name: "Beauty",
    description: "Feel beautiful with our premium beauty collection.",
    products: 95,
    image:
      "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=800",
    color: "#F7D6D0",
    subcategories: ["Skincare", "Makeup", "Perfumes", "Haircare"],
  },
  {
    id: 4,
    name: "Home & Living",
    description: "Make your home beautiful and comfortable.",
    products: 70,
    image:
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800",
    color: "#E2B4BD",
    subcategories: ["Furniture", "Decor", "Lighting", "Kitchen"],
  },
  {
    id: 5,
    name: "Accessories",
    description: "Complete your look with stylish accessories.",
    products: 65,
    image:
      "https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=800",
    color: "#F7D6D0",
    subcategories: ["Watches", "Sunglasses", "Jewellery", "Wallets"],
  },
  {
    id: 6,
    name: "Sports & Fitness",
    description: "Stay active and achieve your fitness goals.",
    products: 55,
    image:
      "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800",
    color: "#E2B4BD",
    subcategories: ["Gym", "Sportswear", "Equipment", "Outdoor"],
  },
  {
    id: 7,
    name: "Footwear",
    description: "Step into comfort with trendy footwear.",
    products: 90,
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800",
    color: "#F7D6D0",
    subcategories: ["Sneakers", "Casual", "Formal", "Sandals"],
  },
  {
    id: 8,
    name: "Bags & Luggage",
    description: "Carry your essentials in style wherever you go.",
    products: 45,
    image:
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800",
    color: "#E2B4BD",
    subcategories: ["Backpacks", "Handbags", "Travel Bags", "Wallets"],
  },
];

const Categories = () => {
  const [search, setSearch] = useState("");

  const filteredCategories = categories.filter((category) =>
    category.name.toLowerCase().includes(search.toLowerCase())
  );

  const totalProducts = categories.reduce(
    (total, category) => total + category.products,
    0
  );

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
            Categories
          </span>
        </div>

        {/* HERO SECTION */}
        <section className="relative bg-[#F7D6D0] rounded-3xl overflow-hidden">

          <div className="grid md:grid-cols-2 items-center">

            <div className="relative z-10 p-7 sm:p-10 lg:p-14">

              <span className="inline-flex items-center gap-2 bg-white/60 text-[#24564D] px-4 py-2 rounded-full text-xs font-bold tracking-wider">
                <Sparkles size={15} />
                EXPLORE OUR COLLECTIONS
              </span>

              <h1 className="text-4xl sm:text-5xl font-extrabold text-[#24564D] leading-tight mt-6">
                Find Your Style.
                <br />
                Shop Your Favorites.
              </h1>

              <p className="text-[#4A4A4A]/80 text-sm sm:text-base mt-5 max-w-md leading-relaxed">
                From everyday essentials to the latest trends,
                discover collections that match your lifestyle.
                Everything you love, all in one place.
              </p>

              <a
                href="#all-categories"
                className="inline-flex items-center gap-2 bg-[#24564D] text-white px-7 py-3.5 rounded-xl font-bold mt-7 hover:bg-[#193F38] transition-all duration-300 shadow-lg"
              >
                Explore Categories
                <ArrowRight size={18} />
              </a>

              <div className="flex gap-8 mt-8">

                <div>
                  <h3 className="text-2xl font-extrabold text-[#24564D]">
                    8+
                  </h3>
                  <p className="text-xs text-gray-600">
                    Categories
                  </p>
                </div>

                <div>
                  <h3 className="text-2xl font-extrabold text-[#24564D]">
                    {totalProducts}+
                  </h3>
                  <p className="text-xs text-gray-600">
                    Products
                  </p>
                </div>

              </div>

            </div>

            <div className="h-64 md:h-[390px] p-5 sm:p-7">

              <img
                src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1000"
                alt="Shopnest collections"
                className="w-full h-full object-cover rounded-2xl shadow-xl"
              />

            </div>

          </div>

        </section>

        {/* CATEGORY HEADING */}
        <section id="all-categories" className="mt-14">

          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-7">

            <div>

              <p className="text-xs text-[#B77D87] font-bold tracking-widest uppercase">
                Browse Collections
              </p>

              <h2 className="text-3xl font-extrabold text-[#24564D] mt-2">
                Explore Categories
              </h2>

              <p className="text-sm text-gray-500 mt-2">
                Find exactly what you are looking for.
              </p>

            </div>

            <div className="flex items-center gap-2 text-sm text-[#24564D]">
              <Grid3X3 size={17} />
              <span className="font-semibold">
                {filteredCategories.length} Categories
              </span>
            </div>

          </div>

          {/* SEARCH */}
          <div className="relative mb-8 max-w-lg">

            <Search
              size={19}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-[#24564D]"
            />

            <input
              type="text"
              placeholder="Search categories..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-white border border-[#E2B4BD]/50 rounded-xl py-3.5 pl-12 pr-12 text-sm text-[#24564D] outline-none focus:border-[#24564D] transition"
            />

            {search && (
              <button
                onClick={() => setSearch("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
                aria-label="Clear search"
              >
                <X size={17} />
              </button>
            )}

          </div>

          {/* CATEGORY GRID */}
          {filteredCategories.length > 0 ? (

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">

              {filteredCategories.map((category) => (

                <a
                  key={category.id}
                  href={`/shop?category=${encodeURIComponent(category.name)}`}
                  className="group bg-white rounded-2xl overflow-hidden border border-[#E2B4BD]/30 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                >

                  {/* IMAGE */}
                  <div className="relative h-48 overflow-hidden">

                    <img
                      src={category.image}
                      alt={category.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />

                    <span className="absolute bottom-3 left-4 bg-white/90 text-[#24564D] text-xs font-bold px-3 py-1.5 rounded-full">
                      {category.products}+ Products
                    </span>

                  </div>

                  {/* CONTENT */}
                  <div className="p-4">

                    <h3 className="text-lg font-extrabold text-[#24564D] group-hover:text-[#B77D87] transition">
                      {category.name}
                    </h3>

                    <p className="text-xs text-gray-500 mt-2 leading-relaxed min-h-9">
                      {category.description}
                    </p>

                    {/* SUBCATEGORIES */}
                    <div className="flex flex-wrap gap-1.5 mt-3">

                      {category.subcategories.slice(0, 3).map((item) => (
                        <span
                          key={item}
                          className="bg-[#FFF5F5] text-[#24564D] px-2 py-1 rounded-md text-[10px] font-medium"
                        >
                          {item}
                        </span>
                      ))}

                    </div>

                    <div className="border-t border-[#E2B4BD]/30 mt-4 pt-3 flex items-center justify-between">

                      <span className="text-xs font-bold text-[#24564D]">
                        Explore Collection
                      </span>

                      <div className="w-8 h-8 rounded-full bg-[#F7D6D0] text-[#24564D] flex items-center justify-center group-hover:bg-[#24564D] group-hover:text-white transition">
                        <ArrowRight size={16} />
                      </div>

                    </div>

                  </div>

                </a>

              ))}

            </div>

          ) : (

            <div className="bg-white rounded-2xl p-12 text-center">

              <ShoppingBag
                size={42}
                className="mx-auto text-[#E2B4BD]"
              />

              <h3 className="text-xl font-bold text-[#24564D] mt-4">
                No Categories Found
              </h3>

              <p className="text-sm text-gray-500 mt-2">
                Try searching with a different category name.
              </p>

              <button
                onClick={() => setSearch("")}
                className="mt-5 bg-[#24564D] text-white px-6 py-2.5 rounded-xl text-sm font-bold"
              >
                Clear Search
              </button>

            </div>

          )}

        </section>

        {/* PROMOTIONAL BANNER */}
        <section className="mt-16 bg-[#E2B4BD] rounded-3xl p-7 sm:p-12 relative overflow-hidden">

          <div className="relative z-10 max-w-xl">

            <span className="inline-flex items-center gap-2 bg-white/50 text-[#24564D] px-4 py-2 rounded-full text-xs font-bold">
              <Heart size={14} />
              SHOP YOUR WAY
            </span>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#24564D] mt-5">
              Something Special
              <br />
              For Everyone!
            </h2>

            <p className="text-sm text-[#24564D]/80 mt-4 leading-relaxed">
              Discover exciting collections, amazing products
              and exclusive deals only at Shopnest.
            </p>

            <a
              href="/shop"
              className="inline-flex items-center gap-2 bg-[#24564D] text-white px-7 py-3 rounded-xl font-bold text-sm mt-6 hover:bg-[#193F38] transition"
            >
              Start Shopping
              <ArrowRight size={17} />
            </a>

          </div>

          <div className="absolute -right-16 -bottom-24 w-72 h-72 bg-white/20 rounded-full" />
          <div className="absolute right-20 top-0 w-24 h-24 bg-white/20 rounded-full" />

        </section>

        {/* BOTTOM TRUST SECTION */}
        <section className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-10">

          {[
            {
              icon: ShoppingBag,
              title: "Wide Collection",
              desc: "Products for every lifestyle.",
            },
            {
              icon: Star,
              title: "Quality Products",
              desc: "Shop with confidence.",
            },
            {
              icon: Heart,
              title: "Customer First",
              desc: "Your happiness matters.",
            },
          ].map((item, index) => {

            const Icon = item.icon;

            return (
              <div
                key={index}
                className="bg-white rounded-2xl p-5 flex items-center gap-4 border border-[#E2B4BD]/30"
              >

                <div className="w-12 h-12 rounded-xl bg-[#F7D6D0] flex items-center justify-center text-[#24564D] shrink-0">
                  <Icon size={22} />
                </div>

                <div>
                  <h3 className="font-bold text-sm text-[#24564D]">
                    {item.title}
                  </h3>

                  <p className="text-xs text-gray-500 mt-1">
                    {item.desc}
                  </p>
                </div>

              </div>
            );

          })}

        </section>

      </div>

    </main>
  );
};

export default Categories;
