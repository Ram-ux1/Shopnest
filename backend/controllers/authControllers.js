const bcrypt = require("bcryptjs")
const sendEmail = require("../utils/sendEmail")
const User = require("../model/User")
const jwt = require("jsonwebtoken")



const generateToken = (id)=>{
return jwt.sign({id},process.env.JWT_SECRET, {expiresIn:'7d'})
}

const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" })
    }

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)
    const user = User.create({ name, email, password: hashedPassword })
    if(user){

      const otp = Math.floor(10000 + Math.random()*900000).toString()

      const message= `Welcome to shopnest ,  ${name}  , Thank you ! for register
      your otp for shopnest ${otp}
      `;

      await sendEmail(email, "Welcome To shopnest-Your otp for registration ", message)
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email:user.email,
        role:user.role,
        token: generateToken(user._id)
      })
    }else{
      res.status(400).json({message: 'Inavild user data'})
    }


    await newUser.save();
    res.status(200).json({ message: "user registerd successfully" })
  } catch (error) {
    res.status(500).json({ message: "server error" })
  }
}




const loginUser = async (req,res) => {
  try{
    const {email , password} = req.body()
  const user = await User.find({email})
  if(user && (await bcrypt.compare(password, user.password))){
    res.json({
      _id:user.id,
      name:user.name,
      email:user.email,
      role:user.role,
      token: generateToken(user._id)
    })
  }else{
    res.status(400).json({
      message:"email or password is inavlid"
    })
  }

  }catch(error){
    res.json({message: "Server error"})
  }

}




const getUser = async (req,res) =>  {
  
    
    try {
      const user = await User.find({}).select('-password')
    } catch (error) {
      res.json({message: "server error"})
    }
    
}
module.exports = {registerUser,loginUser,getUser}
