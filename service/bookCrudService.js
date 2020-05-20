'use strict';

const dao = require('../oDao/bookDao.js');

exports.create = () => {

};

exports.readOne = () => {

};

exports.readAll = (cb) => {
    const responseAttributes = {};
    dao.read((error, result) => {
        if (error) {
            responseAttributes.status = 500;
            responseAttributes.message = 'There was an error while attempting to ' +
                'read books from the database.';
        } else {
            responseAttributes.status = 200
            responseAttributes.message = result.length === 0 ?
                'There are no books in the database.' : result;
        }
        cb(responseAttributes);
    })
}

exports.update = () => {

};

exports.delete = () => {

};
