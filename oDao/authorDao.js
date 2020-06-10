"use strict";

exports.readSomeAuthors = (db, authorIds) => {
  const query = "SELECT authorId FROM tbl_author WHERE authorId IN (?);";
  return new Promise((resolve, reject) => {
    db.query(query, authorIds, (error, result) => {
      if (error) reject(error);
      resolve(result);
    });
  });
};
