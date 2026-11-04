const User = require("../model/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { normalizeEmail, validateRegistration } = require("../utils/authUtils");

const generateToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });

const registerUser = async (req, res) => {
  const registration = validateRegistration(req.body || {});
  if (registration.error) return res.status(400).json({ message: registration.error });
  const { name, email, password } = registration;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role: "user",
      verified: true,
    });

    res.status(201).json({
      message: "User registered successfully",
      _id: user._id,
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      verified: user.verified,
      token: generateToken(user._id),
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({ message: "User already exists" });
    }
    console.error("Error registering user:", error.message);
    res.status(500).json({ message: "Could not register user" });
  }
};

const loginUser = async (req, res) => {
  const body = req.body || {};
  const email = normalizeEmail(body.email);
  const { password } = body;
  if (!email || typeof password !== "string" || !password) {
    return res.status(400).json({ message: "Please provide email and password" });
  }
  try {
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    res.status(200).json({
      message: "Login successful",
      token: generateToken(user._id),
      id: user._id,
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      verified: user.verified,
    });
  } catch (error) {
    console.error("Error during login:", error.message);
    res.status(500).json({ message: "Could not log in" });
  }
};

const getUser = async (req, res) => {
  try {
    const users = await User.find({}).select("-password");
    res.json(users);
  } catch (error) {
    console.error("Error fetching users:", error.message);
    res.status(500).json({ message: "Could not fetch users" });
  }
};

module.exports = { registerUser, loginUser, getUser };
