"use strict";

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
