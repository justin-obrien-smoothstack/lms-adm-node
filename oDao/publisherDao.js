"use strict";

exports.createPublisher = (db, publisher) => {
  const query =
      "INSERT INTO tbl_publisher " +
      "(publisherName, publisherAddress, publisherPhone) VALUES (?, ?, ?);",
    parameters = [
      publisher.publisherName,
      publisher.publisherAddress,
      publisher.publisherPhone,
    ];
  return new Promise((resolve, reject) => {
    db.query(query, parameters, (error, result) => {
      if (error) reject(error);
      resolve(result);
    });
  });
};
