"use strict";

exports.createBook = (db, book) => {
  const query = "INSERT INTO tbl_book (title, pubId) VALUES (?,?);",
    parameters = [book.title, book.pubId];
  return new Promise((resolve, reject) => {
    db.query(query, parameters, (error, result) => {
      if (error) reject(error);
      resolve(result);
    });
  });
};
