'use strict';

const dao = require('../oDao/bookDao.js');

exports.create = () => {

};

exports.readOne = () => {

};

exports.readAll = () => {

};

exports.update = () => {

};

exports.delete = (bookId, cb) => {
    const responseAttributes = {};
    return new Promise((resolve, reject) => {
        dao.read(bookId).then(result => {
            if (result.length === 0) {
                responseAttributes.status = 404;
                responseAttributes.message =
                    `There exists no book with ID ${bookId}.`;
                resolve(responseAttributes);
            } else {
                dao.delete(bookId).then(result => {
                    responseAttributes.status = 200;
                    responseAttributes.message =
                        `Book #${bookId} ` +
                        `was deleted from the database.`;
                    resolve(responseAttributes);
                }).catch(error => {
                    responseAttributes.status = 500;
                    responseAttributes.message =
                        'There was an error while attempting to ' +
                        'delete that book from the database.';
                    resolve(responseAttributes);
                })
            }
        }).catch(error => {
            responseAttributes.status = 500;
            responseAttributes.message =
                'There was an error while attempting to ' +
                'find that book in the database.';
            resolve(responseAttributes);
        })
    })
};
