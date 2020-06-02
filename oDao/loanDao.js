"use strict";

const doQuery = (db, query, parameters) => {
  return new Promise((resolve, reject) => {
    db.query(query, parameters, (error, result) => {
      if (error) reject(error);
      resolve(result);
    });
  });
};

exports.readLoans = (db, loanId, cb) => {
  const query =
      "SELECT * FROM tbl_book_loans WHERE bookId LIKE ? AND cardNo LIKE ? AND branchId LIKE ? AND dateOut LIKE ?;",
    parameters = [
      loanId.bookId,
      loanId.cardNo,
      loanId.branchId,
      loanId.dateOut,
    ];
  db.query(query, parameters, (error, result) => cb(error, result));
};

exports.readOverridableLoans = (db) => {
  const query =
    "SELECT * FROM tbl_book_loans WHERE dueDate IS NOT NULL AND (dateIn IS NULL OR dateIn > NOW() OR dateIn > dueDate);";
  return doQuery(db, query);
};

exports.updateLoan = (db, loan, cb) => {
  const query =
      "UPDATE tbl_book_loans SET dueDate = ?, dateIn = ? WHERE bookId = ? AND cardNo = ? AND branchId = ? AND dateOut = ?",
    parameters = [
      loan.dueDate,
      loan.dateIn,
      loan.bookId,
      loan.cardNo,
      loan.branchId,
      loan.dateOut,
    ];
  db.query(query, parameters, (error, result) => cb(error, result));
};
