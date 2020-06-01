"use strict";

const db = require("./db"),
  loanDao = require("../oDao/loanDao"),
  moment = require("moment");

exports.overrideDueDate = (loanId, cb) => {
  const results = {
    transactionError: false,
    readError: false,
    loanNotFound: false,
    noDueDate: false,
    returnedOnTime: false,
    updateError: false,
  };
  let loan;
  db.beginTransaction((transactionError) => {
    if (transactionError) {
      results.transactionError = true;
      cb(results);
      return;
    }
    loanId.dateOut = loanId.dateOut.replace("T", " ").replace("_", ":");
    loanDao.readLoans(db, loanId, (readError, readResult) => {
      if (readError) {
        results.readError = true;
        db.rollback(() => cb(results));
        return;
      }
      loan = readResult[0];
      if (!loan) {
        results.loanNotFound = true;
        db.rollback(() => cb(results));
        return;
      }
      if (!loan.dueDate) {
        results.noDueDate = true;
        db.rollback(() => cb(results));
        return;
      }
      if (
        loan.dateIn &&
        loan.dateIn <= Date.now() &&
        loan.dateIn <= loan.dueDate
      ) {
        results.returnedOnTime = true;
        db.rollback(() => cb(results));
        return;
      }
      loan.dueDate.setDate(loan.dueDate.getDate() + 7);
      loan.dueDate = moment(loan.dueDate).format("YYYY-MM-DD HH:mm:ss");
      loanDao.updateLoan(db, loan, (updateError) => {
        if (updateError) {
          results.updateError = true;
          db.rollback(() => cb(results));
          return;
        }
        db.commit(() => cb(results));
      });
    });
  });
};
