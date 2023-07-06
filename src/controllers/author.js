const {
  createEntry,
  getAllEntries,
  getEntryById,
  updateEntry,
  deleteEntry,
  getEntryBySearch,
} = require("./helper");

const authorCreate = (req, res) => createEntry(res, "author", req.body, "author");

const authorGetAll = (_req, res) => getAllEntries(res, "author");

const authorGetById = (req, res) => getEntryById(res, "author", req.params.id);

const authorUpdate = (req, res) => updateEntry(res, "author", req.params.id, req.body);

const authorDelete = (req, res) => deleteEntry(res, "author", req.params.id);

const authorSearch = (req, res) => getEntryBySearch(res, "author", "name", req.params.name);

module.exports = {
  authorCreate,
  authorGetAll,
  authorGetById,
  authorUpdate,
  authorDelete,
  authorSearch,
};
