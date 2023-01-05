const { Book } = require('../models');

exports.bookCreate = async (req, res) => {
    const newBook = await Book.create(req.body);
    
    res.status(201).json(newBook);
};