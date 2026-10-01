const dotenv = require("dotenv")
dotenv.config()

const cloduinary = require("cloudinary").v2

cloduinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
})  

module.exports = cloduinary