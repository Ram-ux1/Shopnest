const express = require("express");
const cors = require("cors");

const dotenv = require("dotenv");
const connectDB = require("./config/db");
const mongoose = require("mongoose");
dotenv.config();

connectDB();

const app = express();
app.use(express.json());
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5174",
  "http://127.0.0.1:5173",
  "http://127.0.0.1:5174",
  ...(process.env.FRONTEND_URL || "").split(",").map((origin) => origin.trim()).filter(Boolean),
];

app.use(cors({
  origin: allowedOrigins,
  credentials: true,
}));

app.get("/", (req,res)=>{
res.send("Shopnest backend is run properly  !")
})

app.get("/health", (req, res) => {
  const connected = mongoose.connection.readyState === 1;
  res.status(connected ? 200 : 503).json({
    status: connected ? "ok" : "database_unavailable",
  });
});


app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/product", require("./routes/productRoutes"));
// app.use("/api/cart", require("./routes/cartRoutes"));
app.use("/api/order", require("./routes/orderRoutes"));
app.use("/api/payment", require("./routes/paymentRoutes"));
app.use("/api/analytics", require("./routes/analyticsRoutes"));
app.use("/api/newsletter", require("./routes/newsletterRoutes"));

app.use((error, req, res, next) => {
  if (res.headersSent) return next(error);
  if (error.code === "LIMIT_FILE_SIZE") {
    return res.status(413).json({ message: "Image must be 5 MB or smaller" });
  }
  if (error.message === "Only image uploads are supported") {
    return res.status(400).json({ message: error.message });
  }
  console.error("Unhandled request error:", error.message);
  res.status(500).json({ message: "Internal server error" });
});

const PORT = process.env.PORT || 5000 ;

app.listen(PORT, ()=>{
  console.log(`Server is running at port ${PORT}`);
})