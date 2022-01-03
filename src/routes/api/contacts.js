const express = require("express");
const router = express.Router();
const {
  postValidate,
  patchPutValidate,
} = require("../../middlewares/contactsValidation.js");
const ctrlContacts = require("../../controllers/contactsControllers");

router.get("/", ctrlContacts.get);

router.get("/:id", ctrlContacts.getById);

router.post("/", postValidate, ctrlContacts.create);

router.delete("/:contactId", ctrlContacts.remove);

router.patch("/:contactId", patchPutValidate, ctrlContacts.update);

router.patch("/:contactId/favorite", ctrlContacts.updateStatusContact);

module.exports = router;
