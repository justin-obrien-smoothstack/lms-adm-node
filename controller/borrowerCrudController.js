let routes = require("express").Router();
let service = require("../service/borrowerCrudService");

routes.get("/lms/admin/borrower", (req, res) => {
  service
    .readAllBorrowers()
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

routes.get("/lms/admin/borrower/:cardNo", (req, res) => {
  service
    .readBorrower(req.params.cardNo)
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

routes.post("/lms/admin/borrower", (req, res) => {
  service.createBorrower(req.body, res);
});

routes.put("/lms/admin/borrower", async (req, res) => {
  let response = await service.updateBorrower(req.body);
  res.status(response.status);
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
});

routes.delete("/lms/admin/borrower/:cardNo", (req, res) => {
  service
    .deleteBorrower(req.params.cardNo)
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
