let routes = require("express").Router();
let service = require("../service/borrowerCrudService");

routes.get("/lms/admin/borrower", (req, res) => {
  service
    .readAllBorrowers()
    .then((result) => {
      res.status(result.status).send(result.body);
    })
    .catch((err) => {
      res.status(500).send("Internal server error.");
    });
});

routes.get("/lms/admin/borrower/:cardNo", (req, res) => {
  service
    .readBorrower(req.params.cardNo)
    .then((result) => {
      res.status(result.status).send(result.body);
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
  res.status(response.status).send(response.body);
});

routes.delete("/lms/admin/borrower/:cardNo", (req, res) => {
  service
    .deleteBorrower(req.params.cardNo)
    .then((result) => {
      res.status(result.status).send(result.body);
    })
    .catch((err) => {
      res.status(500).send("Internal server error.");
    });
});

module.exports = routes;

let checkBodyCreate = (body) => {
  if (
    body.cardNo == undefined ||
    body.name == undefined ||
    body.address == undefined ||
    body.phone == undefined
  ) {
    return false;
  }

  return true;
};
