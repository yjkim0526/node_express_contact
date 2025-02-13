const asyncHandler = require("express-async-handler");
const Contact = require("../models/contactModel");

// const getAllContacts = async (req, res) => {
//   try {
//     res.send("Contacts Page");
//   } catch (error) {
//     res.send(error.message);
//   }
// };

// @desc GET all contacts
// @route GET /contacts
const getAllContacts = asyncHandler(async (req, res) => {
  const contacts = await Contact.find();
  // res.send(contacts);
  res.render("index.ejs", { contacts: contacts });
});

// @desc View add Contact form
// @route GET /contacts/add
const addContact = asyncHandler(async (req, res) => {
  res.render("add.ejs");
});

// @desc Create contact
// @route POST /contacts/add
const createContact = asyncHandler(async (req, res) => {
  console.log(req.body);
  const { name, email, phone } = req.body;
  if (!name || !email || !phone) {
    return res.status(400).send("필수 값이 입력되지 않았습니다.");
  }
  const newContact = await Contact.create({
    name,
    email,
    phone,
  });
  // res.send(newContact);
  // res.status(201).send(`Create contacts: ${name} ${email} ${phone}`);
	res.redirect("/contacts");
});

// @desc Get contact
// @route GET /contacts/:id
const getContact = asyncHandler(async (req, res) => {
  // 연락처 보기
	console.log("getContact:"+req.params.id); 
  const contact = await Contact.findById(req.params.id);

  // res.status(200).send(`View Contact ID : ${contact}`);
	res.render("update", { contact: contact });
	//res.redirect("/contacts");
});

// @desc Update contact
// @route PUT /contacts/:id
const updateContact = asyncHandler(async (req, res) => {
  // 연락처 수정
  const id = req.params.id;
  const { name, email, phone } = req.body;
  const contact = await Contact.findById(id);
  if (!contact) {
    throw new Error("Contact not found.");
  }
  contact.name = name;
  contact.email = email;
  contact.phone = phone;
  contact.save();
  // res.json(contact);
	res.redirect("/contacts");
  //res.status(200).send(`Update Contact ID : ${req.params.id}`);
});

// @desc Delete contact
// @route DELETE /contacts/:id
const deleteContact = asyncHandler(async (req, res) => {
  // 연락처 삭제
  const id = req.params.id;
  await Contact.findByIdAndDelete(id);
  // res.send("Delete Contact");
	res.redirect("/contacts");
  // res.status(201).send(`Delete Contact ID : ${req.params.id}`);
});

module.exports = {
  getAllContacts,
	addContact,
  createContact,
  getContact,
  updateContact,
  deleteContact,
};
