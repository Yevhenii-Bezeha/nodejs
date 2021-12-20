const fs = require("fs").promises;
const path = require("path");
const shortid = require("shortid");

const contactsPath = path.join(__dirname, "./../../src/db/contacts.json");

const listContacts = async () => {
  const contacts = await fs.readFile(contactsPath, "utf-8");
  return JSON.parse(contacts);
};

const getContacts = async (req, res, next) => {
  try {
    const contacts = await listContacts();
    res.send(contacts);
  } catch (e) {
    next(e);
  }
};

const getContactById = async (req, res, next) => {
  try {
    const contacts = await listContacts();
    const { contactId } = req.params;
    const contact = contacts.find(
      (el) => contactId.toString() === el.id.toString()
    );
    res.send(contact);
  } catch (e) {
    next(e);
  }
};

const removeContact = async (req, res, next) => {
  try {
    const contacts = await listContacts();
    const { contactId } = req.params;
    const cleanedContact = contacts.filter(
      (el) => contactId.toString() !== el.id.toString()
    );
    const json = JSON.stringify(cleanedContact);
    await fs.writeFile(contactsPath, json);
    res.json({ message: "Contact removed" });
  } catch (e) {
    next(e);
  }
};

const addContact = async (req, res, next) => {
  try {
    const contacts = await listContacts();
    const { name, email, phone } = req.body;
    const newContact = {
      id: shortid.generate(),
      name: name,
      email: email,
      phone: phone,
    };
    contacts.push(newContact);
    const json = JSON.stringify(contacts);
    await fs.writeFile(contactsPath, json);
    res.json({ message: "Contact added" });
  } catch (e) {
    next(e);
  }
};

const updateContact = async (req, res, next) => {
  try {
    const contacts = await listContacts();
    const { name, email, phone } = req.body;
    const { contactId } = req.params;
    contacts.forEach((el) => {
      if (el.id.toString() === contactId.toString()) {
        el.name = name || el.name;
        el.email = email || el.email;
        el.phone = phone ? phone.toString() : el.phone;
      }
    });
    const json = JSON.stringify(contacts);
    await fs.writeFile(contactsPath, json);
    res.json({ message: "Contact updated" });
  } catch (e) {
    next(e);
  }
};

module.exports = {
  getContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};