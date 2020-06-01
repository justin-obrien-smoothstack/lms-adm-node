"use strict";

const doQuery = (db, query, parameters) => {
  return new Promise((resolve, reject) => {
    db.query(query, parameters, (error, result) => {
      if (error) reject(error);
      resolve(result);
    });
  });
};

exports.createBook = (db, book) => {
  const query = "INSERT INTO tbl_book (title, pubId) VALUES (?,?);",
    parameters = [book.title, book.pubId];
  return doQuery(db, query, parameters);
};

exports.readBooks = (db, bookId = "%") => {
  const query = "SELECT * FROM tbl_book WHERE bookId LIKE ?";
  return doQuery(db, query, bookId);
};

exports.updateBook = (db, book) => {
  const query = "UPDATE tbl_book SET title = ?, pubId = ? WHERE bookId = ?;",
    parameters = [book.title, book.pubId, book.bookId];
  return doQuery(db, query, parameters);
};

exports.deleteBook = (db, bookId) => {
  const query = "DELETE FROM tbl_book WHERE bookId = ?;";
  return doQuery(db, query, bookId);
};
