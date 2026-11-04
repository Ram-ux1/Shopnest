import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight, Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { useCart } from "../context/cartContext";
import { getCartTotals } from "../lib/pricing";

const Cart = () => {
  const { items, removeItem, updateQuantity } = useCart();
  const [coupon, setCoupon] = useState("");
  const [couponApplied, setCouponApplied] = useState(false);
  const [couponMessage, setCouponMessage] = useState("");

  const { subtotal, shipping, discount, total } = useMemo(
    () => getCartTotals(items, couponApplied),
    [items, couponApplied],
  );

  const applyCoupon = () => {
    const valid = coupon.trim().toUpperCase() === "SHOP10" && subtotal > 0;
    setCouponApplied(valid);
    setCouponMessage(valid ? "10% discount applied." : "Invalid coupon code.");
  };

  if (items.length === 0) {
    return (
      <main className="min-h-[65vh] bg-[#FFF5F5] flex items-center justify-center px-4 py-12">
        <section className="bg-white max-w-lg w-full rounded-3xl p-8 text-center shadow-sm">
          <ShoppingBag size={42} className="mx-auto text-[#24564D]" />
          <h1 className="text-2xl font-extrabold text-[#24564D] mt-5">Your cart is empty</h1>
          <p className="text-gray-500 text-sm mt-3">Browse the shop and add products to your cart.</p>
          <Link to="/shop" className="inline-flex items-center gap-2 bg-[#24564D] text-white px-7 py-3 rounded-xl font-bold mt-6">
            <ArrowLeft size={17} /> Continue shopping
          </Link>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#FFF5F5] px-4 py-8 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-extrabold text-[#24564D] mb-7">Shopping cart</h1>
        <div className="grid gap-7 lg:grid-cols-3">
          <section className="lg:col-span-2 bg-white rounded-2xl border border-[#E2B4BD]/30 divide-y divide-[#E2B4BD]/30">
            {items.map((item) => {
              const id = item._id || item.id;
              return (
                <article key={id} className="p-5 flex gap-4">
                  <img
                    src={item.imageUrl || item.image}
                    alt={item.name}
                    className="w-24 h-24 sm:w-32 sm:h-32 rounded-xl object-cover bg-[#FFF5F5]"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-[#B77D87]">{item.category}</p>
                    <h2 className="font-bold text-[#24564D] mt-1">{item.name}</h2>
                    <p className="font-bold text-[#24564D] mt-2">₹{Number(item.price).toLocaleString("en-IN")}</p>
                    <div className="flex items-center justify-between mt-4">
                      <div className="flex items-center border rounded-lg">
                        <button
                          type="button"
                          aria-label={`Decrease ${item.name} quantity`}
                          onClick={() => updateQuantity(id, item.quantity - 1)}
                          className="p-2"
                        >
                          <Minus size={15} />
                        </button>
                        <span className="min-w-8 text-center">{item.quantity}</span>
                        <button
                          type="button"
                          aria-label={`Increase ${item.name} quantity`}
                          onClick={() => updateQuantity(id, item.quantity + 1)}
                          className="p-2"
                        >
                          <Plus size={15} />
                        </button>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeItem(id)}
                        aria-label={`Remove ${item.name}`}
                        className="text-red-600 p-2"
                      >
                        <Trash2 size={17} />
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </section>

          <aside className="bg-white rounded-2xl border border-[#E2B4BD]/30 p-5 h-fit">
            <h2 className="text-xl font-extrabold text-[#24564D] mb-5">Order summary</h2>
            <label htmlFor="coupon" className="block text-sm font-semibold mb-2">Coupon code</label>
            <div className="flex gap-2">
              <input
                id="coupon"
                value={coupon}
                onChange={(event) => {
                  setCoupon(event.target.value);
                  setCouponApplied(false);
                  setCouponMessage("");
                }}
                placeholder="Try SHOP10"
                className="min-w-0 flex-1 border rounded-lg px-3 py-2"
              />
              <button type="button" onClick={applyCoupon} className="bg-[#24564D] text-white rounded-lg px-4 font-semibold">
                Apply
              </button>
            </div>
            {couponMessage && <p role="status" className="text-xs mt-2">{couponMessage}</p>}
            <dl className="space-y-3 text-sm mt-6">
              <div className="flex justify-between"><dt>Subtotal</dt><dd>₹{subtotal.toLocaleString("en-IN")}</dd></div>
              <div className="flex justify-between"><dt>Shipping</dt><dd>{shipping ? `₹${shipping}` : "Free"}</dd></div>
              {discount > 0 && <div className="flex justify-between text-green-700"><dt>Discount</dt><dd>-₹{discount.toLocaleString("en-IN")}</dd></div>}
              <div className="border-t pt-4 flex justify-between font-extrabold text-base"><dt>Total</dt><dd>₹{total.toLocaleString("en-IN")}</dd></div>
            </dl>
            <Link to={`/checkout${couponApplied ? "?coupon=SHOP10" : ""}`} className="mt-6 w-full bg-[#24564D] text-white rounded-xl py-3 font-bold flex justify-center items-center gap-2">
              Proceed to checkout <ArrowRight size={17} />
            </Link>
          </aside>
        </div>
      </div>
    </main>
  );
};

export default Cart;
