let routes = require("express").Router();
const jsontoxml = require("jsontoxml");
let service = require("../service/genreCrudService");

routes.get("/lms/admin/genre", (req, res) => {
  service
    .readAllGenres()
    .then((result) => {
      res.status(result.status);
      res.format({
        "application/json": function () {
          res.send(result.body);
        },
        "application/xml": function () {
          res.send(jsontoxml(result.body));
        },
        "text/plain": function () {
          res.send(result.body.toString());
        },
      });
    })
    .catch((err) => {
      res.status(500).send("Internal server error.");
    });
});

routes.get("/lms/admin/genre/:id", (req, res) => {
  service
    .readGenre(req.params.id)
    .then((result) => {
      res.status(result.status);
      res.format({
        "application/json": function () {
          res.send(result.body);
        },
        "application/xml": function () {
          res.send(jsontoxml(result.body));
        },
        "text/plain": function () {
          res.send(result.body.toString());
        },
      });
    })
    .catch((err) => {
      res.status(500).send("Internal server error.");
    });
});

routes.post("/lms/admin/genre", (req, res) => {
  service.createGenre(req.body, res);
});

routes.put("/lms/admin/genre", async (req, res) => {
  let response = await service.updateGenre(req.body);
  res.status(response.status);
  res.format({
    "application/json": function () {
      res.send(response.body);
    },
    "application/xml": function () {
      res.send(jsontoxml(response.body));
    },
    "text/plain": function () {
      res.send(response.body.toString());
    },
  });
});

routes.delete("/lms/admin/genre/:id", (req, res) => {
  service
    .deleteGenre(req.params.id)
    .then((result) => {
      res.status(result.status);
      res.format({
        "application/json": function () {
          res.send(result.body);
        },
        "application/xml": function () {
          res.send(jsontoxml(result.body));
        },
        "text/plain": function () {
          res.send(result.body.toString());
        },
      });
    })
    .catch((err) => {
      res.status(500).send("Internal server error.");
    });
});

module.exports = routes;
