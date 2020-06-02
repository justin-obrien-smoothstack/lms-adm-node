"use strict";

const doQuery = (db, query, parameters) => {
  return new Promise((resolve, reject) => {
    db.query(query, parameters, (error, result) => {
      if (error) reject(error);
      resolve(result);
    });
  });
};

const getBookRelations = async (db, bookId, table, column) => {
  const query = `SELECT * FROM ${table} WHERE bookId LIKE ?`;
  return (await doQuery(db, query, bookId)).map((row) => row[column]);
};

const setBookRelations = async (db, bookId, relationIds, table, column) => {
  const deleteQuery = `DELETE FROM ${table} WHERE bookId = ?;`,
    parameters = [];
  let createQuery = `INSERT INTO ${table} (bookId, ${column}) VALUES`;
  relationIds.forEach((relationId) => {
    createQuery += " (?,?)";
    parameters.push(bookId, relationId);
  });
  createQuery += ";";
  await doQuery(db, deleteQuery, bookId);
  await doQuery(db, createQuery, parameters);
};

exports.createBook = (db, book) => {
  const query = "INSERT INTO tbl_book (title, pubId) VALUES (?,?);",
    parameters = [book.title, book.pubId];
  doQuery(db, query, parameters);
};

exports.readBooks = async (db, bookId = "%") => {
  const query = "SELECT * FROM tbl_book WHERE bookId LIKE ?";
  let books;
  books = await doQuery(db, query, bookId);
  for (const book of books) {
    book.authorIds = await getBookRelations(
      db,
      book.bookId,
      "tbl_book_authors",
      "authorId"
    );
    book.genreIds = await getBookRelations(
      db,
      book.bookId,
      "tbl_book_genres",
      "genre_id"
    );
  }
  return books;
};

exports.updateBook = (db, book) => {
  const query = "UPDATE tbl_book SET title = ?, pubId = ? WHERE bookId = ?;",
    parameters = [book.title, book.pubId, book.bookId];
  doQuery(db, query, parameters);
};

exports.deleteBook = (db, bookId) => {
  const query = "DELETE FROM tbl_book WHERE bookId = ?;";
  doQuery(db, query, bookId);
};
