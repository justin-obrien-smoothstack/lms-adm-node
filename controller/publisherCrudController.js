"use strict";

const publisherCrudService = require("../service/publisherCrudService"),
  router = require("express").Router(),
  jsontoxml = require("jsontoxml");

router.post("/lms/admin/publisher", async (request, response) => {
  try {
    await publisherCrudService.createPublisher(request.body);
  } catch (error) {
    if (error.noName) {
      response.status(400).send("The field 'publisherName' is required.");
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
    if (error.createError) {
      response
        .status(500)
        .send(
          "There was an error while attempting to create a database entry."
        );
      return;
    }
    if (error.readBooksError) {
      response
        .status(500)
        .send(
          "There was an error while attempting to find the publisher's books in the database."
        );
      return;
    }
    if (error.bookNotFound !== undefined) {
      response
        .status(404)
        .send(
          `There is no book with ID ${error.bookNotFound} in the database.`
        );
      return;
    }
    if (error.updateBookError) {
      response
        .status(500)
        .send(
          "There was an error while attempting to update book information."
        );
      return;
    }
  }
  response.sendStatus(201);
});

router.get("/lms/admin/publishers", async (request, response) => {
  let publishers;
  try {
    publishers = await publisherCrudService.readPublishers();
  } catch (error) {
    if (error.transactionError) {
      response
        .status(500)
        .send(
          "There was an error while attempting to start a database transaction."
        );
      return;
    }
    if (error.readPublishersError) {
      response
        .status(500)
        .send(
          "There was an error while attempting to retrieve publisher information."
        );
      return;
    }
    if (error.readBooksError) {
      response
        .status(500)
        .send(
          "There was an error while attempting to retrieve book information."
        );
      return;
    }
    response.status(200);
    response.format({
      "application/json": () => response.send(publishers),
      "application/xml": () => response.send(jsontoxml(publishers)),
    });
  }

  publisherCrudService.readPublishers().then(
    (result) => {
      response.status(200);
      response.format({
        "application/json": () => response.send(result),
        "application/xml": () => response.send(jsontoxml(result)),
      });
    },
    (error) => {
      response
        .status(500)
        .send(
          "There was an error while attempting to retrieve publisher information from the databse."
        );
    }
  );
});

router.put("/lms/admin/publisher", (request, response) => {
  publisherCrudService.updatePublisher(request.body).then(
    (result) => response.sendStatus(204),
    (error) => {
      if (error.fieldsMissing) {
        response
          .status(400)
          .send("The fields 'publisherId' and 'publisherName' are required.");
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
          .send("There was an error while attempting to find the publisher.");
        return;
      }
      if (error.publisherNotFound) {
        response
          .status(404)
          .send(
            `There is no publisher with ID ${request.body.publisherId} in the database.`
          );
        return;
      }
      if (error.updateError) {
        response
          .status(500)
          .send(
            "There was an error while attempting to update the publisher information."
          );
      }
    }
  );
});

router.delete("/lms/admin/publishers/:publisherId", (request, response) => {
  publisherCrudService.deletePublisher(request.params.publisherId).then(
    (result) => response.sendStatus(204),
    (error) => {
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
          .send("There was an error while attempting to find the publisher.");
        return;
      }
      if (error.publisherNotFound) {
        response
          .status(404)
          .send(
            `There is no publisher with ID ${request.params.publisherId} in the database.`
          );
        return;
      }
      if (error.deleteError) {
        response
          .status(500)
          .send("There was an error while attempting to delete the publisher.");
      }
    }
  );
});

module.exports = router;
