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

exports.updateBook = (db, book) => {
  const query = "UPDATE tbl_book SET title = ?, pubId = ? WHERE bookId = ?;",
    parameters = [book.title, book.pubId, book.bookId];
  return new Promise((resolve, reject) => {
    db.query(query, parameters, (error, result) => {
      if (error) reject(error);
      resolve(result);
    });
  });
};
