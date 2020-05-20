'use strict';

const db = require('./db.js');

const write = (query, parameters, cb) => {
    db.beginTransaction(transactionError => {
        if (transactionError) cb(transactionError);
        else db.query(query, parameters, (queryError, result) => {
            if (queryError) db.rollback(() => cb(queryError, result));
            else db.commit(() => cb(queryError, result));
        })
    })
};

exports.create = (book, cb) => {
    const query = 'INSERT INTO tbl_book (title, pubId) VALUES (?, ?);',
        parameters = [book.title, book.pubId];
    return write(query, parameters, cb);
};

exports.read = (cb, bookId = '%') => {
    const query = 'SELECT * FROM tbl_book WHERE bookId LIKE ?';
    db.query(query, [bookId], (error, result) => cb(error, result));
};

exports.update = (book, cb) => {
    const query = 'UPDATE tbl_book SET title = ?, pubId = ? WHERE bookId = ?;',
        parameters = [book.title, book.pubId, book.bookId];
    return write(query, parameters, cb);
};

exports.delete = (bookId, cb) => {
    const query = 'DELETE FROM tbl_book WHERE bookId = ?;';
    return write(query, [bookId], cb);
};
