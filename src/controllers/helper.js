const { Book, Reader, Author, Genre } = require("../models");
const { Op } = require("sequelize");

const get404Error = (model) => ({ error: `The ${model} could not be found.` });

const removePassword = (obj) => {
  if (obj.hasOwnProperty("password")) {
    delete obj.password;
  }

  return obj;
};

const getOptions = (model) => {
  if (model === "book") return { include: [Author, Reader, Genre] };

  if (model === "genre" || model === "reader" || model === "author")
    return { include: Book };

  return {};
};

const getModel = (model) => {
  const models = {
    reader: Reader,
    book: Book,
    author: Author,
    genre: Genre,
  };

  return models[model];
};

const createEntry = async (res, modelName, data, uniqueField) => {
  const Model = getModel(modelName);

  try {
    const [entry, created] = await Model.findOrCreate({
      where: { [uniqueField]: data[uniqueField] },
      defaults: data,
    });

    if (!created) {
      res.status(200).json({ message: "Entry already exists", entry });
    } else {
      res.status(201).json({ message: "Entry created successfully", entry });
    }
  } catch (error) {
    if (error.name === "SequelizeUniqueConstraintError") {
      res.status(200).json({ message: "Entry already exists", entry: error.errors[0].instance });
    } else {
      res.status(500).json({ message: "Error creating entry", error });
    }
  }
};

const getAllEntries = async (res, model) => {
  const Model = getModel(model);

  const options = getOptions(model);

  const entries = await Model.findAll({ ...options });

  const entriesWithoutPasswords = entries.map((entry) => {
    return removePassword(entry.get());
  });

  res.status(200).json(entriesWithoutPasswords);
};

const getEntryBySearch = (res, model, searchField, searchValue) => {
  const Model = getModel(model);

  const options = getOptions(model);

  const whereClause = {
    [searchField]: {
      [Op.iLike]: `%${searchValue}%`,
    },
  };

  return Model.findOne({ where: whereClause, ...options }).then((entry) => {
    if (!entry) {
      res.status(404).json(get404Error(model));
    } else {
      const entryWithoutPassword = removePassword(entry.dataValues);

      res.status(200).json(entryWithoutPassword);
    }
  });
};

const getEntryById = (res, model, id) => {
  const Model = getModel(model);

  const options = getOptions(model);

  return Model.findByPk(id, { ...options }).then((entry) => {
    if (!entry) {
      res.status(404).json(get404Error(model));
    } else {
      const entryWithoutPassword = removePassword(entry.dataValues);

      res.status(200).json(entryWithoutPassword);
    }
  });
};

const updateEntry = async (res, model, id, changes) => {
  const Model = getModel(model);

  const [changesToUpdate] = await Model.update(changes, { where: { id } });

  if (!changesToUpdate) {
    res.status(404).json(get404Error(model));
  } else {
    const updatedEntry = await Model.findByPk(id);

    const entryWithoutPassword = removePassword(updatedEntry.get());

    res.status(200).json(entryWithoutPassword);
  }
};

const deleteEntry = async (res, model, id) => {
  const Model = getModel(model);

  const deleteEntry = await Model.destroy({ where: { id } });

  if (!deleteEntry) {
    res.status(404).json(get404Error(model));
  } else {
    res.status(204).send();
  }
};

module.exports = {
  createEntry,
  getAllEntries,
  getEntryById,
  updateEntry,
  deleteEntry,
  getEntryBySearch,
};
