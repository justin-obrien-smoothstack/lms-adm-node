"use strict";

const write = (db, query, parameters, cb) => db.query(query, parameters, cb);

exports.read = (loanId, cb) => {
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
