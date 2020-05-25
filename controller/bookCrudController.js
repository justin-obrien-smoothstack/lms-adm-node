"use strict";

const bookCrudService = require("../service/bookCrudService"),
  router = require("express").Router();

router.put("/lms/admin/book", async (request, response) => {
  try {
    await bookCrudService.updateBook(request.body);
  } catch (error) {
    if (error.fieldsMissing) {
      response
        .status(400)
        .send("The fields 'bookId' and 'title' are required.");
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
    if (error.readError) {
      response
        .status(500)
        .send(
          "There was an error while attempting to find the book in the database."
        );
      return;
    }
    if (error.bookNotFound) {
      response
        .status(404)
        .send(
          `There is no book with ID ${request.body.bookId} in the database.`
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
    if (error.updateError) {
      response
        .status(500)
        .send(
          "There was an error while attempting to update the book information."
        );
      return;
    }
  }
  response.sendStatus(204);
});

module.exports = router;
