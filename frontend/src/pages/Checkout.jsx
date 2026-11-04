import { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { orderAPI } from "../lib/api";
import { useAuth } from "../context/authContext";
import { useCart } from "../context/cartContext";
import { getCartTotals } from "../lib/pricing";

const initialAddress = {
  fullName: "",
  street: "",
  city: "",
  postalCode: "",
  country: "",
};

const Checkout = () => {
  const { user } = useAuth();
  const { items, clearCart } = useCart();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const couponCode = searchParams.get("coupon") || "";
  const totals = getCartTotals(items, couponCode.toUpperCase() === "SHOP10");
  const [address, setAddress] = useState({
    ...initialAddress,
    fullName: user?.name || "",
  });
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const submitOrder = async (event) => {
    event.preventDefault();
    if (!items.length) {
      setError("Your cart is empty.");
      return;
    }

    setSubmitting(true);
    setError("");
    try {
      await orderAPI.create({
        items: items.map((item) => ({
          product: item._id || item.id,
          quantity: item.quantity,
        })),
        address,
        couponCode,
      });
      clearCart();
      navigate("/profile", { state: { orderPlaced: true } });
    } catch (requestError) {
      setError(requestError.response?.data?.message || "Unable to place your order. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (!items.length) {
    return (
      <main className="max-w-3xl mx-auto p-8">
        <p>Your cart is empty. <Link className="underline" to="/shop">Browse products</Link>.</p>
      </main>
    );
  }

  return (
    <main className="max-w-3xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-[#24564D]">Checkout</h1>
      <p className="mt-2 text-gray-600">Pay on delivery. Your order total is calculated securely by the server.</p>
      <p className="mt-3 font-semibold">Order total: ₹{totals.total.toLocaleString("en-IN")}</p>
      <form onSubmit={submitOrder} className="mt-7 bg-white border rounded-2xl p-6 space-y-4">
        {error && <p role="alert" className="rounded-lg bg-red-50 p-3 text-red-700">{error}</p>}
        {Object.entries({
          fullName: "Full name",
          street: "Street address",
          city: "City",
          postalCode: "Postal code",
          country: "Country",
        }).map(([field, label]) => (
          <label key={field} className="block text-sm font-semibold">
            {label}
            <input
              required
              name={field}
              autoComplete={field === "fullName" ? "name" : field}
              value={address[field]}
              onChange={(event) => setAddress((current) => ({ ...current, [field]: event.target.value }))}
              className="mt-1 w-full border rounded-lg p-3 font-normal"
            />
          </label>
        ))}
        <button disabled={submitting} className="w-full rounded-xl bg-[#24564D] py-3 text-white font-bold disabled:opacity-60">
          {submitting ? "Placing order..." : "Place order"}
        </button>
      </form>
    </main>
  );
};

export default Checkout;
