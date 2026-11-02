const express = require("express");

const dotenv = require("dotenv");
const connectDB = require("./config/db");
dotenv.config();

connectDB();

const app = express();
app.use(express.json());

app.get("/", (req,res)=>{
res.send("Shopnest backend is run properly  !")
})



app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/product", require("./routes/productRoutes"));
// app.use("/api/cart", require("./routes/cartRoutes"));
app.use("/api/order", require("./routes/orderRoutes"));
// app.use("/api/payment", require("./routes/paymentRoutes"));
// app.use("/api/analytics", require("./routes/analyticsRoutes"));

const PORT = process.env.PORT || 5000 ;

app.listen(PORT, ()=>{
  console.log(`Server is running at port ${PORT}`);
})