"use strict";

const db = require("./db"),
  bookDao = require("../oDao/bookDao"),
  publisherDao = require("../oDao/publisherDao");

const maxLength = 45;

exports.deleteBook = async (bookId) => {
  const results = {
    transactionError: true,
    readError: false,
    bookNotFound: false,
    deleteError: false,
  };
  let books;
  db.beginTransaction(async (transactionError) => {
    if (transactionError) {
      results.transactionError = true;
      throw results;
    }
    try {
      books = await bookDao.readBooks(db, bookId);
    } catch (readError) {
      results.readError = true;
      db.rollback(() => {
        throw results;
      });
    }
    if (books.length === 0) {
      results.bookNotFound = true;
      db.rollback(() => {
        throw results;
      });
    }
    try {
      await bookDao.deleteBook(db, bookId);
      db.commit(() => {});
    } catch (deleteError) {
      results.deleteError = true;
      db.rollback(() => {
        throw results;
      });
    }
  });
};
