"use strict";

const db = require("./db"),
  publisherDao = require("../oDao/publisherDao"),
  bookDao = require("../oDao/bookDao");

const maxLength = 45;

exports.createPublisher = (publisher) => {
  const results = {
    noName: false,
    tooLong: false,
    transactionError: false,
    createError: false,
  };
  return new Promise((resolve, reject) => {
    if (!publisher.publisherName) {
      results.noName = true;
      reject(results);
      return;
    }
    if (
      publisher.publisherName.length > maxLength ||
      (publisher.publisherAddress &&
        publisher.publisherAddress.length > maxLength) ||
      (publisher.publisherPhone && publisher.publisherPhone.length > maxLength)
    ) {
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
        publisherDao.createPublisher(db, publisher);
      } catch (error) {
        results.createError = true;
        db.rollback(() => reject(results));
      }
      db.commit(() => resolve(results));
    });
  });
};

exports.readPublishers = () => {
  const results = {
    transactionError: false,
    readPublishersError: false,
    readBooksError: false,
  };
  let publishers, books;
  return new Promise((resolve, reject) => {
    db.beginTransaction(async (transactionError) => {
      if (transactionError) {
        results.transactionError = true;
        reject(results);
        return;
      }
      try {
        publishers = await publisherDao.readPublishers(db);
      } catch (error) {
        results.readPublishersError = true;
        db.rollback(() => reject(results));
        return;
      }
      for (const publisher of publishers) {
        try {
          books = await bookDao.readBooks(db, "%", publisher.publisherId);
        } catch (error) {
          results.readBooksError = true;
          db.rollback(() => reject(results));
          return;
        }
        publisher.bookIds = [];
        for (const book of books) publisher.bookIds.push(book.bookId);
      }
      db.commit(() => resolve(publishers));
    });
  });
};

exports.updatePublisher = (publisher) => {
  const results = {
    fieldsMissing: false,
    tooLong: false,
    transactionError: false,
    readError: false,
    publisherNotFound: false,
    updateError: false,
  };
  return new Promise((resolve, reject) => {
    if (
      !publisher.publisherName ||
      (publisher.publisherId !== 0 && !publisher.publisherId)
    ) {
      results.fieldsMissing = true;
      reject(results);
      return;
    }
    if (
      publisher.publisherName.length > maxLength ||
      (publisher.publisherAddress &&
        publisher.publisherAddress.length > maxLength) ||
      (publisher.publisherPhone && publisher.publisherPhone.length > maxLength)
    ) {
      results.tooLong = true;
      reject(results);
      return;
    }
    db.beginTransaction((transactionError) => {
      if (transactionError) {
        results.transactionError = true;
        reject(results);
        return;
      }
      publisherDao.readPublishers(db, publisher.publisherId).then(
        (readResult) => {
          if (readResult.length === 0) {
            results.publisherNotFound = true;
            db.rollback(() => reject(results));
            return;
          }
          publisherDao.updatePublisher(db, publisher).then(
            (udpateResult) => db.commit(() => resolve(results)),
            (updateError) => {
              results.updateError = true;
              db.rollback(() => reject(results));
            }
          );
        },
        (readError) => {
          results.readError = true;
          db.rollback(() => reject(results));
        }
      );
    });
  });
};

exports.deletePublisher = (publisherId) => {
  const results = {
    transactionError: false,
    readError: false,
    publisherNotFound: false,
    deleteError: false,
  };
  return new Promise((resolve, reject) => {
    db.beginTransaction((transactionError) => {
      if (transactionError) {
        results.transactionError = true;
        reject(results);
        return;
      }
      publisherDao.readPublishers(db, publisherId).then(
        (readResult) => {
          if (readResult.length === 0) {
            results.publisherNotFound = true;
            db.rollback(() => reject(results));
            return;
          }
          publisherDao.deletePublisher(db, publisherId).then(
            (deleteResult) => db.commit(() => resolve(results)),
            (deleteError) => {
              results.deleteError = true;
              db.rollback(() => reject(results));
            }
          );
        },
        (readError) => {
          results.readError = true;
          db.rollback(() => reject(results));
        }
      );
    });
  });
};
