"use strict";

const db = require("./db"),
  bookDao = require("../oDao/bookDao"),
  publisherDao = require("../oDao/publisherDao");

const maxLength = 45;

exports.updateBook = (book) => {
  const results = {
    fieldsMissing: false,
    tooLong: false,
    transactionError: false,
    readError: false,
    bookNotFound: false,
    publisherReadError: false,
    publisherNotFound: false,
    udpateError: false,
  };
  let books, publishers;
  return new Promise((resolve, reject) => {
    if (!book.title || (book.bookId !== 0 && !book.bookId)) {
      results.fieldsMissing = true;
      reject(results);
      return;
    }
    if (book.title.length > maxLength) {
      results.tooLong = true;
      reject(results);
      return;
    }
    db.beginTransaction(async (transactionError) => {
      if (transactionError) {
        results.transactionError = true;
        reject(results);
        return;
      }
      try {
        books = await bookDao.readBooks(db, book.bookId);
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
      if (book.pubId === 0 || book.pubId) {
        try {
          publishers = await publisherDao.readPublishers(db, book.pubId);
        } catch (publisherReadError) {
          results.publisherReadError = true;
          db.rollback(() => reject(results));
          return;
        }
        if (publishers.length === 0) {
          results.publisherNotFound = true;
          db.rollback(() => reject(results));
          return;
        }
      }
      try {
        await bookDao.updateBook(db, book);
      } catch (udpateError) {
        results.udpateError = true;
        db.rollback(() => reject(results));
        return;
      }
      db.commit(() => resolve(results));
    });
  });
};
