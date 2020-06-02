"use strict";

module.exports = require("mysql").createConnection({
  host: "localhost",
  user: "root",
  password: "texas",
  database: "library",
});
