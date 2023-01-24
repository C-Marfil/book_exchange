const express = require("express");

const router = express.Router();

const authorController = require("../controllers/author");

router
  .route("/")
  .get(authorController.authorGetAll)
  .post(authorController.authorCreate);

router
  .route("/:id")
  .get(authorController.authorGetById)
  .patch(authorController.authorUpdate)
  .delete(authorController.authorDelete);

module.exports = router;
