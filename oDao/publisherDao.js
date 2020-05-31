"use strict";

const doQuery = (db, query, parameters) => {
  return new Promise((resolve, reject) => {
    db.query(query, parameters, (error, result) => {
      if (error) reject(error);
      resolve(result);
    });
  });
};

exports.createPublisher = (db, publisher) => {
  const query =
      "INSERT INTO tbl_publisher " +
      "(publisherName, publisherAddress, publisherPhone) VALUES (?, ?, ?);",
    parameters = [
      publisher.publisherName,
      publisher.publisherAddress,
      publisher.publisherPhone,
    ];
  return doQuery(db, query, parameters);
};

exports.readPublishers = (db, publisherId = "%") => {
  const query = "SELECT * FROM tbl_publisher WHERE publisherId LIKE ?";
  return doQuery(db, query, publisherId);
};

exports.updatePublisher = (db, publisher) => {
  const query =
      "UPDATE tbl_publisher SET publisherName = ?, publisherAddress = ?, publisherPhone = ? WHERE publisherId = ?;",
    parameters = [
      publisher.publisherName,
      publisher.publisherAddress,
      publisher.publisherPhone,
      publisher.publisherId,
    ];
  return doQuery(db, query, parameters);
};

exports.deletePublisher = (db, publisherId) => {
  const query = "DELETE FROM tbl_publisher WHERE publisherId = ?;";
  return doQuery(db, query, publisherId);
};
