import { promises } from "fs";
import * as path from "path";
import { NextFunction, Request, Response } from "express";
import shortid from "shortid";
import { IContacts } from "../models/IContacts";

const fs = promises;

const contactsPath: string = path.join(
  __dirname,
  "./../../src/models/contacts.json"
);

const listContacts = async (): Promise<IContacts[]> => {
  const contacts: string = await fs.readFile(contactsPath, "utf-8");
  return JSON.parse(contacts);
};

const getContacts = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const contacts: IContacts[] = await listContacts();
    res.send(contacts);
  } catch (e) {
    next(e);
  }
};

const getContactById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const contacts: IContacts[] = await listContacts();
    const { contactId } = req.params;
    const contact: IContacts | undefined = contacts.find(
      (el: IContacts) => contactId.toString() === el.id.toString()
    );
    if (!contact) {
      next();
    }
    res.send(contact);
  } catch (e) {
    next(e);
  }
};

const removeContact = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const contacts: IContacts[] = await listContacts();
    const { contactId } = req.params;
    const cleanedContact: IContacts[] = contacts.filter(
      (el: IContacts) => contactId.toString() !== el.id.toString()
    );
    const json: string = JSON.stringify(cleanedContact);
    await fs.writeFile(contactsPath, json);
    res.json({ message: "Contact removed" });
  } catch (e) {
    next(e);
  }
};

const addContact = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const contacts: IContacts[] = await listContacts();
    const { name, email, phone } = req.body;
    const newContact: IContacts = {
      id: shortid.generate(),
      name: name,
      email: email,
      phone: phone,
    };
    contacts.push(newContact);
    const json: string = JSON.stringify(contacts);
    await fs.writeFile(contactsPath, json);
    res.json({ message: "Contact added" });
  } catch (e) {
    next(e);
  }
};

const updateContact = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const contacts: IContacts[] = await listContacts();
    const { name, email, phone } = req.body;
    const { contactId } = req.params;
    contacts.forEach((el: IContacts) => {
      if (el.id.toString() === contactId.toString()) {
        el.name = name ? name : el.name;
        el.email = email ? email : el.email;
        el.phone = phone ? phone.toString() : el.phone;
      }
    });
    const json: string = JSON.stringify(contacts);
    await fs.writeFile(contactsPath, json);
    res.json({ message: "Contact updated" });
  } catch (e) {
    next(e);
  }
};

export {
  listContacts,
  getContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
