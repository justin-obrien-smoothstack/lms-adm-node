const dao = require("../hDao/genreCrudDao");
const db = require("./db");
const winston = require("winston");
const logger = winston.createLogger({
  transports: [new winston.transports.Console()],
});

exports.readAllGenres = () => {
  let result;
  return new Promise((resolve, reject) => {
    db.beginTransaction(async function (err) {
      if (err) {
        logger.error(err);
        throw err;
      }

      try {
        result = await dao.readAllGenres(db);
      } catch (err) {
        logger.error(err);
        reject(err);
      }
      resolve(result);
    });
  });
};

exports.readGenre = (id) => {
  let result;
  return new Promise((resolve, reject) => {
    db.beginTransaction(async function (err) {
      if (err) {
        logger.error(err);
        throw err;
      }

      try {
        result = await dao.readGenre(db, id);
      } catch (err) {
        logger.error(err);
        reject(err);
      }
      resolve(result);
    });
  });
};

exports.updateGenre = async (genre) => {
  let result;
  return new Promise((resolve, reject) => {
    db.beginTransaction(async function (err) {
      if (err) {
        logger.error(err);
        throw err;
      }

      try {
        result = await dao.updateGenre(db, genre);
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

exports.createGenre = async (genre) => {
  let result;
  return new Promise((resolve, reject) => {
    db.beginTransaction(async function (err) {
      if (err) {
        logger.error(err);
        throw err;
      }

      try {
        result = await dao.createGenre(db, genre);
        genre.id = result.insertId;
      } catch (err) {
        db.rollback(() => {
          reject(err);
        });
        logger.error(err);
      }
      resolve(genre);
    });
  });
};

exports.deleteGenre = async (id) => {
  let result;
  return new Promise((resolve, reject) => {
    db.beginTransaction(async function (err) {
      if (err) {
        logger.error(err);
        throw err;
      }

      try {
        result = await dao.deleteGenre(db, id);
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
