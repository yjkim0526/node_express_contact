const express = require("express");
const router = express.Router();
const {
  getAllContacts,
	addContact,
  createContact,
  getContact,
  updateContact,
  deleteContact,
} = require("../controllers/contactController");

router.route("/").get(getAllContacts);
router.route("/add").get(addContact).post(createContact);
router.route("/:id").get(getContact).put(updateContact).delete(deleteContact);


module.exports = router;
