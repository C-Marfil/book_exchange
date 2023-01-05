const { Book } = require('../models');

exports.bookCreate = async (req, res) => {
    try {
    const newBook = await Book.create(req.body);
    
    res.status(201).json(newBook);
    
    } catch (error) {
        const errorMessages = error.errors?.map((e) => e.message);

        res.status(400).json({ errors: errorMessages });
    };
};