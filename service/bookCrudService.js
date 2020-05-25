"use strict";

const db = require("./db"),
  bookDao = require("../oDao/bookDao"),
  publisherDao = require("../oDao/publisherDao");

const maxLength = 45;

exports.createBook = (book) => {
  const results = {
    noTitle: false,
    tooLong: false,
    transactionError: false,
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

exports.readBooks = async () => {
  return await bookDao.readBooks(db);
};

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
