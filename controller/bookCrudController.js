"use strict";

const bookCrudService = require("../service/bookCrudService"),
  router = require("express").Router();

router.get("/lms/admin/books", async (request, response) => {
  let books;
  try {
    books = await bookCrudService.readBooks();
    response.status(200);
    response.format({
      "application/json": () => response.send(books),
      "application/xml": () => response.send(jsontoxml(books)),
    });
  } catch (error) {
    response
      .status(500)
      .send(
        "There was an error while attempting to retrieve book information from the database."
      );
  }
});

module.exports = router;
