const express = require('express');
const bookController = require('../controllers/book');

const bookRouter = express.Router();

bookRouter.post('/', bookController.bookCreate);

module.exports = bookRouter;

