import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "/api",
  headers: { "Content-Type": "application/json" },
});

api.interceptors.request.use((config) => {
  const token = typeof window === "undefined" ? null : localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  if (typeof FormData !== "undefined" && config.data instanceof FormData) {
    delete config.headers["Content-Type"];
  }
  return config;
});

export const authAPI = {
  register: (data) => api.post("/auth/register", data),
  login: (data) => api.post("/auth/login", data),
  getUsers: () => api.get("/auth/users"),
};

export const productAPI = {
  getAll: () => api.get("/product"),
  getById: (id) => api.get(`/product/${id}`),
  create: (data) => api.post("/product", data),
  update: (id, data) => api.put(`/product/${id}`, data),
  delete: (id) => api.delete(`/product/${id}`),
};

export const orderAPI = {
  create: (data) => api.post("/order", data),
  getAll: () => api.get("/order"),
  getMyOrders: () => api.get("/order/my-orders"),
  getById: (id) => api.get(`/order/${id}`),
  updateStatus: (id, status) => api.put(`/order/${id}/status`, { status }),
};

export const paymentAPI = {
  createOrder: (data) => api.post("/payment/create-order", data),
  verifyPayment: (data) => api.post("/payment/verify-payment", data),
};

export const analyticsAPI = {
  getStats: () => api.get("/analytics"),
};

export const newsletterAPI = {
  subscribe: (email) => api.post("/newsletter", { email }),
};

export default api;
