'use strict';

const db = require('./db.js');

const write = (query, parameters, cb) => {
    db.beginTransaction(transactionError => {
        if (transactionError) cb(transactionError);
        else db.query(query, parameters, (queryError, result) => {
            if (queryError) db.rollback();
            else db.commit();
            cb(queryError, result);
        })
    })
};

exports.create = () => {

};

exports.read = (cb, bookId = '%') => {
    const query = 'SELECT * FROM tbl_book WHERE bookId LIKE ?';
    db.query(query, [bookId], (error, result) => cb(error, result))
};

exports.update = () => {

};

exports.delete = (bookId, cb) => {
    const query = 'DELETE FROM tbl_publisher WHERE publisherId = ?;';
    return write(query, [bookId], cb);
};
