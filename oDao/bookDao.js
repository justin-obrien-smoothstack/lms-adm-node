"use strict";

exports.readBooks = (db, bookId = "%") => {
  const query = "SELECT * FROM tbl_book WHERE bookId LIKE ?";
  return new Promise((resolve, reject) => {
    db.query(query, [bookId], (error, result) => {
      if (error) reject(error);
      resolve(result);
    });
  });
};

exports.deleteBook = (db, bookId) => {
  const query = "DELETE FROM tbl_book WHERE bookId = ?;";
  return new Promise((resolve, reject) => {
    db.query(query, [bookId], (error, result) => {
      if (error) reject(error);
      resolve(result);
    });
  });
};
