"use strict";

const publisherCrudService = require("../service/publisherCrudService"),
  router = require("express").Router(),
  jsontoxml = require("jsontoxml");

router.post("/lms/admin/publisher", (request, response) => {
  const publisher = request.body;
  publisherCrudService.createPublisher(publisher).then(
    (result) => response.sendStatus(201),
    (error) => {
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
            "There was an error while attempting to add the publisher information."
          );
      }
    }
  );
});

module.exports = router;
