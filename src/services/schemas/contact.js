const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const Schema = mongoose.Schema,
  ObjectId = Schema.ObjectId;

const contact = new Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for contact"],
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
    owner: {
      type: ObjectId,
      ref: "user",
    },
  },
  { versionKey: false, timestamps: true }
);

contact.plugin(mongoosePaginate);

const Contact = mongoose.model("contacts", contact);

const getOptions = (page, perPage) => ({
  page: parseInt(page=1, 10),
  limit: parseInt(perPage=5, 10),
});

module.exports = { Contact, getOptions };
