"use strict";

const bookCrudService = require("../service/bookCrudService"),
  router = require("express").Router();

router.delete("/lms/admin/books/:bookId", async (request, response) => {
  try {
    await bookCrudService.deleteBook(request.params.bookId);
  } catch (error) {
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
        .send(`There is no book with ID ${bookId} in the database.`);
      return;
    }
    if (error.deleteError) {
      response
        .status(500)
        .send(
          "There was an error while attempting to delete the book information from the database."
        );
      return;
    }
  }
  response.sendStatus(204);
});

module.exports = router;
