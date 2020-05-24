"use strict";

const db = require("./db"),
  publisherDao = require("../oDao/publisherDao");

const maxLength = 45;

exports.readPublishers = () => {
  return new Promise((resolve, reject) => {
    publisherDao.readPublishers(db).then(
      (result) => resolve(result),
      (error) => reject(error)
    );
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
