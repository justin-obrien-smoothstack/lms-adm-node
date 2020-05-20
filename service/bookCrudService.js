'use strict';

const dao = require('../oDao/bookDao.js'),
    publisherDao = require('../oDao/publisherDao.js');

const maxLength = 45;

exports.create = (book) => {
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
                });
            }
            cb(responseAttributes);
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

exports.readOne = () => {

};

exports.readAll = () => {

};

exports.update = () => {

};

exports.delete = () => {

};
