"use strict";

const db = require("./db"),
  publisherDao = require("../oDao/publisherDao");

const maxLength = 45;

exports.readPublishers = () => {
  const results = {};
  return new Promise((resolve, reject) => {
    publisherDao.readPublishers(db).then(
      (result) => resolve(result),
      (error) => reject(error)
    );
  });
};
