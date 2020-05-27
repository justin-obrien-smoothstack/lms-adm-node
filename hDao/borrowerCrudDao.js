exports.readBorrower = (db, cardNo) => {
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

exports.readAllBorrowers = (db) => {
  return new Promise((resolve, reject) => {
    db.query("SELECT * FROM library.tbl_borrower", (err, result) => {
      return err ? reject(err) : resolve(result);
    });
  });
};

exports.updateBorrower = (db, borrower) => {
  return new Promise((resolve, reject) => {
    db.query(
      "update library.tbl_borrower SET name = ?, address = ?, phone = ? WHERE cardNo = ?",
      [borrower.name, borrower.address, borrower.phone, borrower.cardNo],
      (err, result) => {
        return err ? reject(err) : resolve(result);
      }
    );
  });
};

exports.deleteBorrower = (db, cardNo) => {
  return new Promise((resolve, reject) => {
    db.query(
      "DELETE FROM library.tbl_borrower WHERE cardNo = ?",
      [cardNo],
      (err, result) => {
        return err ? reject(err) : resolve(result);
      }
    );
  });
};

exports.createBorrower = (db, borrower) => {
  return new Promise((resolve, reject) => {
    db.query(
      "Insert into library.tbl_borrower (name, address, phone) VALUES (?, ?, ?)",
      [borrower.name, borrower.address, borrower.phone],
      (err, result) => {
        return err ? reject(err) : resolve(result);
      }
    );
  });
};
