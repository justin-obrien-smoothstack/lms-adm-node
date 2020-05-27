const dao = require("../hDao/borrowerCrudDao");
const db = require("./db");
const winston = require("winston");
const logger = winston.createLogger({
  transports: [new winston.transports.Console()],
});

exports.readAllBorrowers = () => {
  let result;
  return new Promise((resolve, reject) => {
    db.beginTransaction(async function (err) {
      if (err) {
        logger.error(err);
        throw err;
      }

      try {
        result = await dao.readAllBorrowers(db);
      } catch (err) {
        logger.error(err);
        reject(err);
      }
      resolve(result);
    });
  });
};

exports.readBorrower = (cardNo) => {
  let result;
  return new Promise((resolve, reject) => {
    db.beginTransaction(async function (err) {
      if (err) {
        logger.error(err);
        throw err;
      }

      try {
        result = await dao.readBorrower(db, cardNo);
      } catch (err) {
        logger.error(err);
        reject(err);
      }
      resolve(result);
    });
  });
};

exports.updateBorrower = (borrower) => {
  let result;
  return new Promise((resolve, reject) => {
    db.beginTransaction(async function (err) {
      if (err) {
        logger.error(err);
        throw err;
      }

      try {
        result = await dao.updateBorrower(db, borrower);
      } catch (err) {
        db.rollback(() => {
          reject(err);
        });
        logger.error(err);
      }
      resolve(result);
    });
  });
};

exports.createBorrower = async (borrower) => {
  let result;
  return new Promise((resolve, reject) => {
    db.beginTransaction(async function (err) {
      if (err) {
        logger.error(err);
        throw err;
      }

      try {
        result = await dao.createBorrower(db, borrower);
        borrower.cardNo = result.insertId;
      } catch (err) {
        db.rollback(() => {
          reject(err);
        });
        logger.error(err);
      }
      resolve(borrower);
    });
  });
};

exports.deleteBorrower = async (cardNo) => {
  let result;
  return new Promise((resolve, reject) => {
    db.beginTransaction(async function (err) {
      if (err) {
        logger.error(err);
        throw err;
      }

      try {
        result = await dao.deleteBorrower(db, cardNo);
      } catch (err) {
        db.rollback(() => {
          reject(err);
        });
        logger.error(err);
      }
      resolve(result);
    });
  });
};
