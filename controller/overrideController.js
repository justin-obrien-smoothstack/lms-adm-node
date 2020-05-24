"use strict";

const service = require("../service/overrideService"),
  router = require("express").Router();

router.put(
  "/lms/admin/loan/book/:bookId/borrower/:cardNo/branch/:branchId/dateout/:dateOut",
  (request, response) => {
    const loanId = {
      bookId: request.params.bookId,
      cardNo: request.params.cardNo,
      branchId: request.params.branchId,
      dateOut: request.params.dateOut,
    };
    service.overrideDueDate(loanId, (results) => {
      if (results.transactionError)
        response
          .status(500)
          .send(
            "There was an error while attempting to start a database transaction."
          );
      if (results.readError)
        response
          .status(500)
          .send(
            "There was an error while attempting to find the loan in the databse."
          );
      if (results.loanNotFound)
        response.status(404).send("That loan was not found in the database.");
      if (results.noDueDate)
        response.status(400).send("That loan has no due date.");
      if (results.returnedOnTime)
        response.status(400).send("That loan was returned on time");
      if (results.updateError)
        response
          .status(500)
          .send(
            "There was an error while attempting to change the loan's due date."
          );
      response.sendStatus(204);
    });
  }
);

module.exports = router;
