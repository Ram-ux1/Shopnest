const User = require("../model/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");  
const sendEmail = require("../utils/sendEmail");


const generateToken = (id)=>{
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
}




//USer Registration
const registerUser = async (req, res) => {
  const { name, email, password,role } = req.body; 
  console.log("Registering user:", { name, email, password ,role }); // Debugging line
  try{
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = await  User.create({ name, email, password: hashedPassword, role: req.body.role || "user" });
    console.log(user.name, "user email"); // Debugging line

    if(user){
     const otp = Math.floor(100000 + Math.random() * 900000).toString() ;
      const message = ` Welcome! to Shopnest. We are excited to have you on board. Your OTP is ${otp}. Please do not share it with anyone. Thank you for using our service.`;

      console.log("yaha tak aa gaye")

     await sendEmail(
    user.email,
    "Welcome to Shopnest - Your OTP",
    message
);




      res.status(201).json({ message: "User registered successfully,Please check your email for OTP verification", 
        _id: user._id,
        name: user.name,
        email: user.email,  
        otp: otp,
        role: user.role,
        token: generateToken(user._id),
      });
    }else{
      res.status(400).json({ message: "Invalid user data" });
    }

  
  }catch (error) {
    console.log("Error checking existing user:", error.message);
    return res.status(500).json({ message: "Server error " });
  }


}

  // userLogin
  const loginUser = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "Please provide email and password" });
    }
    try {
      const user = await User.findOne({ email });
      if (user && await(bcrypt.compare(password, user.password))) {


        return res.status(200).json({ message: "Login successful", token: generateToken(user._id),
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          verified: user.verified

         });
      }else{
        return res.status(400).json({ message: "Invalid credentials" });
      }

    } catch (error) {
      console.error("Error during login:", error.message);
      return res.status(500).json({ message: "Server error" });
    }
  };

//Get all users (admin only)
const getUser = async (req, res) => {
  console.log("Fetching users for admin:", req.user); // Debugging line
  try {
    const users = await User.find({}).select("-password");
    res.json(users);
  } catch (error) {
    console.error("Error fetching users:", error.message);
    return res.status(500).json({ message: "Server error" });
  }
};

module.exports = { registerUser, loginUser, getUser }