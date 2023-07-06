const {
  createEntry,
  getAllEntries,
  getEntryById,
  updateEntry,
  deleteEntry,
} = require("./helper");

const genreCreate = (req, res) => createEntry(res, "genre", req.body, "genre");

const genreGetAll = (_req, res) => getAllEntries(res, "genre");

const genreGetById = (req, res) => getEntryById(res, "genre", req.params.id);

const genreUpdate = (req, res) => updateEntry(res, "genre", req.params.id, req.body);

const genreDelete = (req, res) => deleteEntry(res, "genre", req.params.id);

module.exports = {
  genreCreate,
  genreGetAll,
  genreGetById,
  genreUpdate,
  genreDelete,
};
