let db = require("./db");

exports.readGenre = (id) => {
  return new Promise((resolve, reject) => {
    db.query(
      "SELECT * FROM library.tbl_genre where genre_id = ?",
      [id],
      (err, result) => {
        return err ? reject(err) : resolve(result);
      }
    );
  });
};

exports.readAllGenres = () => {
  return new Promise((resolve, reject) => {
    db.query("SELECT * FROM library.tbl_genre", (err, result) => {
      return err ? reject(err) : resolve(result);
    });
  });
};

exports.updateGenre = (genre) => {
  return new Promise((resolve, reject) => {
    db.beginTransaction((err) => {
      if (err) return reject(err);
      db.query(
        "update library.tbl_genre SET genre_name = ? WHERE genre_id = ?",
        [genre.name, genre.id],
        (err, result) => {
          if (err) {
            db.rollback();
            return reject(err);
          }
          db.commit();
          return resolve(result);
        }
      );
    });
  });
};

exports.deleteGenre = (id) => {
  return new Promise((resolve, reject) => {
    db.beginTransaction((err) => {
      if (err) return reject(err);
      db.query(
        "DELETE FROM library.tbl_genre WHERE genre_id = ?",
        [id],
        (err, result) => {
          if (err) {
            db.rollback();
            return reject(err);
          }

          db.commit(function (err) {
            if (err) {
              db.rollback(function () {
                reject(err);
              });
            }
          });
          resolve(result);
        }
      );
    });
  });
};

exports.createGenre = (genre, cb) => {
  db.beginTransaction((err) => {
    if (err) return cb(err);
    db.query(
      "Insert into library.tbl_genre (genre_name) VALUES (?)",
      [genre.name],
      (err, result) => {
        if (err) {
          db.rollback();
          return cb(err, result);
        }
        db.commit();
        return cb(err, result);
      }
    );
  });
};
