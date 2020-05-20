'use strict';

const db = require('./db.js');

const write = () => {

};

exports.create = () => {

};

exports.read = (cb, bookId = '%') => {
    const query = 'SELECT * FROM tbl_book WHERE bookId LIKE ?';
    db.query(query, [bookId], (error, result) => cb(error, result));
};

exports.update = () => {

};

exports.delete = () => {

};
