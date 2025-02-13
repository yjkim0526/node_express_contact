const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
require("dotenv").config();
const jwtSecret = process.env.JWT_SECRET;
const jwt = require("jsonwebtoken");


// Get login page
// GET /
const getLogin = asyncHandler((req, res) => {
	res.render("home");
});

// Logn user
// POST /
const loginUser = asyncHandler(async (req, res) => {
	const { username, password } = req.body;

	const user = await User.findOne({ username });
	if (!user) {
    return res.json( {message: "User not found"});
  }

	const isMatch = await bcrypt.compare(password, user.password);
	if (!isMatch) {
    return res.json( {message: "Invalid password"});
  }

	// token 생성 
	const token = jwt.sign({ id: user._id }, jwtSecret);
	// 쿠키에 token 저장 
	res.cookie("token", token, { httpOnly: true });
	res.redirect('/contacts');

});

// Register page
// GET /register
const getRegister = asyncHandler((req, res) => {
  res.render("register");
});

// Register page
// POST /register
const registerUser = asyncHandler(async (req, res) => {
  const { username, password, confirmPassword } = req.body;
  if (password == confirmPassword) {
		const hashedPassword = await bcrypt.hash(password, 10);
		const user = await User.create({ username, password: hashedPassword });
		res.json( { message:"Register successfule", user} );
  } else {
		res.send( "Passwords do not match" );
	}

});

module.exports = { getLogin, loginUser, getRegister, registerUser };