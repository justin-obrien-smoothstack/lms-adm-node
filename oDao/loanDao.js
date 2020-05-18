'use strict';

const db = require('./db.js');

exports.read = (bookId = '%', cardNo = '%', branchId = '%', dateOut = '%') => {
    query = 'SELECT * FROM tbl_book_loans WHERE bookId LIKE ? \
    AND cardNo LIKE ? AND branchId LIKE ? AND dateOut LIKE ?;';
    parameters = [bookId, cardNo, branchId, dateOut];
    return new Promise((resolve, reject) => {
        db.query(query, parameters, (error, result) => {
            return error ? reject(error) : resolve(result);
        })
    })
}