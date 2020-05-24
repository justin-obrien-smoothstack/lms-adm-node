"use strict";

const db = require("./db"),
  bookDao = require("../oDao/bookDao"),
  publisherDao = require("../oDao/publisherDao");

const maxLength = 45;

exports.createBook = (book) => {
  const results = {
    transactionError: false,
    noTitle: false,
    tooLong: false,
    publisherReadError: false,
    publisherNotFound: false,
    createError: false,
  };
  let publishers;
  return new Promise((resolve, reject) => {
    if (!book.title) {
      results.noTitle = true;
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
        await bookDao.createBook(db, book);
      } catch (createError) {
        results.createError = true;
        db.rollback(() => reject(results));
        return;
      }
      db.commit(() => resolve(results));
    });
  });
};
