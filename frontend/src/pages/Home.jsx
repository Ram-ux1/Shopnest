import React, { useState, useEffect } from "react";
import {
  ArrowRight,
  Heart,
  ShoppingCart,
  Star,
  Truck,
  ShieldCheck,
  Headphones,
  RotateCcw,
  Tag,
  Sparkles,
} from "lucide-react";
import { newsletterAPI, productAPI } from "../lib/api";
import { useCart } from "../context/cartContext";
import { matchesCategory } from "../lib/catalog";

const categories = [
  {
    name: "Fashion",
    image:
      "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=600",
    items: "120+ Products",
  },
  {
    name: "Electronics",
    image:
      "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=600",
    items: "85+ Products",
  },
  {
    name: "Beauty",
    image:
      "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=600",
    items: "95+ Products",
  },
  {
    name: "Home & Living",
    image:
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=600",
    items: "70+ Products",
  },
];

const features = [
  {
    icon: Truck,
    title: "Free Shipping",
    description: "On orders above ₹999",
  },
  {
    icon: ShieldCheck,
    title: "Secure Payments",
    description: "100% safe transactions",
  },
  {
    icon: RotateCcw,
    title: "Easy Returns",
    description: "Hassle-free returns",
  },
  {
    icon: Headphones,
    title: "24/7 Support",
    description: "We're always here to help",
  },
];

const ProductCard = ({
  product,
  wishlist,
  toggleWishlist,
  addToCart,
  cart,
}) => {
  const id = product._id || product.id;
  const isWishlisted = wishlist.includes(id);
  const isAdded = cart.includes(id);

  return (
    <div className="group bg-white rounded-2xl overflow-hidden border border-[#E2B4BD]/30 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">

      {/* Product Image */}
      <div className="relative bg-[#FFF5F5] overflow-hidden">

        <img
          src={product.imageUrl || product.image}
          alt={product.name}
          className="w-full h-48 sm:h-52 object-cover group-hover:scale-105 transition-transform duration-500"
        />

        {product.discount && (
          <span className="absolute top-3 left-3 bg-[#E2B4BD] text-[#24564D] text-xs font-bold px-3 py-1.5 rounded-full">
            {product.discount}
          </span>
        )}

        <button
          onClick={() => toggleWishlist(id)}
          aria-label="Toggle wishlist"
          className={`absolute top-3 right-3 w-9 h-9 rounded-full flex items-center justify-center shadow-md transition ${
            isWishlisted
              ? "bg-[#24564D] text-white"
              : "bg-white text-[#24564D] hover:bg-[#E2B4BD]"
          }`}
        >
          <Heart
            size={17}
            fill={isWishlisted ? "currentColor" : "none"}
          />
        </button>

      </div>

      {/* Product Details */}
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
          onClick={() => addToCart(product)}
          disabled={product.stock === 0}
          className={`w-full mt-4 py-2.5 rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition-all duration-300 ${
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

const Home = () => {
  const [wishlist, setWishlist] = useState([]);
  const { items, addItem } = useCart();
  const [email, setEmail] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [newsletterMessage, setNewsletterMessage] = useState("");

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

  const toggleWishlist = (id) => {
    setWishlist((prev) =>
      prev.includes(id)
        ? prev.filter((item) => item !== id)
        : [...prev, id]
    );
  };

  const cart = items.map((item) => item._id || item.id);
  const filteredProducts =
    activeCategory === "All"
      ? products
      : products.filter((product) => matchesCategory(product.category, activeCategory));

  const handleNewsletter = async (e) => {
    e.preventDefault();
    setNewsletterMessage("");
    try {
      const { data } = await newsletterAPI.subscribe(email);
      setNewsletterMessage(data.message);
      setEmail("");
    } catch (requestError) {
      setNewsletterMessage(requestError.response?.data?.message || "Subscription failed. Please try again.");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FFF5F5] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#24564D]"></div>
      </div>
    );
  }

  return (
    <main className="bg-[#FFF5F5] min-h-screen">

      {error && (
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="p-4 rounded-lg bg-red-50 text-red-700 text-sm border border-red-100">
            {error}
          </div>
        </div>
      )}

      {/* HERO SECTION */}
      <section className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 pt-6">

        <div className="relative bg-[#F7D6D0] rounded-3xl overflow-hidden">

          <div className="grid md:grid-cols-2 items-center">

            {/* Hero Content */}
            <div className="px-7 py-12 sm:px-12 lg:px-16 lg:py-16 relative z-10">

              <span className="inline-flex items-center gap-2 bg-white/70 text-[#24564D] px-4 py-2 rounded-full text-xs font-bold tracking-wider">
                <Sparkles size={14} />
                NEW SEASON COLLECTION
              </span>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#24564D] leading-tight mt-6">
                Shop Smart.
                <br />
                Save More.
              </h1>

              <p className="text-[#4A4A4A]/80 text-base sm:text-lg mt-5 max-w-md leading-relaxed">
                Discover the latest trends, explore amazing
                products and enjoy exclusive deals.
                Everything you love, all in one place.
              </p>

              <div className="flex flex-wrap gap-3 mt-8">

                <a
                  href="#products"
                  className="inline-flex items-center gap-2 bg-[#24564D] text-white px-7 py-3.5 rounded-xl font-bold hover:bg-[#193F38] hover:-translate-y-1 transition-all duration-300 shadow-lg"
                >
                  Shop Now
                  <ArrowRight size={18} />
                </a>

                <a
                  href="#categories"
                  className="inline-flex items-center gap-2 bg-white text-[#24564D] px-7 py-3.5 rounded-xl font-bold hover:bg-[#FFF5F5] transition-all duration-300"
                >
                  Explore Categories
                </a>

              </div>

              <div className="flex items-center gap-6 mt-9">

                <div>
                  <h3 className="text-2xl font-extrabold text-[#24564D]">
                    10K+
                  </h3>
                  <p className="text-xs text-[#4A4A4A]/70">
                    Happy Customers
                  </p>
                </div>

                <div className="w-px h-10 bg-[#24564D]/20" />

                <div>
                  <h3 className="text-2xl font-extrabold text-[#24564D]">
                    500+
                  </h3>
                  <p className="text-xs text-[#4A4A4A]/70">
                    Products
                  </p>
                </div>

                <div className="w-px h-10 bg-[#24564D]/20" />

                <div>
                  <h3 className="text-2xl font-extrabold text-[#24564D]">
                    4.8★
                  </h3>
                  <p className="text-xs text-[#4A4A4A]/70">
                    Customer Rating
                  </p>
                </div>

              </div>
            </div>

            {/* Hero Image */}
            <div className="relative h-[300px] md:h-[470px] p-5 sm:p-8">

              <div className="absolute top-8 right-8 w-64 h-64 bg-white/30 rounded-full blur-2xl" />

              <img
                src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1000"
                alt="Shopnest Shopping Collection"
                className="relative z-10 w-full h-full object-cover rounded-3xl shadow-2xl"
              />

              <div className="absolute z-20 bottom-10 left-0 sm:left-5 bg-white p-4 rounded-2xl shadow-xl">
                <p className="text-xs text-[#B77D87] font-bold">
                  SPECIAL OFFER
                </p>
                <h3 className="text-2xl font-extrabold text-[#24564D]">
                  UP TO 50% OFF
                </h3>
                <p className="text-xs text-gray-500">
                  Limited time deals
                </p>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 mt-8">

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">

          {features.map((feature, index) => {
            const Icon = feature.icon;

            return (
              <div
                key={index}
                className="bg-white rounded-2xl p-4 flex items-center gap-3 border border-[#E2B4BD]/30"
              >
                <div className="w-11 h-11 shrink-0 rounded-xl bg-[#F7D6D0] flex items-center justify-center text-[#24564D]">
                  <Icon size={21} />
                </div>

                <div>
                  <h3 className="text-sm font-bold text-[#24564D]">
                    {feature.title}
                  </h3>
                  <p className="text-xs text-gray-500 mt-1">
                    {feature.description}
                  </p>
                </div>

              </div>
            );
          })}

        </div>
      </section>

      {/* CATEGORIES SECTION */}
      <section
        id="categories"
        className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 mt-16"
      >

        <div className="flex items-end justify-between mb-7">

          <div>
            <p className="text-xs text-[#B77D87] font-bold tracking-widest uppercase">
              Explore Collections
            </p>

            <h2 className="text-3xl font-extrabold text-[#24564D] mt-2">
              Shop by Category
            </h2>

            <p className="text-sm text-gray-500 mt-2">
              Find everything you need in one place.
            </p>
          </div>

          <a
            href="#products"
            className="hidden sm:flex items-center gap-2 text-sm font-bold text-[#24564D] hover:text-[#B77D87]"
          >
            View All <ArrowRight size={17} />
          </a>

        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">

          {categories.map((category, index) => (
            <a
              href="#products"
              key={index}
              onClick={() => setActiveCategory(
                category.name === "Home & Living" ? "Home" : category.name
              )}
              className="group relative h-52 sm:h-64 rounded-2xl overflow-hidden"
            >

              <img
                src={category.image}
                alt={category.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

              <div className="absolute bottom-0 left-0 p-5">

                <h3 className="text-white text-xl font-extrabold">
                  {category.name}
                </h3>

                <p className="text-white/80 text-xs mt-1">
                  {category.items}
                </p>

                <span className="inline-flex items-center gap-2 text-white text-xs font-bold mt-3">
                  Explore <ArrowRight size={14} />
                </span>

              </div>

            </a>
          ))}

        </div>
      </section>

      {/* TRENDING PRODUCTS */}
      <section
        id="products"
        className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 mt-16"
      >

        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-7">

          <div>
            <p className="text-xs text-[#B77D87] font-bold tracking-widest uppercase">
              Customer Favorites
            </p>

            <h2 className="text-3xl font-extrabold text-[#24564D] mt-2">
              Trending Products
            </h2>

            <p className="text-sm text-gray-500 mt-2">
              Products everyone is loving right now.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">

            {["All", "Fashion", "Electronics", "Beauty", "Home & Living"].map(
              (category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-4 py-2 rounded-full text-xs font-bold transition ${
                    activeCategory === category
                      ? "bg-[#24564D] text-white"
                      : "bg-white text-[#24564D] border border-[#E2B4BD]/50 hover:bg-[#F7D6D0]"
                  }`}
                >
                  {category}
                </button>
              )
            )}

          </div>

        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">

          {filteredProducts.map((product) => (
            <ProductCard
              key={product._id || product.id}
              product={product}
              wishlist={wishlist}
              toggleWishlist={toggleWishlist}
              addToCart={addItem}
              cart={cart}
            />
          ))}

        </div>

        {filteredProducts.length === 0 && (
          <p className="text-center text-gray-500 py-10">
            No products found in this category.
          </p>
        )}

        <div className="flex justify-center mt-9">

          <a
            href="/shop"
            className="inline-flex items-center gap-3 px-8 py-3 rounded-xl border-2 border-[#24564D] text-[#24564D] font-bold hover:bg-[#24564D] hover:text-white transition-all duration-300"
          >
            View All Products
            <ArrowRight size={18} />
          </a>

        </div>
      </section>

      {/* SPECIAL OFFER BANNER */}
      <section className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 mt-16">

        <div className="bg-[#E2B4BD] rounded-3xl overflow-hidden">

          <div className="grid md:grid-cols-2 items-center">

            <div className="p-8 sm:p-12 lg:p-14">

              <span className="inline-flex items-center gap-2 text-xs font-bold text-[#24564D] bg-white/50 px-4 py-2 rounded-full">
                <Tag size={15} />
                EXCLUSIVE SHOPPING DEAL
              </span>

              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#24564D] mt-5 leading-tight">
                Big Deals,
                <br />
                Bigger Smiles!
              </h2>

              <p className="text-[#24564D]/80 mt-4 text-sm sm:text-base max-w-md">
                Get amazing discounts on your favorite products.
                Don't miss out on our limited-time offers.
              </p>

              <a
                href="/shop"
                className="inline-flex items-center gap-2 bg-[#24564D] text-white px-7 py-3 rounded-xl font-bold mt-7 hover:bg-[#193F38] transition"
              >
                Grab the Deals
                <ArrowRight size={18} />
              </a>

            </div>

            <div className="h-64 md:h-full min-h-[300px] p-5">

              <img
                src="https://images.unsplash.com/photo-1607082349566-187342175e2f?w=1000"
                alt="Shopping deals"
                className="w-full h-full object-cover rounded-2xl"
              />

            </div>

          </div>

        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 mt-16">

        <div className="text-center mb-9">

          <p className="text-xs text-[#B77D87] font-bold tracking-widest uppercase">
            The Shopnest Experience
          </p>

          <h2 className="text-3xl font-extrabold text-[#24564D] mt-2">
            Why Choose Shopnest?
          </h2>

          <p className="text-gray-500 text-sm mt-3 max-w-xl mx-auto">
            We make online shopping simple, enjoyable and
            convenient with products you'll love.
          </p>

        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">

          {[
            {
              icon: Sparkles,
              title: "Quality Products",
              desc: "Carefully selected products that bring value to your life.",
            },
            {
              icon: ShieldCheck,
              title: "Safe Shopping",
              desc: "Shop confidently with a secure shopping experience.",
            },
            {
              icon: Headphones,
              title: "Customer First",
              desc: "Our support team is always ready to help you.",
            },
          ].map((item, index) => {
            const Icon = item.icon;

            return (
              <div
                key={index}
                className="bg-white rounded-2xl p-7 text-center border border-[#E2B4BD]/30 hover:shadow-lg transition-all duration-300"
              >

                <div className="w-14 h-14 mx-auto rounded-2xl bg-[#F7D6D0] flex items-center justify-center text-[#24564D]">
                  <Icon size={25} />
                </div>

                <h3 className="text-lg font-bold text-[#24564D] mt-4">
                  {item.title}
                </h3>

                <p className="text-sm text-gray-500 mt-2 leading-relaxed">
                  {item.desc}
                </p>

              </div>
            );
          })}

        </div>
      </section>

      {/* NEWSLETTER */}
      <section className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 mt-16 mb-14">

        <div className="bg-[#24564D] rounded-3xl px-6 py-10 sm:p-12 text-center">

          <Sparkles className="mx-auto text-[#E2B4BD]" size={30} />

          <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-4">
            Stay in the Shopping Loop!
          </h2>

          <p className="text-white/70 text-sm mt-3 max-w-lg mx-auto">
            Subscribe to our newsletter and get updates on
            new arrivals, exclusive offers and exciting deals.
          </p>

          <form
            onSubmit={handleNewsletter}
            className="flex max-w-md mx-auto mt-7 bg-white rounded-xl p-1.5"
          >

            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              required
              className="flex-1 min-w-0 px-4 py-2 text-sm text-[#24564D] outline-none rounded-lg"
            />

            <button
              type="submit"
              className="bg-[#E2B4BD] text-[#24564D] px-5 py-2.5 rounded-lg text-sm font-bold hover:bg-[#F7D6D0] transition"
            >
              Subscribe
            </button>

          </form>
          {newsletterMessage && <p role="status" className="mt-3 text-sm text-white">{newsletterMessage}</p>}

        </div>
      </section>

    </main>
  );
};

export default Home;
