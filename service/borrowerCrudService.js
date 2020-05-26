const dao = require("../hDao/borrowerCrudDao");

const winston = require("winston");
const logger = winston.createLogger({
  transports: [new winston.transports.Console()],
});

exports.readAllBorrowers = () => {
  return new Promise((resolve, reject) => {
    let dbResult = {};
    dao
      .readAllBorrowers()
      .then((result) => {
        dbResult.body = result;
        dbResult.status = 200;
        if (result.length === 0) {
          dbResult.body = "There are no borrowers in our database.";
        }
        resolve(dbResult);
      })
      .catch((err) => {
        logger.error(err);
        reject(err);
      });
  });
};

exports.readBorrower = (cardNo) => {
  return new Promise((resolve, reject) => {
    let response = {};
    dao
      .readBorrower(cardNo)
      .then((result) => {
        response.body = result;
        response.status = 200;
        if (result.length < 1) {
          response.body =
            "There is no borrower with that card number in our database.";
          response.status = 404;
        }
        resolve(response);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

exports.updateBorrower = async (borrower) => {
  let response = checkUpdateRequest(borrower);
  if (response.status > 300) {
    return response;
  }

  try {
    let response = await dao.updateBorrower(borrower);
    response.status = 200;
    response.body = borrower;
    return response;
  } catch (err) {
    logger.error(err);
    response.status = 500;
    response.body = "Internal server error.";
    return response;
  }
};

exports.createBorrower = (borrower, res) => {
  let request = checkCreateRequest(borrower);
  if (request.status > 300) {
    res.status(request.status).send(request.body);
    return;
  }

  dao.createBorrower(borrower, (err, result) => {
    if (err) {
      res.status(500).send("Internal Server Error");
      logger.error(err);
      return;
    }

    borrower.cardNo = result.insertId;
    res.status(200);
    res.format({
      "application/json": function () {
        res.send(borrower);
      },
      "application/xml": function () {
        res.send(jsontoxml(borrower));
      },
      "text/plain": function () {
        res.send(borrower.toString());
      },
    });
    return;
  });
};

exports.deleteBorrower = (cardNo) => {
  return new Promise((resolve, reject) => {
    let response = {};
    dao
      .deleteBorrower(cardNo)
      .then((result) => {
        response.body = `One borrower with card number ${cardNo} was deleted from the database.`;
        response.status = 204;
        if (result.affectedRows < 1) {
          response.body =
            "There is no borrower with that card number in our database.";
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

let checkUpdateRequest = (borrower) => {
  let maxLength = 45;
  let minLength = 1;

  let response = {
    status: 200,
  };

  if (borrower.cardNo == undefined) {
    response.status = 400;
    response.body = "The card number is required to update a borrower.";
  } else if (
    borrower.name.length > maxLength ||
    borrower.name.length < minLength ||
    borrower.address.length > maxLength ||
    borrower.address.length < minLength ||
    borrower.phone.length > maxLength ||
    borrower.phone.length < minLength
  ) {
    response.status = 400;
    response.body =
      "The length of fields name, address, and phone must be between 1 and 45 characters long.";
  }

  return response;
};

let checkCreateRequest = (borrower) => {
  let maxLength = 45;
  let minLength = 1;

  let response = {
    status: 200,
  };

  if (
    borrower.name.length > maxLength ||
    borrower.name.length < minLength ||
    borrower.address.length > maxLength ||
    borrower.address.length < minLength ||
    borrower.phone.length > maxLength ||
    borrower.phone.length < minLength
  ) {
    response.status = 400;
    response.body =
      "The length of fields name, address, and phone must be between 1 and 45 characters long.";
  }

  return response;
};
