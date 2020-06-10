"use strict";

const db = require("./db"),
  bookDao = require("../oDao/bookDao"),
  publisherDao = require("../oDao/publisherDao"),
  authorDao = require("../oDao/authorDao"),
  genreDao = require("../oDao/genreDao");

const maxLength = 45;

exports.createBook = (book) => {
  const results = {
    noTitle: false,
    tooLong: false,
    transactionError: false,
    publisherReadError: false,
    publisherNotFound: false,
    authorReadError: false,
    authorNotFound: false,
    authorNotFoundValues: null,
    genreReadError: false,
    genreNotFound: false,
    genreNotFoundValues: null,
    createError: false,
  };
  let publisher, authorIds, genreIds;
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
          publisher = await publisherDao.readPublishers(db, book.pubId);
        } catch (publisherReadError) {
          results.publisherReadError = true;
          db.rollback(() => reject(results));
          return;
        }
        if (publisher.length === 0) {
          results.publisherNotFound = true;
          db.rollback(() => reject(results));
          return;
        }
      }
      if (book.authorIds && book.authorIds.length > 0) {
        try {
          authorIds = await authorDao.readSomeAuthors(db, [book.authorIds]);
        } catch (error) {
          results.authorReadError = true;
          db.rollback(() => reject(results));
          return;
        }
        if (authorIds.length < book.authorIds.length) {
          results.authorNotFound = true;
          authorIds = authorIds.map((authorId) => authorId.authorId);
          results.authorNotFoundValues = book.authorIds.filter(
            (authorId) => !authorIds.includes(authorId)
          );
          db.rollback(() => reject(results));
          return;
        }
      }
      if (book.genreIds && book.genreIds.length > 0) {
        try {
          genreIds = await genreDao.readSomeGenres(db, [book.genreIds]);
        } catch (error) {
          results.genreReadError = true;
          db.rollback(() => reject(results));
          return;
        }
        if (genreIds.length < book.genreIds.length) {
          results.genreNotFound = true;
          genreIds = genreIds.map((genreId) => genreId.genre_id);
          results.genreNotFoundValues = book.genreIds.filter(
            (genreId) => !genreIds.includes(genreId)
          );
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

exports.readBooks = (bookId = "%") => {
  return bookDao.readBooks(db, bookId);
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
    authorReadError: false,
    authorNotFound: false,
    authorNotFoundValues: null,
    genreReadError: false,
    genreNotFound: false,
    genreNotFoundValues: null,
    udpateError: false,
  };
  let books, publishers, authorIds, genreIds;
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
      if (book.authorIds && book.authorIds.length > 0) {
        try {
          authorIds = await authorDao.readSomeAuthors(db, [book.authorIds]);
        } catch (error) {
          results.authorReadError = true;
          db.rollback(() => reject(results));
          return;
        }
        if (authorIds.length < book.authorIds.length) {
          results.authorNotFound = true;
          authorIds = authorIds.map((authorId) => authorId.authorId);
          results.authorNotFoundValues = book.authorIds.filter(
            (authorId) => !authorIds.includes(authorId)
          );
          db.rollback(() => reject(results));
          return;
        }
      }
      if (book.genreIds && book.genreIds.length > 0) {
        try {
          genreIds = await genreDao.readSomeGenres(db, [book.genreIds]);
        } catch (error) {
          results.genreReadError = true;
          db.rollback(() => reject(results));
          return;
        }
        if (genreIds.length < book.genreIds.length) {
          results.genreNotFound = true;
          genreIds = genreIds.map((genreId) => genreId.genre_id);
          results.genreNotFoundValues = book.genreIds.filter(
            (genreId) => !genreIds.includes(genreId)
          );
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
