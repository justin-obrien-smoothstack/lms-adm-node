"use strict";

const db = require("./db"),
  publisherDao = require("../oDao/publisherDao");

const maxLength = 45;

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
