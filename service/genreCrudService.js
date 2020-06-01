const dao = require("../hDao/genreCrudDao");

const winston = require("winston");
const logger = winston.createLogger({
  transports: [new winston.transports.Console()],
});

exports.readAllGenres = () => {
  return new Promise((resolve, reject) => {
    let dbResult = {};
    dao
      .readAllGenres()
      .then((result) => {
        dbResult.body = result;
        dbResult.status = 200;
        if (result.length === 0) {
          dbResult.body = "There are no genres in our database.";
        }
        resolve(dbResult);
      })
      .catch((err) => {
        logger.error(err);
        reject(err);
      });
  });
};

exports.readGenre = (id) => {
  return new Promise((resolve, reject) => {
    let response = {};
    dao
      .readGenre(id)
      .then((result) => {
        response.body = result;
        response.status = 200;
        if (result.length < 1) {
          response.body = "There is no genre with that id in our database.";
          response.status = 404;
        }
        resolve(response);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

exports.updateGenre = async (genre) => {
  let response = checkUpdateRequest(genre);
  if (response.status > 300) {
    return response;
  }

  try {
    let response = await dao.updateGenre(genre);
    response.status = 200;
    response.body = genre;
    return response;
  } catch (err) {
    logger.error(err);
    response.status = 500;
    response.body = "Internal server error.";
    return response;
  }
};

exports.createGenre = (genre, res) => {
  let request = checkCreateRequest(genre);
  if (request.status > 300) {
    res.status(request.status).send(request.body);
    return;
  }

  dao.createGenre(genre, (err, result) => {
    if (err) {
      res.status(500).send("Internal Server Error");
      logger.error(err);
      return;
    }

    genre.id = result.insertId;
    res.status(200).send(genre);
    return;
  });
};

exports.deleteGenre = (id) => {
  return new Promise((resolve, reject) => {
    let response = {};
    dao
      .deleteGenre(id)
      .then((result) => {
        response.body = `One genre with id ${id} was deleted from the database.`;
        response.status = 204;
        if (result.affectedRows < 1) {
          response.body = "There is no genre with that id in our database.";
          response.status = 404;
        }
        resolve(response);
      })
      .catch((err) => {
        logger.error(err);
        reject(err);
      });
  });
};

let checkUpdateRequest = (genre) => {
  let maxLength = 45;
  let minLength = 1;

  let response = {
    status: 200,
  };

  if (genre.id == undefined) {
    response.status = 400;
    response.body = "The id is required to update a genre.";
  } else if (genre.name.length > maxLength || genre.name.length < minLength) {
    response.status = 400;
    response.body =
      "The length of name must be between 1 and 45 characters long.";
  }

  return response;
};

let checkCreateRequest = (genre) => {
  let maxLength = 45;
  let minLength = 1;

  let response = {
    status: 200,
  };

  if (genre.name.length > maxLength || genre.name.length < minLength) {
    response.status = 400;
    response.body =
      "The length of name must be between 1 and 45 characters long.";
  }

  return response;
};
