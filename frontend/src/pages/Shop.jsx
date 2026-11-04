import React, { useMemo, useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import {
  Search,
  Heart,
  ShoppingCart,
  Star,
  SlidersHorizontal,
  X,
  ChevronDown,
  ArrowUpDown,
  Filter,
  ShoppingBag,
} from "lucide-react";
import { productAPI } from "../lib/api";
import { useCart } from "../context/cartContext";
import { matchesCategory } from "../lib/catalog";

const Shop = () => {
  const [searchParams] = useSearchParams();
  const requestedCategory = searchParams.get("category") || "All";
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState(requestedCategory);
  const [sort, setSort] = useState("default");
  const [maxPrice, setMaxPrice] = useState(100000);
  const [minRating, setMinRating] = useState("all");
  const [wishlist, setWishlist] = useState([]);
  const { items, addItem } = useCart();
  const [showFilters, setShowFilters] = useState(false);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await productAPI.getAll();
        setProducts(response.data || []);
      } catch (err) {
        setError("Failed to load products");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Wishlist
  const toggleWishlist = (id) => {
    setWishlist((prev) =>
      prev.includes(id)
        ? prev.filter((item) => item !== id)
        : [...prev, id]
    );
  };

  const categories = useMemo(
    () => ["All", ...new Set([
      ...products.map((product) => product.category).filter(Boolean),
      "Fashion",
      "Home & Living",
      "Sports & Fitness",
      "Bags & Luggage",
    ])],
    [products],
  );
  const cart = items.map((item) => item._id || item.id);
  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let result = products.filter((product) => {
      const matchesSearch = product.name
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchesSelectedCategory = matchesCategory(product.category, category);

      const matchesPrice = product.price <= maxPrice;

      const matchesRating =
        minRating === "all" || product.rating >= Number(minRating);

      return (
        matchesSearch &&
        matchesSelectedCategory &&
        matchesPrice &&
        matchesRating
      );
    });

    if (sort === "low") {
      result.sort((a, b) => a.price - b.price);
    } else if (sort === "high") {
      result.sort((a, b) => b.price - a.price);
    } else if (sort === "rating") {
      result.sort((a, b) => b.rating - a.rating);
    } else if (sort === "discount") {
      result.sort(
        (a, b) =>
          ((b.oldPrice - b.price) / b.oldPrice || 0) -
          ((a.oldPrice - a.price) / a.oldPrice || 0)
      );
    }

    return result;
  }, [search, category, maxPrice, minRating, sort, products]);

  // Clear filters
  const clearFilters = () => {
    setSearch("");
    setCategory("All");
    setSort("default");
    setMaxPrice(100000);
    setMinRating("all");
  };

  // Product card
  const ProductCard = ({ product }) => {
    const isWishlisted = wishlist.includes(product._id || product.id);
    const isAdded = cart.includes(product._id || product.id);

    return (
      <div className="group bg-white rounded-2xl overflow-hidden border border-[#E2B4BD]/30 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">

        {/* Image */}
        <div className="relative bg-[#FFF5F5] overflow-hidden">

          <img
            src={product.imageUrl || product.image}
            alt={product.name}
            className="w-full h-48 sm:h-52 object-cover group-hover:scale-105 transition-transform duration-500"
          />
          {
            console.log(product.imageUrl || product.image)
          }

          {product.discount && (
            <span className="absolute top-3 left-3 bg-[#E2B4BD] text-[#24564D] text-xs font-bold px-3 py-1.5 rounded-full">
              {product.discount}
            </span>
          )}

          <button
            onClick={() => toggleWishlist(product._id || product.id)}
            aria-label="Toggle wishlist"
            className={`absolute top-3 right-3 w-9 h-9 rounded-full flex items-center justify-center shadow-md transition ${
              isWishlisted
                ? "bg-[#24564D] text-white"
                : "bg-white text-[#24564D] hover:bg-[#F7D6D0]"
            }`}
          >
            <Heart
              size={17}
              fill={isWishlisted ? "currentColor" : "none"}
            />
          </button>

        </div>

        {/* Details */}
        <div className="p-4">

          <p className="text-xs text-[#B77D87] font-semibold mb-1">
            {product.category}
          </p>

          <h3 className="text-sm sm:text-base font-bold text-[#24564D] line-clamp-1">
            {product.name}
          </h3>

          <div className="flex items-center gap-1 mt-2">
            <Star size={14} fill="#E5A900" color="#E5A900" />

            <span className="text-xs font-semibold text-[#24564D]">
              {product.rating}
            </span>

            <span className="text-xs text-gray-400">
              ({product.numReviews || 0} reviews)
            </span>
          </div>

          <div className="flex items-center gap-2 mt-3">
            <span className="text-lg font-extrabold text-[#24564D]">
              ₹{product.price.toLocaleString("en-IN")}
            </span>

            {product.oldPrice && (
              <span className="text-xs text-gray-400 line-through">
                ₹{product.oldPrice.toLocaleString("en-IN")}
              </span>
            )}
          </div>

          <button
            onClick={() => addItem(product)}
            disabled={product.stock === 0}
            className={`w-full mt-4 py-2.5 rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition ${
              isAdded
                ? "bg-[#E2B4BD] text-[#24564D]"
                : "bg-[#24564D] text-white hover:bg-[#193F38]"
            }`}
          >
            <ShoppingCart size={16} />
            {product.stock === 0 ? "Out of Stock" : isAdded ? "Added to Cart ✓" : "Add to Cart"}
          </button>

        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FFF5F5] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#24564D]"></div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#FFF5F5]">

      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {error && (
          <div className="p-4 rounded-lg bg-red-50 text-red-700 text-sm border border-red-100 mb-6">
            {error}
          </div>
        )}

        {/* BREADCRUMB */}
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-5">
          <a href="/" className="hover:text-[#24564D]">
            Home
          </a>
          <span>/</span>
          <span className="font-semibold text-[#24564D]">
            Shop
          </span>
        </div>

        {/* PAGE HEADING */}
        <div className="bg-[#F7D6D0] rounded-3xl p-6 sm:p-10 mb-8 relative overflow-hidden">

          <div className="relative z-10 max-w-xl">

            <span className="inline-flex items-center gap-2 bg-white/60 text-[#24564D] px-4 py-2 rounded-full text-xs font-bold">
              <ShoppingBag size={14} />
              EXPLORE OUR COLLECTION
            </span>

            <h1 className="text-3xl sm:text-5xl font-extrabold text-[#24564D] mt-5">
              Find Your
              <br />
              Perfect Match.
            </h1>

            <p className="text-[#4A4A4A]/80 text-sm sm:text-base mt-4 max-w-md leading-relaxed">
              Explore our exclusive collection of products.
              Great quality, amazing prices and a better
              shopping experience.
            </p>

          </div>

          <div className="absolute -right-10 -bottom-20 w-72 h-72 rounded-full bg-white/30" />
          <div className="absolute right-20 top-5 w-24 h-24 rounded-full bg-[#E2B4BD]/40" />

        </div>

        {/* SEARCH BAR */}
        <div className="flex flex-col sm:flex-row gap-3 mb-7">

          <div className="flex-1 relative">

            <Search
              size={19}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-[#24564D]"
            />

            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-12 pr-4 py-3.5 bg-white border border-[#E2B4BD]/50 rounded-xl outline-none text-sm text-[#24564D] focus:border-[#24564D] transition"
            />

            {search && (
              <button
                onClick={() => setSearch("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
              >
                <X size={17} />
              </button>
            )}

          </div>

          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center justify-center gap-2 px-6 py-3.5 bg-[#24564D] text-white rounded-xl font-bold text-sm hover:bg-[#193F38] transition lg:hidden"
          >
            <SlidersHorizontal size={17} />
            Filters
          </button>

          <div className="relative">

            <ArrowUpDown
              size={17}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-[#24564D]"
            />

            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="w-full sm:w-52 appearance-none pl-11 pr-10 py-3.5 bg-white border border-[#E2B4BD]/50 rounded-xl outline-none text-sm font-semibold text-[#24564D] cursor-pointer"
            >
              <option value="default">Sort By: Featured</option>
              <option value="low">Price: Low to High</option>
              <option value="high">Price: High to Low</option>
              <option value="rating">Top Rated</option>
              <option value="discount">Biggest Discount</option>
            </select>

            <ChevronDown
              size={16}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-[#24564D] pointer-events-none"
            />

          </div>

        </div>

        {/* CONTENT */}
        <div className="grid lg:grid-cols-4 gap-7">

          {/* SIDEBAR FILTERS */}
          <aside className={`lg:block ${showFilters ? "block" : "hidden"}`}>

            <div className="bg-white rounded-2xl p-5 border border-[#E2B4BD]/30 sticky top-24">

              <div className="flex items-center justify-between mb-6">

                <h2 className="text-lg font-extrabold text-[#24564D] flex items-center gap-2">
                  <Filter size={18} />
                  Filters
                </h2>

                <button
                  onClick={clearFilters}
                  className="text-xs font-bold text-[#B77D87] hover:text-[#24564D]"
                >
                  Clear All
                </button>

              </div>

              {/* CATEGORY */}
              <div className="pb-6 border-b border-[#E2B4BD]/30">

                <h3 className="font-bold text-[#24564D] mb-4">
                  Categories
                </h3>

                <div className="space-y-3">

                  {categories.map((item) => (
                    <button
                      key={item}
                      onClick={() => {
                        setCategory(item);
                        setShowFilters(false);
                      }}
                      className={`w-full flex items-center justify-between text-sm transition ${
                        category === item
                          ? "text-[#24564D] font-bold"
                          : "text-gray-500 hover:text-[#24564D]"
                      }`}
                    >
                      {item}

                      {category === item && (
                        <span className="w-2 h-2 rounded-full bg-[#24564D]" />
                      )}

                    </button>
                  ))}

                </div>

              </div>

              {/* PRICE */}
              <div className="py-6 border-b border-[#E2B4BD]/30">

                <h3 className="font-bold text-[#24564D] mb-4">
                  Maximum Price
                </h3>

                <div className="flex items-center justify-between mb-3">

                  <span className="text-xs text-gray-500">
                    Up to
                  </span>

                  <span className="text-sm font-bold text-[#24564D]">
                    ₹{maxPrice.toLocaleString("en-IN")}
                  </span>

                </div>

                <input
                  type="range"
                  min="0"
                  max="100000"
                  step="100"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="w-full accent-[#24564D] cursor-pointer"
                />

                <div className="flex justify-between text-xs text-gray-400 mt-2">
                  <span>₹0</span>
                  <span>₹1,00,000</span>
                </div>

              </div>

              {/* RATING */}
              <div className="py-6">

                <h3 className="font-bold text-[#24564D] mb-4">
                  Customer Rating
                </h3>

                <div className="space-y-3">

                  {[
                    { value: "all", label: "All Ratings" },
                    { value: "4.5", label: "4.5 & above" },
                    { value: "4", label: "4 & above" },
                    { value: "3", label: "3 & above" },
                  ].map((item) => (
                    <label
                      key={item.value}
                      className="flex items-center gap-3 cursor-pointer text-sm text-gray-500"
                    >

                      <input
                        type="radio"
                        name="rating"
                        value={item.value}
                        checked={minRating === item.value}
                        onChange={(e) => setMinRating(e.target.value)}
                        className="accent-[#24564D]"
                      />

                      {item.label}

                    </label>
                  ))}

                </div>

              </div>

            </div>

          </aside>

          {/* PRODUCTS SECTION */}
          <section className="lg:col-span-3">

            <div className="flex justify-between items-center mb-5">

              <div>
                <h2 className="text-xl font-extrabold text-[#24564D]">
                  All Products
                </h2>

                <p className="text-xs text-gray-500 mt-1">
                  Showing {filteredProducts.length} of {products.length} products
                </p>
              </div>

              <span className="hidden sm:block text-xs text-[#B77D87] font-semibold">
                Shop Smart. Save More.
              </span>

            </div>

            {/* PRODUCT GRID */}
            {filteredProducts.length > 0 ? (

              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">

                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product._id || product.id}
                    product={product}
                  />
                ))}

              </div>

            ) : (

              <div className="bg-white rounded-2xl p-10 text-center">

                <ShoppingBag
                  size={45}
                  className="mx-auto text-[#E2B4BD]"
                />

                <h3 className="text-xl font-bold text-[#24564D] mt-4">
                  No Products Found
                </h3>

                <p className="text-sm text-gray-500 mt-2">
                  Try changing your search or filters.
                </p>

                <button
                  onClick={clearFilters}
                  className="mt-5 px-6 py-2.5 bg-[#24564D] text-white rounded-xl text-sm font-bold hover:bg-[#193F38]"
                >
                  Clear Filters
                </button>

              </div>

            )}

          </section>

        </div>

        {/* BOTTOM BANNER */}
        <div className="mt-14 bg-[#E2B4BD] rounded-2xl p-7 sm:p-10 text-center">

          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#24564D]">
            Love Shopping? We Love Saving!
          </h2>

          <p className="text-sm text-[#24564D]/80 mt-3">
            Explore exciting offers and discover something special today.
          </p>

          <a
            href="/"
            className="inline-block mt-5 bg-[#24564D] text-white px-7 py-3 rounded-xl font-bold text-sm hover:bg-[#193F38] transition"
          >
            Back to Home
          </a>

        </div>

      </div>
    </main>
  );
};

export default Shop;
