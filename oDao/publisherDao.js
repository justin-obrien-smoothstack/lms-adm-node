'use strict';

const db = require('./db.js');

const write = () => {

};

exports.create = () => {

};

exports.read = (publisherId = '%') => {
    const query = 'SELECT * FROM tbl_publisher WHERE publisherId LIKE ?';
    return new Promise((resolve, reject) => {
        db.query(query, [publisherId], (error, result) => {
            return error ? reject(error) : resolve(result);
        })
   })
};

    exports.update = () => {

    };

    exports.delete = () => {

    };
