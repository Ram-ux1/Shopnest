const Product = require("../model/Product")
const cloudinary = rquire("../config/cloudinary")

const getProduct = async(req,res)=>{
  try{
      const product = await Product.find()
      res.json(product)
  }catch(error){
    res.status(500).json({message:"server error"})
  }
}

const getProductById = async(req,res)=>{
    try{
      const product = await Product.findById(req.params.id);
      if(product){
        res.json(product)
      }else{
        res.status(404).json({message: "product not found"})
      }
    }catch(error){
      res.status(500).json({message:"server error"})
    }
}

const createProduct = async (req,res)=>{
  try{
   const  {name,description, price, category, stock} = req.body;

   let imageUrl = ""

   if(req.file){
    const result = await cloudinary.uploader.upload(req.file.path)  
    imageUrl = result.secure_url

   }
   const product = new Product({
    name,
    description,
    price,
    imageUrl,
    category,
    stock
   })

  }


}