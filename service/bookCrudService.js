'use strict';

const dao = require('../oDao/bookDao.js');

exports.create = () => {

};

exports.readOne = (cb) => {
    const responseAttributes = {};
    dao.read((error, result) => {
        if (error) {
            responseAttributes.status = 500;
            responseAttributes.message = 'There was an error while ' +
            'attempting to read books from the database.';
        } else if (result.length === 0) {
            responseAttributes.status = 404;
            responseAttributes.message = `There exists no book with ` +
                `ID ${bookId}.`;
        } else { 
            responseAttributes.status = 200;
            responseAttributes.message = result[0];
        }
        cb(responseAttributes);
    }, bookId);
};

exports.readAll = () => {

};

exports.update = () => {

};

exports.delete = () => {

};
