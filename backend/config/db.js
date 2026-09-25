const { default: mongoose } = require("mongoose");


const connectDB = async ()=>{
   try{
    await mongoose.connect(process.env.DB_URI);
    console.log("DB connected successfully !")
   }catch(err){
    console.log("DB Error: " ,  err)
   }
}

module.exports = connectDB