"use strict";

const db = require("./db"),
  bookDao = require("../oDao/bookDao"),
  publisherDao = require("../oDao/publisherDao");

const maxLength = 45;

exports.readBooks = async (db) => {
  try {
    return await bookDao.readBooks(db);
  } catch(error){
    return null;
  }
};
