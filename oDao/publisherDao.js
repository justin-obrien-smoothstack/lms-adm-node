"use strict";

exports.readPublishers = (db, publisherId = "%") => {
  const query = "SELECT * FROM tbl_publisher WHERE publisherId LIKE ?";
  return new Promise((resolve, reject) => {
    db.query(query, [publisherId], (error, result) => {
      if (error) reject(error);
      resolve(result);
    });
  });
};
