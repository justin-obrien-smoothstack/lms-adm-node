"use strict";

const bookCrudService = require("../service/bookCrudService"),
  router = require("express").Router();

router.post("/lms/admin/book", async (request, response) => {
  try {
    await bookCrudService.createBook(request.body);
  } catch (error) {
    if (error.noTitle) {
      response.status(400).send("The field 'title' is required.");
      return;
    }
    if (error.tooLong) {
      response.status(400).send("The maximum field length is 45 characters.");
      return;
    }
    if (error.transactionError) {
      response
        .status(500)
        .send(
          "There was an error while attempting to start a database transaction."
        );
      return;
    }
    if (error.publisherReadError) {
      response
        .status(500)
        .send(
          "There was an error while attempting to find the book's publisher in the database."
        );
      return;
    }
    if (error.publisherNotFound) {
      response
        .status(404)
        .send(
          `There is no publisher with ID ${request.body.pubId} in the database.`
        );
      return;
    }
    if (error.createError) {
      response
        .status(500)
        .send(
          "There was an error while attempting to add the book to the database."
        );
      return;
    }
  }
  response.sendStatus(201);
});

module.exports = router;
