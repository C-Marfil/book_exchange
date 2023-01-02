const express = require('express');
const readerController = require('../controllers/reader');

const readerRouter = express.Router();

readerRouter.post('/', readerController.readerCreate);

readerRouter.get('/', readerController.readerGetAll);
readerRouter.get('/:id', readerController.readerGetById);

readerRouter.patch('/:id', readerController.readerUpdate);

readerRouter.delete('/:id', readerController.readerDelete);

module.exports = readerRouter;