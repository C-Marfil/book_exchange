const {
  createEntry,
  getAllEntries,
  getEntryById,
  updateEntry,
  deleteEntry,
} = require("./helper");

const bookCreate = (req, res) => createEntry(res, "book", req.body);

const bookGetAll = (_req, res) => getAllEntries(res, "book");

const bookGetById = (req, res) => getEntryById(res, "book", req.params.id);

const bookUpdate = (req, res) =>
  updateEntry(res, "book", req.params.id, req.body);

const bookDelete = (req, res) => deleteEntry(res, "book", req.params.id);

module.exports = {
  bookCreate,
  bookGetAll,
  bookGetById,
  bookUpdate,
  bookDelete,
};
