const { Book, Reader } = require('../models');


const get404Error = (model) => ({ error: `The ${model} could not be found.` });

const getModel = (model) => {
    const models = {
        reader: Reader,
        book: Book,
    };

    return models[model];
};

const createEntry = async (res, model, body) => {
    const Model = getModel(model);

    try {
        const newEntry = await Model.create(body);
        
        res.status(201).json(newEntry);
    } catch (error) {
        const errorMessages = error.errors?.map((e) => e.message);
    
        res.status(400).json({ errors: errorMessages });
    }
};

const getAllEntries = async (res, model) => {
    const Model = getModel(model);

    const entries = await Model.findAll();

    res.status(200).json(entries);
};

const getEntryById = async (res, model, id) => {
    const Model = getModel(model);

    const entry = await Model.findByPk(id);

    if(!entry) {
    res.status(404).json(get404Error(model));
    } else {
    res.status(200).json(entry);
    };
};

const updateEntry = async (res, model, id, changes) => {
    const Model = getModel(model);

    const [ changesToUpdate ] = await Model.update(changes, { where: { id } });

    if(!changesToUpdate) {
        res.status(404).json(get404Error(model));
    } else {
        const updatedEntry = await Model.findByPk(id);
        res.status(200).json(updatedEntry);
    };   
};

const deleteEntry = async (res, model, id) => {
    const Model = getModel(model);
    const deleteEntry = await Model.destroy({ where: { id } });

    if(!deleteEntry) {
        res.status(404).json(get404Error(model));
    } else {
        res.status(204).send();
    };
};

    module.exports = {
        createEntry,
        getAllEntries,
        getEntryById,
        updateEntry,
        deleteEntry,
    };