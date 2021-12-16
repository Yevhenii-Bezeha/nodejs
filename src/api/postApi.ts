import * as express from "express";
import {
  addContact,
  getContactById,
  getContacts,
  removeContact,
  updateContact,
} from "../controllers/contactsController";
import {
  patchPutValidate,
  postValidate,
} from "../middlewares/contactsValidation";

const router = express.Router();

router.get("/", getContacts);

router.get("/:contactId", getContactById);

router.post("/", postValidate, addContact);

router.delete("/:contactId", removeContact);

router.patch("/:contactId", patchPutValidate, updateContact);

export default router;
