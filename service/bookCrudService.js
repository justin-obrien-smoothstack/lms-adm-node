'use strict';

const dao = require('../oDao/bookDao.js'),
    publisherDao = require('../oDao/publisherDao.js');

const maxLength = 45;

exports.create = (book, cb) => {
    const responseAttributes = {};
    if (!book.title) {
        responseAttributes.status = 400;
        responseAttributes.message = 'Error: The field "title" ' +
            'is required.';
        cb(responseAttributes);
    } else if (book.title.length > maxLength) {
        responseAttributes.status = 400;
        responseAttributes.message = `Error: The maximum field length is ` +
            `${maxLength} characters.`;
        cb(responseAttributes);
    } else if (book.pubId === 0 || book.pubId) {
        publisherDao.read(book.pubId).then(result => {
            if (result.length == 0) {
                responseAttributes.status = 400;
                responseAttributes.message = `Error: There exists no ` +
                    `publisher with ID ${book.pubId}.`;
                cb(responseAttributes);
            } else {
                dao.create(book, error => {
                    if (error) {
                        responseAttributes.status = 500;
                        responseAttributes.message =
                            'There was an error while trying to ' +
                            'add this book to the database.';
                    } else {
                        responseAttributes.status = 201;
                        responseAttributes.message = book;
                    }
                    cb(responseAttributes);
                });
            }
        }).catch(error => {
            responseAttributes.status = 500;
            responseAttributes.message = 'There was an error while trying to ' +
                'find this book\'s publisher in the database.';
            cb(responseAttributes);
        });
    } else {
        dao.create(book, error => {
            if (error) {
                responseAttributes.status = 500;
                responseAttributes.message =
                    'There was an error while trying to ' +
                    'add this book to the database.';
            } else {
                responseAttributes.status = 201;
                responseAttributes.message = book;
            }
            cb(responseAttributes);
        });
    }
};

exports.readOne = (bookId, cb) => {
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

exports.delete = (bookId, cb) => {
    const responseAttributes = {};
    dao.read((error, result) => {
        if (error) {
            responseAttributes.status = 500;
            responseAttributes.message =
                'There was an error while attempting to ' +
                'find that book in the database.';
                cb(responseAttributes);
        } else if (result.length === 0) {
            responseAttributes.status = 404;
            responseAttributes.message =
                `There exists no book with ID ${bookId}.`;
                cb(responseAttributes);
        } else {
            dao.delete(bookId, (error, result) => {
                if (error) {
                    responseAttributes.status = 500;
                    responseAttributes.message =
                        'There was an error while attempting to ' +
                        'delete that book from the database.';
                } else {
                    responseAttributes.status = 200;
                    responseAttributes.message =
                        `Book #${bookId} ` +
                        `was deleted from the database.`;
                }
                cb(responseAttributes);
            })
        }
    }, bookId);
};
