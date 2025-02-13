const mongoose = require("mongoose");

const contactChema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: [true, "전화번호 필수"] },
  },
  {
    timestamps: true, // createdAt, updatedAt fields are automatically added
  }
);

// 스키마 -> 모델
// mongoose.model(모델명, 스키마)
const Contact = mongoose.model("Contact", contactChema);

module.exports = Contact;
