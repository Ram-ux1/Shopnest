const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true, 
  },
  description: {
    type: String,
    required: true,
  },
  price: {  
    type: Number,
    required: true,
    min: 0
  },
  oldPrice: {
    type: Number,
    min: 0,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  stock: {
    type: Number,
    required: true,
    min: 0
  },
  rating: { 
    type: Number,
    default: 0, 
  },
  numReviews: {
    type: Number,
    default: 0,
  },
  reviews: [  
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      name: { 
        type: String,
        required: true,
      },  

      rating: { 
        type: Number,
        required: true,
      },
      comment: {
        type: String,
        required: true,
      },
    },
  ],
}, { timestamps: true });

module.exports = mongoose.model("Product", productSchema);