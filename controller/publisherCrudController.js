"use strict";

const publisherCrudService = require("../service/publisherCrudService"),
  router = require("express").Router(),
  jsontoxml = require("jsontoxml");

router.put("/lms/admin/publisher", (request, response) => {
  publisherCrudService.updatePublisher(request.body).then(
    (result) => response.sendStatus(204),
    (error) => {
      if (error.fieldsMissing) {
        response.status(400).send("The fields 'publisherId' and 'publisherName' are required.");
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
            `There is no publisher with ID ${request.params.publisherId} in the database.`
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

module.exports = router;
