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

exports.create = (book, cb) => {
    const query = 'INSERT INTO tbl_book (title, pubId) VALUES (?, ?);',
        parameters = [book.title, book.pubId];
    return write(query, parameters, cb);
};

exports.read = () => {

};

exports.update = () => {

};

exports.delete = () => {

};
