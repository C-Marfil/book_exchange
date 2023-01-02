const { Reader } = require('../models');

exports.readerCreate = async (req, res) => {
    const newReader = await Reader.create(req.body);
    res.status(201).json(newReader);
};

exports.readerGetAll = async (req, res) => {
    const allReaders = await Reader.findAll();
    res.status(200).json(allReaders);
};

exports.readerGetById = async (req, res) => {
    const readerId = req.params.id;
    const reader = await Reader.findByPk(readerId);

    if(!reader) {
        res.status(404).json({ error: 'The reader could not be found.'});
    } else {
        res.status(200).json(reader);
    };
};

exports.readerUpdate = async (req, res) => {
    const readerId = req.params.id;
    const updateData = req.body;
    const [ updatedRows ] = await Reader.update(updateData, { where: { id: readerId } });
    const reader = await Reader.findByPk(readerId);

    if(!reader) {
        res.status(404).json({ error: 'The reader could not be found.'});
    } else {
        res.status(200).json(updatedRows);
    };
};

exports.readerDelete = async (req, res) => {
    const readerId = req.params.id;
    const reader = await Reader.findByPk(readerId);
    const readerDeleted = await Reader.destroy({ where: { id: readerId }});

    if(!reader) {
        res.status(404).json({ error: 'The reader could not be found.'});
    } else {
        res.status(204).json(readerDeleted);
    };
};


