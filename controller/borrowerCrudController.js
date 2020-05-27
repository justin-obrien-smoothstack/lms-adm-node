const routes = require("express").Router();
const jsontoxml = require("jsontoxml");
const service = require("../service/borrowerCrudService");
const winston = require("winston");

const logger = winston.createLogger({
  transports: [new winston.transports.Console()],
});

routes.get("/lms/admin/borrower", (req, res) => {
  service
    .readAllBorrowers()
    .then((result) => {
      if (result.length === 0) {
        res.status(200).send("There are no borrowers in our system.");
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

routes.get("/lms/admin/borrower/:cardNo", (req, res) => {
  service
    .readBorrower(req.params.cardNo)
    .then((result) => {
      if (result.length === 0) {
        res
          .status(404)
          .send("There is no borrower with that card number in our database.");
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

routes.post("/lms/admin/borrower", (req, res) => {
  let goodReq = checkCreateRequest(req.body, res);
  if (!goodReq) return;

  service
    .createBorrower(req.body)
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

routes.put("/lms/admin/borrower", (req, res) => {
  let goodReq = checkUpdateRequest(req.body, res);
  if (!goodReq) return;

  service
    .readBorrower(req.body.cardNo)
    .then((result) => {
      if (result.length === 0) {
        res
          .status(404)
          .send("There is no borrower with that card number in our database.");
        return;
      }
      service.updateBorrower(req.body);
      res.status(204).send("Borrower updated.");
    })
    .catch((err) => {
      logger.error(err);
      res.status(500).send("Internal server error.");
    });
});

routes.delete("/lms/admin/borrower/:cardNo", (req, res) => {
  service
    .readBorrower(req.params.cardNo)
    .then((result) => {
      if (result.length === 0) {
        res
          .status(404)
          .send("There is no borrower with that card number in our database.");
        return;
      }
      service.deleteBorrower(req.params.cardNo);
      res.status(204).send("Borrower deleted.");
    })
    .catch((err) => {
      logger.error(err);
      res.status(500).send("Internal server error.");
    });
});

module.exports = routes;

let checkUpdateRequest = (borrower, res) => {
  if (borrower.cardNo == undefined) {
    res.status(400).send("The card number is required to update a borrower.");
    return false;
  }

  for (const key of Object.keys(borrower)) {
    if (borrower[key].length > 45 || borrower[key].length < 1) {
      res
        .status(400)
        .send(
          "The length of fields name, address, and phone must be between 1 and 45 characters long."
        );
      return false;
    }
  }

  return true;
};

let checkCreateRequest = (borrower, res) => {
  for (const key of Object.keys(borrower)) {
    if (borrower[key].length > 45 || borrower[key].length < 1) {
      res
        .status(400)
        .send(
          "The length of fields name, address, and phone must be between 1 and 45 characters long."
        );
      return false;
    }
  }

  return true;
};
