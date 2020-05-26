let db = require("./db");

exports.readBorrower = (cardNo) => {
  return new Promise((resolve, reject) => {
    db.query(
      "SELECT * FROM library.tbl_borrower where cardNo = ?",
      [cardNo],
      (err, result) => {
        return err ? reject(err) : resolve(result);
      }
    );
  });
};

exports.readAllBorrowers = () => {
  return new Promise((resolve, reject) => {
    db.query("SELECT * FROM library.tbl_borrower", (err, result) => {
      return err ? reject(err) : resolve(result);
    });
  });
};

exports.updateBorrower = (borrower) => {
  return new Promise((resolve, reject) => {
    db.beginTransaction((err) => {
      if (err) return reject(err);
      db.query(
        "update library.tbl_borrower SET name = ?, address = ?, phone = ? WHERE cardNo = ?",
        [borrower.name, borrower.address, borrower.phone, borrower.cardNo],
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

exports.deleteBorrower = (cardNo) => {
  return new Promise((resolve, reject) => {
    db.beginTransaction((err) => {
      if (err) return reject(err);
      db.query(
        "DELETE FROM library.tbl_book_loans WHERE cardNo = ?",
        [cardNo],
        (err, result) => {
          if (err) {
            db.rollback();
            return reject(err);
          }

          db.query(
            "DELETE FROM library.tbl_borrower WHERE cardNo = ?",
            [cardNo],
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
                db.end();
                resolve(result);
              });
            }
          );
        }
      );
    });
  });
};

exports.createBorrower = (borrower, cb) => {
  db.beginTransaction((err) => {
    if (err) return cb(err);
    db.query(
      "Insert into library.tbl_borrower (name, address, phone) VALUES (?, ?, ?)",
      [borrower.name, borrower.address, borrower.phone],
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
