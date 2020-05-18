'use strict';

const db = require('./db.js');

exports.update = loan => {
    const query = 'UPDATE tbl_book_loans SET dueDate = ?, dateIn = ? ' +
        'WHERE bookId = ? AND cardNo = ? AND branchId = ? AND dateOut = ?',
        parameters = [loan.dueDate, loan.dateIn, loan.bookId, loan.cardNo,
        loan.branchId, loan.dateOut];
    return write(query, parameters);
}