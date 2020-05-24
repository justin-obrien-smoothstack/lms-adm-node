"use strict";

const db = require("./db"),
  bookDao = require("../oDao/bookDao"),
  publisherDao = require("../oDao/publisherDao");

const maxLength = 45;

exports.delete = async (bookId) => {
  const results = {
    transactionError: true,
    readError: false,
    bookNotFound: false,
  };
  let books;
  db.beginTransaction((transactionError) => {
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
      return await bookDao.deleteBook(db, bookId);
    } catch (deleteError) {
        results.deleteError =true;
        throw results;
    }
  });
};
