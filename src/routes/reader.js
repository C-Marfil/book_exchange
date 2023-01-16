const express = require('express');

const router = express.Router();

const readerController = require('../controllers/reader');

router
    .route('/')
    .get(readerController.readerGetAll)
    .post(readerController.readerCreate);

router
    .route('/:id')
    .get(readerController.readerGetById)
    .patch(readerController.readerUpdate)
    .delete(readerController.readerDelete);

module.exports = router;