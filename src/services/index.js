const { Contact, getOptions } = require("./schemas/contact.js");
const User = require("./schemas/user.js");
const bcrypt = require("bcryptjs");
const salt = bcrypt.genSaltSync(10);

const getAllContacts = async (page, perPage) =>
  Contact.paginate({}, getOptions(page, perPage));

const filteredContacts = async (page, perPage) =>
  Contact.paginate({ favorite: true }, getOptions(page, perPage));

const getContactById = (id) => Contact.findOne({ _id: id });

const createContact = ({ name, email, phone, favorite }) =>
  Contact.create({ name, email, phone, favorite });

const updateContact = (id, name, email, phone, favorite) =>
  Contact.findOneAndUpdate(id, {
    $set: { name, email, phone, favorite },
  });

const updateStatus = (id, favorite) =>
  Contact.findOneAndUpdate(id, {
    $set: { favorite },
  });

const removeContact = (id) => Contact.findByIdAndRemove({ _id: id });

const findUser = async (email) => User.findOne({ email });

const createUser = async (username, email, password) => {
  const hash = bcrypt.hashSync(password, salt);
  const newUser = new User({ username, email, password: hash });
  await newUser.save();
};

const updateToken = async (id, token) =>
  User.updateOne(
    { _id: id },
    {
      $set: { token },
    }
  );

const updateSubscription = async (id, subscription) =>
  User.updateOne(
    { _id: id },
    {
      $set: { subscription },
    }
  );

module.exports = {
  getAllContacts,
  createContact,
  getContactById,
  updateContact,
  removeContact,
  updateStatus,
  findUser,
  createUser,
  updateToken,
  filteredContacts,
  updateSubscription,
};
