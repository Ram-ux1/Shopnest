const express = require('express')
const cors = require("cors")
const dotenv = require("dotenv")
dotenv.config()
const { connect } = require('mongoose')
const connectDB = require('./config/db')


connectDB()

  const  app = express()

app.use(express.json())

  app.get("/",(req,res)=>{
    res.send("Shopnest backend is working")
  })



  app.use("/api/auth", require("./routes/authRoutes"))
  app.use("/api/products", require("./routes/productRoutes"))
  app.use("/api/orders", require("./routes/orderRoutes"))
  app.use("/api/payments", require("./routes/paymentRoutes"))
  app.use("/api/analytics", require("./routes/analyticsRoutes"))



  const PORT = process.env.PORT  || 5000;
  app.listen(PORT,()=>{
    console.log(`Server is running at port ${PORT}`)
  })
