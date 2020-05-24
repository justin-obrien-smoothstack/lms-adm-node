'use strict';

const write = (query, parameters) => {
    return new Promise((resolve, reject) => {
        db.beginTransaction(transactionError => {
            if (transactionError) return reject(transactionError);
            db.query(query, parameters, (queryError, result) => {
                if (queryError) {
                    db.rollback(() => { return reject(queryError); });
                }
                db.commit(() => { return resolve(result); });
            })
        })
    })
}

exports.read = (bookId = '%', cardNo = '%', branchId = '%', dateOut = '%') => {
    const query = 'SELECT * FROM tbl_book_loans WHERE bookId LIKE ? ' +
        'AND cardNo LIKE ? AND branchId LIKE ? AND dateOut LIKE ?;',
        parameters = [bookId, cardNo, branchId, dateOut];
    return new Promise((resolve, reject) => {
        db.query(query, parameters, (error, result) => {
            return error ? reject(error) : resolve(result);
        })
    })
}

exports.update = loan => {
    const query = 'UPDATE tbl_book_loans SET dueDate = ?, dateIn = ? ' +
        'WHERE bookId = ? AND cardNo = ? AND branchId = ? AND dateOut = ?',
        parameters = [loan.dueDate, loan.dateIn, loan.bookId, loan.cardNo,
        loan.branchId, loan.dateOut];
    return write(query, parameters);
}