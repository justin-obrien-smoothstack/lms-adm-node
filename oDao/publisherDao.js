"use strict";

exports.updatePublisher = (db, publisher) => {
  const query =
      "UPDATE tbl_publisher SET publisherName = ?, publisherAddress = ?, publisherPhone = ? WHERE publisherId = ?;",
    parameters = [
      publisher.publisherName,
      publisher.publisherAddress,
      publisher.publisherPhone,
      publisher.publisherId,
    ];
  db.query(query, parameters, (error, result) => {
    if (error) reject(error);
    resolve(result);
  });
};
