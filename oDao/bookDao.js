"use strict";

const doQuery = (db, query, parameters) => {
  return new Promise((resolve, reject) => {
    db.query(query, parameters, (error, result) => {
      if (error) reject(error);
      resolve(result);
    });
  });
}

const getBookRelations = async (db, bookId, table, column) => {
  const query = `SELECT * FROM ${table} WHERE bookId LIKE ?;`;
  return (await doQuery(db, query, bookId)).map((row) => row[column]);
};

const setBookRelations = async (db, bookId, relationIds, table, column) => {
  const deleteQuery = `DELETE FROM ${table} WHERE bookId = ?;`,
    parameters = [];
  let createQuery = `INSERT INTO ${table} (bookId, ${column}) VALUES`;
  if (relationIds.length === 0) return;
  relationIds.forEach((relationId) => {
    createQuery += " (?, ?),";
    parameters.push(bookId, relationId);
  });
  createQuery = createQuery.substring(0, createQuery.length - 1) + ";";
  await doQuery(db, deleteQuery, bookId);
  await doQuery(db, createQuery, parameters);
};

exports.createBook = async (db, book) => {
  const query = "INSERT INTO tbl_book (title, pubId) VALUES (?, ?);",
    parameters = [book.title, book.pubId],
    bookId = (await doQuery(db, query, parameters)).insertId;
  await setBookRelations(
    db,
    book.bookId,
    book.authorIds,
    "tbl_book_authors",
    "authorId"
  );
  await setBookRelations(
    db,
    book.bookId,
    book.genreIds,
    "tbl_book_genres",
    "genre_id"
  );
};

exports.readBooks = async (db, bookId = "%", pubId = "%", includeNullPubId = true) => {
  const parameters = [bookId, pubId];
  let query = "SELECT * FROM tbl_book WHERE bookId LIKE ? AND (pubId LIKE ?", books;
  if (includeNullPubId) query += " OR pubId IS NULL";
  query += ");";
  books = await doQuery(db, query, parameters);
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

exports.updateBook = async (db, book) => {
  const query = "UPDATE tbl_book SET title = ?, pubId = ? WHERE bookId = ?;",
    parameters = [book.title, book.pubId, book.bookId];
  await doQuery(db, query, parameters);
  await setBookRelations(
    db,
    book.bookId,
    book.authorIds,
    "tbl_book_authors",
    "authorId"
  );
  await setBookRelations(
    db,
    book.bookId,
    book.genreIds,
    "tbl_book_genres",
    "genre_id"
  );
};

exports.deleteBook = (db, bookId) => {
  const query = "DELETE FROM tbl_book WHERE bookId = ?;";
  return doQuery(db, query, bookId);
};
