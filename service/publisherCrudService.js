"use strict";

const db = require("./db"),
  publisherDao = require("../oDao/publisherDao");

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
    db.beginTransaction((transactionError) => {
      if (transactionError) {
        results.transactionError = true;
        reject(results);
        return;
      }
      publisherDao.createPublisher(db, publisher).then(
        (createResult) => db.commit(() => resolve(results)),
        (createError) => {
          results.createError = true;
          db.rollback(() => reject(results));
        }
      );
    });
  });
};
