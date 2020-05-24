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
          "There was an error while attempting to find the book information in the database."
        );
    }
  }
});

module.exports = router;
