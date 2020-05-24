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

module.exports = router;
