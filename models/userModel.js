const mongoose = require('mongoose');

const userChema = new mongoose.Schema({
	username: { type: String, required: true, unique: true },
  password: { type: String, required: true }
	},
	{timestamps: true}
);

// 스키마 -> 모델
// mongoose.model(모델명, 스키마)
const User = mongoose.model("User", userChema);

module.exports = User;