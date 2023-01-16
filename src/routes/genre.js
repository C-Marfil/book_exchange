const express = require('express');

const router = express.Router();

const genreController = require('../controllers/genre');

router
    .route('/')
    .get(genreController.genreGetAll)
    .post(genreController.genreCreate);

router
    .route('/:id')
    .get(genreController.genreGetById)
    .patch(genreController.genreUpdate)
    .delete(genreController.genreDelete);

module.exports = router;