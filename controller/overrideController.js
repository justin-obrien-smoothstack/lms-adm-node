"use strict";

const service = require("../service/overrideService"),
  router = require("express").Router();

router.put(
  "/lms/admin/loan/book/:bookId/borrower/:cardNo/branch/:branchId/dateout/:dateOut",
  (request, response) => {}
);
