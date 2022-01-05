const Contact = require("./schemas/contact.js");

const getAllContacts = async () => Contact.find();

const getContactById = (id) => Contact.findOne({ _id: id });

const createContact = ({ name, email, phone, favorite }) =>
  Contact.create({ name, email, phone, favorite });

const updateContact = (id, name, email, phone, favorite) =>
  Contact.findByIdAndUpdate(id, {
    $set: { name, email, phone, favorite },
  });

const updateStatus = (id, favorite) =>
  Contact.findByIdAndUpdate(id, {
    $set: { favorite },
  });

const removeContact = (id) => Contact.findByIdAndRemove({ _id: id });

module.exports = {
  getAllContacts,
  createContact,
  getContactById,
  updateContact,
  removeContact,
  updateStatus,
};
