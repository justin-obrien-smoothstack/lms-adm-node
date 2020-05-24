"use strict";

const db = require("./db"),
  bookDao = require("../oDao/bookDao"),
  publisherDao = require("../oDao/publisherDao");

const maxLength = 45;

exports.readBooks = async (db) => {
  return await bookDao.readBooks(db);
};
