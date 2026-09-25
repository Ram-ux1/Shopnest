const mongoose = require("mongoose")

const userScehma = new mongoose.Schema({
  name:{
    type:String,
    required:true,
  },
  email:{
    type:String,
    required:true,
    unquie:true
  },
  password:{
    type:String,
    required:true,
  },
 role:{
    type:String,
    
    enum:['user','admin'],
    default:"user"
  }, 
  verified:{
    type:boolean,
    default:false,
  }
})

const User = mongoose.model("User",userScehma)

module.exports=User;