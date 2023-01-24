const {
  createEntry,
  getAllEntries,
  getEntryById,
  updateEntry,
  deleteEntry,
} = require("./helper");

const authorCreate = (req, res) => createEntry(res, "author", req.body);

const authorGetAll = (_req, res) => getAllEntries(res, "author");

const authorGetById = (req, res) => getEntryById(res, "author", req.params.id);

const authorUpdate = (req, res) => updateEntry(res, "author", req.params.id, req.body);

const authorDelete = (req, res) => deleteEntry(res, "author", req.params.id);

module.exports = {
  authorCreate,
  authorGetAll,
  authorGetById,
  authorUpdate,
  authorDelete,
};
