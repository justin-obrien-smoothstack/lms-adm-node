const routes = require("express").Router();
const jsontoxml = require("jsontoxml");
const service = require("../service/genreCrudService");
const winston = require("winston");

const logger = winston.createLogger({
  transports: [new winston.transports.Console()],
});

routes.get("/lms/admin/genre", (req, res) => {
  service
    .readAllGenres()
    .then((result) => {
      if (result.length === 0) {
        res.status(200).send("There are no genres in our system.");
        return;
      }

      res.status(200);
      res.format({
        "application/json": function () {
          res.send(result);
        },
        "application/xml": function () {
          res.send(jsontoxml(result));
        },
        "text/plain": function () {
          res.send(result.toString());
        },
      });
    })
    .catch((err) => {
      logger.error(err);
      res.status(500).send("Internal server error.");
    });
});

routes.get("/lms/admin/genre/:id", (req, res) => {
  service
    .readGenre(req.params.id)
    .then((result) => {
      if (result.length === 0) {
        res.status(404).send("There is no genre with that id in our database.");
        return;
      }

      res.status(200);
      res.format({
        "application/json": function () {
          res.send(result);
        },
        "application/xml": function () {
          res.send(jsontoxml(result));
        },
        "text/plain": function () {
          res.send(result.toString());
        },
      });
    })
    .catch((err) => {
      logger.error(err);
      res.status(500).send("Internal server error.");
    });
});

routes.post("/lms/admin/genre", (req, res) => {
  let goodReq = checkCreateRequest(req.body, res);
  if (!goodReq) return;

  service
    .createGenre(req.body)
    .then((result) => {
      res.status(201);
      res.format({
        "application/json": function () {
          res.send(result);
        },
        "application/xml": function () {
          res.send(jsontoxml(result));
        },
        "text/plain": function () {
          res.send(result.toString());
        },
      });
    })
    .catch((err) => {
      logger.error(err);
      res.status(500).send("Internal server error.");
    });
});

routes.put("/lms/admin/genre", async (req, res) => {
  let goodReq = checkUpdateRequest(req.body, res);
  if (!goodReq) return;

  service
    .readGenre(req.body.id)
    .then((result) => {
      if (result.length === 0) {
        res.status(404).send("There is no genre with that id in our database.");
        return;
      }
      service.updateGenre(req.body);
      res.status(200);
    })
    .catch((err) => {
      logger.error(err);
      res.status(500).send("Internal server error.");
    });
});

routes.delete("/lms/admin/genre/:id", (req, res) => {
  service
    .readGenre(req.params.id)
    .then((result) => {
      if (result.length === 0) {
        res.status(404).send("There is no genre with that id in our database.");
        return;
      }
      service.deleteGenre(req.params.id);
      res.status(204).send("Genre deleted.");
    })
    .catch((err) => {
      logger.error(err);
      res.status(500).send("Internal server error.");
    });
});

module.exports = routes;

let checkUpdateRequest = (genre, res) => {
  let maxLength = 45;
  let minLength = 1;

  if (genre.id == undefined) {
    res.status(400).send("The id is required to update a genre.");
    return false;
  } else if (genre.name.length > maxLength || genre.name.length < minLength) {
    res
      .status(400)
      .send("The length of name must be between 1 and 45 characters long.");
    return false;
  }

  return true;
};

let checkCreateRequest = (genre, res) => {
  let maxLength = 45;
  let minLength = 1;

  if (genre.name.length > maxLength || genre.name.length < minLength) {
    res
      .status(400)
      .send(
        "The length of a genre name must be between 1 and 45 characters long."
      );
    return false;
  }

  return true;
};
