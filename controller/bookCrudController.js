"use strict";

const bookCrudService = require("../service/bookCrudService"),
  router = require("express").Router(),
  jsontoxml = require("jsontoxml");

router.get("/lms/admin/books", async (request, response) => {
  let books;
  try {
    books = await bookCrudService.readBooks();
  } catch (error) {
    response
      .status(500)
      .send(
        "There was an error while attempting to retrieve book information from the database."
      );
    return;
  }
  response.status(200);
  response.format({
    "application/json": () => response.send(books),
    "application/xml": () => response.send(jsontoxml(books)),
  });
});

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
        .send(
          `There is no book with ID ${request.params.bookId} in the database.`
        );
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
