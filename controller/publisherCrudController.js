"use strict";

const publisherCrudService = require("../service/publisherCrudService"),
  router = require("express").Router(),
  jsontoxml = require("jsontoxml");

router.get("/lms/admin/publishers", (request, response) => {
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
