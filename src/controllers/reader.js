const {
  createEntry,
  getAllEntries,
  getEntryById,
  updateEntry,
  deleteEntry,
} = require("./helper");

const readerCreate = (req, res) => createEntry(res, "reader", req.body);

const readerGetAll = (_req, res) => getAllEntries(res, "reader");

const readerGetById = (req, res) => getEntryById(res, "reader", req.params.id);

const readerUpdate = (req, res) => updateEntry(res, "reader", req.params.id, req.body);

const readerDelete = (req, res) => deleteEntry(res, "reader", req.params.id);

module.exports = {
  readerCreate,
  readerGetAll,
  readerGetById,
  readerUpdate,
  readerDelete,
};
