const express = require('express')
const cors = require("cors")
const dotenv = require("dotenv")

  const  app = express()

  app.get("/",(req,res)=>{
    res.send("Shopnest backend is working")
  })


  const PORT = process.env.PORT  || 5000;
  app.listen(PORT,()=>{
    console.log(`Server is running at port ${PORT}`)
  })
