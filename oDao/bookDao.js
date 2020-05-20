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

exports.read = () => {

};

exports.update = (book) => {
    const query = 'UPDATE tbl_book SET title = ?, pubId = ? WHERE bookId = ?;',
        parameters = [book.title, book.pubId, book.bookId];
    return write(query, parameters, cb);
};

exports.delete = () => {

};
