"use strict";

const doQuery = (db, query, parameters) => {
  return new Promise((resolve, reject) => {
    db.query(query, parameters, (error, result) => {
      if (error) reject(error);
      resolve(result);
    });
  });
}

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

exports.readBooks = (db, bookId = "%", pubId = "%", includeNullPubId = true) => {
  const parameters = [bookId, pubId];
  let query = "SELECT * FROM tbl_book WHERE bookId LIKE ? AND (pubId LIKE ?";
  if (includeNullPubId) query += " OR pubId IS NULL";
  query += ");";
  return doQuery(db, query, parameters);
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

exports.deleteBook = (db, bookId) => {
  const query = "DELETE FROM tbl_book WHERE bookId = ?;";
  return new Promise((resolve, reject) => {
    db.query(query, [bookId], (error, result) => {
      if (error) reject(error);
      resolve(result);
    });
  });
};
