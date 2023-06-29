const {
  createEntry,
  getAllEntries,
  getEntryById,
  updateEntry,
  deleteEntry,
  getEntryBySearch,
} = require("./helper");

const bookCreate = (req, res) => createEntry(res, "book", req.body);

const bookGetAll = (_req, res) => getAllEntries(res, "book");

const bookGetById = (req, res) => getEntryById(res, "book", req.params.id);

const bookUpdate = (req, res) => updateEntry(res, "book", req.params.id, req.body);

const bookDelete = (req, res) => deleteEntry(res, "book", req.params.id);

const bookSearch = (req, res) => getEntryBySearch(res, "book", "title", req.params.title);

module.exports = {
  bookCreate,
  bookGetAll,
  bookGetById,
  bookUpdate,
  bookDelete,
  bookSearch,
};
