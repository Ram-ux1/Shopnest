import { createElement, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { FiBarChart2, FiBox, FiDollarSign, FiLogOut, FiPackage, FiShoppingBag, FiUsers } from "react-icons/fi";
import { analyticsAPI, authAPI, orderAPI, productAPI } from "../lib/api";
import { useAuth } from "../context/authContext";

const emptyProduct = { name: "", description: "", price: "", oldPrice: "", category: "", stock: "" };
const statuses = ["pending", "processing", "shipped", "delivered"];

const formatCurrency = (value) => `₹${Number(value || 0).toLocaleString("en-IN")}`;

const AdminDashboard = () => {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState("Dashboard");
  const [stats, setStats] = useState(null);
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [search, setSearch] = useState("");
  const [form, setForm] = useState(emptyProduct);
  const [image, setImage] = useState(null);
  const [editingProduct, setEditingProduct] = useState(null);
  const imageInput = useRef(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");

  const loadDashboard = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const [statsResponse, productsResponse, ordersResponse, customersResponse] =
        await Promise.all([
          analyticsAPI.getStats(),
          productAPI.getAll(),
          orderAPI.getAll(),
          authAPI.getUsers(),
        ]);
      setStats(statsResponse.data);
      setProducts(productsResponse.data);
      setOrders(ordersResponse.data);
      setCustomers(customersResponse.data);
    } catch (requestError) {
      setError(requestError.response?.data?.message || "Unable to load admin data.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadDashboard();
  }, [loadDashboard]);

  const filteredProducts = useMemo(
    () => products.filter((product) =>
      `${product.name} ${product.category}`.toLowerCase().includes(search.toLowerCase()),
    ),
    [products, search],
  );
  const filteredOrders = useMemo(
    () => orders.filter((order) =>
      `${order._id} ${order.user?.name || ""} ${order.status}`.toLowerCase().includes(search.toLowerCase()),
    ),
    [orders, search],
  );
  const filteredCustomers = useMemo(
    () => customers.filter((customer) =>
      `${customer.name} ${customer.email}`.toLowerCase().includes(search.toLowerCase()),
    ),
    [customers, search],
  );

  const resetProductForm = () => {
    setForm(emptyProduct);
    setImage(null);
    setEditingProduct(null);
    if (imageInput.current) imageInput.current.value = "";
  };

  const saveProduct = async (event) => {
    event.preventDefault();
    setSaving(true);
    setError("");
    setNotice("");
    const data = new FormData();
    Object.entries(form).forEach(([key, value]) => {
      if (key !== "oldPrice" || value !== "") data.append(key, value);
    });
    if (image) data.append("image", image);
    try {
      if (editingProduct) {
        const { data: updated } = await productAPI.update(editingProduct, data);
        setProducts((current) => current.map((item) => item._id === updated._id ? updated : item));
        setNotice("Product updated.");
      } else {
        if (!image) {
          setError("Choose an image for the new product.");
          return;
        }
        const { data: created } = await productAPI.create(data);
        setProducts((current) => [created, ...current]);
        setNotice("Product created.");
      }
      resetProductForm();
    } catch (requestError) {
      setError(requestError.response?.data?.message || "Unable to save product.");
    } finally {
      setSaving(false);
    }
  };

  const deleteProduct = async (id) => {
    if (!window.confirm("Delete this product?")) return;
    setError("");
    try {
      await productAPI.delete(id);
      setProducts((current) => current.filter((product) => product._id !== id));
      setNotice("Product deleted.");
    } catch (requestError) {
      setError(requestError.response?.data?.message || "Unable to delete product.");
    }
  };

  const changeOrderStatus = async (orderId, status) => {
    setError("");
    try {
      const { data } = await orderAPI.updateStatus(orderId, status);
      setOrders((current) => current.map((order) => order._id === data._id ? data : order));
    } catch (requestError) {
      setError(requestError.response?.data?.message || "Unable to update order status.");
    }
  };

  const beginEdit = (product) => {
    setEditingProduct(product._id);
    setForm({
      name: product.name,
      description: product.description,
      price: String(product.price),
      oldPrice: product.oldPrice === undefined ? "" : String(product.oldPrice),
      category: product.category,
      stock: String(product.stock),
    });
    setImage(null);
    setActiveTab("Products");
  };

  const navItems = [
    ["Dashboard", FiBarChart2],
    ["Products", FiPackage],
    ["Orders", FiShoppingBag],
    ["Customers", FiUsers],
  ];

  return (
    <main className="min-h-screen bg-[#FFF5F5] text-[#24564D]">
      <header className="bg-white border-b border-[#F7D6D0] px-4 sm:px-8 py-4 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold">Shopnest Admin</h1>
          <p className="text-sm text-gray-500">Signed in as {user?.name}</p>
        </div>
        <div className="flex items-center gap-3">
          <input
            aria-label="Search admin data"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search..."
            className="rounded-lg border bg-white px-3 py-2 text-sm"
          />
          <button onClick={logout} className="inline-flex items-center gap-2 rounded-lg bg-[#24564D] px-4 py-2 text-white">
            <FiLogOut /> Logout
          </button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto p-4 sm:p-8">
        <nav className="mb-7 flex flex-wrap gap-2" aria-label="Admin sections">
          {navItems.map(([label, Icon]) => (
            <button
              key={label}
              onClick={() => setActiveTab(label)}
              className={`inline-flex items-center gap-2 rounded-xl px-4 py-3 font-semibold ${
                activeTab === label ? "bg-[#24564D] text-white" : "bg-white border"
              }`}
            >
              {createElement(Icon)} {label}
            </button>
          ))}
        </nav>

        {error && <p role="alert" className="mb-5 rounded-lg bg-red-50 p-3 text-red-700">{error}</p>}
        {notice && <p role="status" className="mb-5 rounded-lg bg-green-50 p-3 text-green-700">{notice}</p>}
        {loading && <p role="status">Loading admin data...</p>}

        {!loading && activeTab === "Dashboard" && (
          <>
            <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {[
                ["Revenue", formatCurrency(stats?.totalIncome), FiDollarSign],
                ["Orders", stats?.totalOrders ?? 0, FiShoppingBag],
                ["Customers", stats?.totalUsers ?? 0, FiUsers],
                ["Products", stats?.totalProducts ?? 0, FiBox],
              ].map(([label, value, Icon]) => (
                <article key={label} className="rounded-2xl border bg-white p-5">
                  {createElement(Icon, { size: 22 })}
                  <p className="mt-4 text-sm text-gray-500">{label}</p>
                  <p className="text-2xl font-bold">{value}</p>
                </article>
              ))}
            </section>
            <section className="mt-8 rounded-2xl border bg-white p-5">
              <h2 className="text-xl font-bold mb-4">Recent orders</h2>
              <OrdersTable orders={orders.slice(0, 8)} onStatusChange={changeOrderStatus} />
            </section>
          </>
        )}

        {!loading && activeTab === "Products" && (
          <section className="grid gap-6 lg:grid-cols-[minmax(280px,1fr)_2fr]">
            <form onSubmit={saveProduct} className="h-fit space-y-3 rounded-2xl border bg-white p-5">
              <h2 className="text-xl font-bold">{editingProduct ? "Edit product" : "Add product"}</h2>
              {[
                ["name", "Name", "text"],
                ["description", "Description", "text"],
                ["price", "Price", "number"],
                ["oldPrice", "Old price (optional)", "number"],
                ["category", "Category", "text"],
                ["stock", "Stock", "number"],
              ].map(([key, label, type]) => (
                <label key={key} className="block text-sm font-semibold">
                  {label}
                  <input
                    required={key !== "oldPrice"}
                    type={type}
                    min={type === "number" ? "0" : undefined}
                    step={key === "price" ? "0.01" : "1"}
                    value={form[key]}
                    onChange={(event) => setForm((current) => ({ ...current, [key]: event.target.value }))}
                    className="mt-1 w-full rounded-lg border p-2.5 font-normal"
                  />
                </label>
              ))}
              <label className="block text-sm font-semibold">
                Product image {editingProduct && "(optional)"}
                <input
                  ref={imageInput}
                  type="file"
                  accept="image/*"
                  required={!editingProduct}
                  onChange={(event) => setImage(event.target.files?.[0] || null)}
                  className="mt-1 block w-full text-sm"
                />
              </label>
              <div className="flex gap-2">
                <button disabled={saving} className="rounded-lg bg-[#24564D] px-4 py-2 text-white disabled:opacity-60">
                  {saving ? "Saving..." : editingProduct ? "Save changes" : "Create product"}
                </button>
                {editingProduct && <button type="button" onClick={resetProductForm} className="rounded-lg border px-4 py-2">Cancel</button>}
              </div>
            </form>
            <div className="overflow-x-auto rounded-2xl border bg-white p-5">
              <h2 className="text-xl font-bold mb-4">Products ({filteredProducts.length})</h2>
              <table className="w-full min-w-[560px] text-left text-sm">
                <thead><tr className="border-b"><th className="p-2">Product</th><th className="p-2">Price</th><th className="p-2">Stock</th><th className="p-2">Actions</th></tr></thead>
                <tbody>
                  {filteredProducts.map((product) => (
                    <tr key={product._id} className="border-b last:border-0">
                      <td className="p-2"><div className="flex items-center gap-3"><img src={product.imageUrl} alt="" className="h-10 w-10 rounded object-cover" /><span>{product.name}</span></div></td>
                      <td className="p-2">{formatCurrency(product.price)}</td>
                      <td className="p-2">{product.stock}</td>
                      <td className="p-2 whitespace-nowrap">
                        <button onClick={() => beginEdit(product)} className="mr-3 underline">Edit</button>
                        <button onClick={() => deleteProduct(product._id)} className="text-red-600 underline">Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {!loading && activeTab === "Orders" && (
          <section className="overflow-x-auto rounded-2xl border bg-white p-5">
            <h2 className="text-xl font-bold mb-4">Orders ({filteredOrders.length})</h2>
            <OrdersTable orders={filteredOrders} onStatusChange={changeOrderStatus} />
          </section>
        )}

        {!loading && activeTab === "Customers" && (
          <section className="overflow-x-auto rounded-2xl border bg-white p-5">
            <h2 className="text-xl font-bold mb-4">Customers ({filteredCustomers.length})</h2>
            <table className="w-full text-left text-sm">
              <thead><tr className="border-b"><th className="p-3">Name</th><th className="p-3">Email</th><th className="p-3">Joined</th></tr></thead>
              <tbody>
                {filteredCustomers.map((customer) => (
                  <tr key={customer._id} className="border-b last:border-0">
                    <td className="p-3">{customer.name}</td>
                    <td className="p-3">{customer.email}</td>
                    <td className="p-3">{new Date(customer.createdAt).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        )}
      </div>
    </main>
  );
};

const OrdersTable = ({ orders, onStatusChange }) => (
  <div className="overflow-x-auto">
    <table className="w-full min-w-[680px] text-left text-sm">
      <thead><tr className="border-b"><th className="p-3">Order</th><th className="p-3">Customer</th><th className="p-3">Date</th><th className="p-3">Total</th><th className="p-3">Status</th></tr></thead>
      <tbody>
        {orders.map((order) => (
          <tr key={order._id} className="border-b last:border-0">
            <td className="p-3">{order._id}</td>
            <td className="p-3">{order.user?.name || order.user?.email || "Customer"}</td>
            <td className="p-3">{new Date(order.createdAt).toLocaleDateString()}</td>
            <td className="p-3">{formatCurrency(order.totalAmount)}</td>
            <td className="p-3">
              <select
                aria-label={`Update status for order ${order._id}`}
                value={order.status}
                onChange={(event) => onStatusChange(order._id, event.target.value)}
                className="rounded-lg border p-2 capitalize"
              >
                {statuses.map((status) => <option key={status} value={status}>{status}</option>)}
              </select>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default AdminDashboard;
