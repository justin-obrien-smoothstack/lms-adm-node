"use strict";

const write = (db, query, parameters, cb) => db.query(query, parameters, cb);
