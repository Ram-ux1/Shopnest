import { useEffect, useState } from "react";
import { orderAPI } from "../lib/api";
import { useAuth } from "../context/authContext";

const Profile = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;
    orderAPI.getMyOrders()
      .then(({ data }) => {
        if (active) setOrders(data);
      })
      .catch((requestError) => {
        if (active) setError(requestError.response?.data?.message || "Could not load your orders.");
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => { active = false; };
  }, []);

  return (
    <main className="max-w-5xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-[#24564D]">Your profile</h1>
      <section className="mt-6 rounded-2xl bg-white border p-6">
        <h2 className="text-xl font-semibold">{user?.name}</h2>
        <p className="text-gray-600">{user?.email}</p>
      </section>
      <section className="mt-8">
        <h2 className="text-2xl font-bold text-[#24564D]">Your orders</h2>
        {loading && <p className="mt-4">Loading orders...</p>}
        {error && <p role="alert" className="mt-4 text-red-700">{error}</p>}
        {!loading && !error && !orders.length && <p className="mt-4 text-gray-600">No orders yet.</p>}
        <div className="mt-4 space-y-4">
          {orders.map((order) => (
            <article key={order._id} className="rounded-xl border bg-white p-5">
              <div className="flex flex-wrap justify-between gap-2">
                <p className="font-semibold">Order {order._id}</p>
                <p className="capitalize">{order.status}</p>
              </div>
              <p className="mt-2">Total: ₹{order.totalAmount.toLocaleString("en-IN")}</p>
              <ul className="mt-2 text-sm text-gray-600">
                {order.items.map((item) => (
                  <li key={item._id || item.product?._id}>
                    {item.product?.name || "Product"} × {item.quantity}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
};

export default Profile;