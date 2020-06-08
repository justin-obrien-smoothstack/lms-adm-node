exports.readGenre = (db, id) => {
  return new Promise((resolve, reject) => {
    db.query(
      "SELECT * FROM tbl_genre where genre_id = ?",
      [id],
      (err, result) => {
        return err ? reject(err) : resolve(result);
      }
    );
  });
};

exports.readAllGenres = (db) => {
  return new Promise((resolve, reject) => {
    db.query("SELECT * FROM tbl_genre", (err, result) => {
      return err ? reject(err) : resolve(result);
    });
  });
};

exports.deleteGenre = (db, id) => {
  return new Promise((resolve, reject) => {
    db.query(
      "DELETE FROM tbl_genre WHERE genre_id = ?",
      [id],
      (err, result) => {
        return err ? reject(err) : resolve(result);
      }
    );
  });
};

exports.createGenre = (db, genre) => {
  return new Promise((resolve, reject) => {
    db.query(
      "Insert into tbl_genre (genre_name) VALUES (?)",
      [genre.name],
      (err, result) => {
        return err ? reject(err) : resolve(result);
      }
    );
  });
};

exports.updateGenre = (db, genre) => {
  return new Promise((resolve, reject) => {
    db.query(
      "update tbl_genre SET genre_name = ? WHERE genre_id = ?",
      [genre.name, genre.id],
      (err, result) => {
        return err ? reject(err) : resolve(result);
      }
    );
  });
};
