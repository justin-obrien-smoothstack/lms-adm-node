"use strict";

const db = require("./db"),
  bookDao = require("../oDao/bookDao"),
  publisherDao = require("../oDao/publisherDao");

const maxLength = 45;

exports.deleteBook = (bookId) => {
  const results = {
    transactionError: false,
    readError: false,
    bookNotFound: false,
    deleteError: false,
  };
  let books;
  return new Promise((resolve, reject) => {
    db.beginTransaction(async (transactionError) => {
      if (transactionError) {
        results.transactionError = true;
        reject(results);
        return;
      }
      try {
        books = await bookDao.readBooks(db, bookId);
      } catch (readError) {
        results.readError = true;
        db.rollback(() => reject(results));
        return;
      }
      if (books.length === 0) {
        results.bookNotFound = true;
        db.rollback(() => reject(results));
        return;
      }
      try {
        await bookDao.deleteBook(db, bookId);
        db.commit(() => resolve(results));
        return;
      } catch (deleteError) {
        results.deleteError = true;
        db.rollback(() => reject(results));
        return;
      }
    });
  });
};
