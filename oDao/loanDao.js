'use strict';

const db = require('./db.js');

const write = (query, parameters) => {
    return new Promise((resolve, reject) => {
        db.beginTransaction(transactionError => {
            if (transactionError) return reject(transactionError);
            db.query(query, parameters, (queryError, result) => {
                if (queryError) {
                    db.rollback();
                    return reject(queryError);
                }
                db.commit();
                return resolve(result);
            })
        })
    })
}

exports.update = loan => {
    const query = 'UPDATE tbl_loan SET dueDate = ?, dateIn = ? ' +
        'WHERE bookId = ? AND cardNo = ? AND branchId = ? AND dateOut = ?',
        parameters = [loan.dueDate, loan.dateIn, loan.bookId, loan.cardNo,
        loan.branchId, loan.dateOut];
    write(query, parameters);
}