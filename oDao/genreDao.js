"use strict";

exports.readSomeGenres = (db, genreIds) => {
  const query = "SELECT genre_id FROM tbl_genre WHERE genre_id IN (?);";
  return new Promise((resolve, reject) => {
    db.query(query, genreIds, (error, result) => {
      if (error) reject(error);
      resolve(result);
    });
  });
};
