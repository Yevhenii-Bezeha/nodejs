const service = require("../services");

const get = async (req, res, next) => {
  const { page, perPage } = req.query;

  try {
    const results =
      req.query.favorite === "true"
        ? await service.filteredContacts(page, perPage)
        : await service.getAllContacts(page, perPage);
    res.json({
      status: "success",
      code: 200,
      data: {
        contacts: results,
      },
    });
  } catch (e) {
    console.error(e);
    next(e);
  }
};

const getById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const result = await service.getContactById(id);
    if (result) {
      res.json({
        status: "success",
        code: 200,
        data: { contacts: result },
      });
    } else {
      res.status(404).json({
        status: "error",
        code: 404,
        message: `Not found contact id: ${id}`,
        data: "Not Found",
      });
    }
  } catch (e) {
    console.error(e);
    next(e);
  }
};

const create = async (req, res, next) => {
  const { name, email, phone, favorite = false } = req.body;
  try {
    const result = await service.createContact({
      name,
      email,
      phone,
      favorite,
    });

    res.status(201).json({
      status: "success",
      code: 201,
      data: { contact: result },
    });
  } catch (e) {
    console.error(e);
    next(e);
  }
};

const update = async (req, res, next) => {
  const { contactId } = req.params;
  const { name, email, phone, favorite } = req.body;
  try {
    const result = await service.updateContact(
      contactId,
      name,
      email,
      phone,
      favorite
    );
    if (result) {
      res.json({
        status: "success",
        code: 200,
        data: { task: result },
      });
    } else {
      res.status(404).json({
        status: "error",
        code: 404,
        message: `Not found contact id: ${id}`,
        data: "Not Found",
      });
    }
  } catch (e) {
    console.error(e);
    next(e);
  }
};

const remove = async (req, res, next) => {
  const { contactId } = req.params;
  try {
    const result = await service.removeContact(contactId);
    if (result) {
      res.json({
        status: "success",
        code: 200,
        data: { task: result },
      });
    } else {
      res.status(404).json({
        status: "error",
        code: 404,
        message: `Not found contact id: ${id}`,
        data: "Not Found",
      });
    }
  } catch (e) {
    console.error(e);
    next(e);
  }
};

const updateStatusContact = async (req, res, next) => {
  const { contactId } = req.params;
  const { favorite } = req.body;
  if (favorite === undefined) {
    res.status(404).json({
      status: "error",
      code: 400,
      message: `Missing field favorite`,
      data: "Not Found",
    });
    return;
  }
  try {
    const result = await service.updateStatus(contactId, favorite);
    if (result) {
      res.json({
        status: "success",
        code: 200,
        data: { task: result },
      });
    } else {
      res.status(404).json({
        status: "error",
        code: 404,
        message: `Not found contact id: ${id}`,
        data: "Not Found",
      });
    }
  } catch (e) {
    console.error(e);
    next(e);
  }
};

module.exports = {
  get,
  create,
  getById,
  update,
  remove,
  updateStatusContact,
};
