"use strict";

const overrideService = require("../service/overrideService"),
  router = require("express").Router();

// const corsOptions = { origin: "http://localhost:4200" };

router.get("/lms/admin/loans", async (request, response) => {
  let overridableLoans;
  try {
    overridableLoans = await overrideService.readOverridableLoans();
  } catch (error) {
    response
      .status(500)
      .send(
        "There was an error while trying to retrieve loan information from the database."
      );
    return;
  }
  response.status(200);
  response.format({
    "application/json": () => response.send(overridableLoans),
    "application/xml": () => response.send(jsontoxml(overridableLoans)),
  });
});

router.put(
  "/lms/admin/loans/book/:bookId/borrower/:cardNo/branch/:branchId/dateout/:dateOut",
  (request, response) => {
    const loanId = {
      bookId: request.params.bookId,
      cardNo: request.params.cardNo,
      branchId: request.params.branchId,
      dateOut: request.params.dateOut,
    };
    overrideService.overrideDueDate(loanId, (results) => {
      if (results.transactionError) {
        response
          .status(500)
          .send(
            "There was an error while attempting to start a database transaction."
          );
        return;
      }
      if (results.readError) {
        response
          .status(500)
          .send(
            "There was an error while attempting to find the loan in the database."
          );
        return;
      }
      if (results.loanNotFound) {
        response.status(404).send("That loan is not in the database.");
        return;
      }
      if (results.noDueDate) {
        response.status(400).send("That loan has no due date.");
        return;
      }
      if (results.returnedOnTime) {
        response.status(400).send("That loan was returned on time.");
        return;
      }
      if (results.updateError) {
        response
          .status(500)
          .send(
            "There was an error while attempting to change the loan's due date."
          );
        return;
      }
      response.sendStatus(204);
    });
  }
);

module.exports = router;
