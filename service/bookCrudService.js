'use strict';

const dao = require('../oDao/bookDao.js'),
    publisherDao = require('../oDao/publisherDao.js');

exports.create = (book) => {
    const responseAttributes = {};
    let skipRemaining = false;
    if (!book.title) {
        responseAttributes.status = 400;
        responseAttributes.message = 'Error: The field "title" ' +
            'is required.';
    } else if (book.pubId === 0 || book.pubId) {
        publisherDao.read(book.pubId).then(result => {
            if (result.length == 0) {
                responseAttributes.status = 400;
                responseAttributes.message = `Error: There exists no ` +
                    `publisher with ID ${book.pubId}.`;
                skipRemaining = true;
            }
        }).catch(error => {
            responseAttributes.status = 500;
            responseAttributes.message = 'There was an error while trying to ' +
                'find this book\'s publisher in the database.';
            skipRemaining = true;
        });
    }
    if (book.publisherName.length > maxLength ||
        book.publisherAddress &&
        book.publisherAddress.length > maxLength ||
        book.publisherPhone &&
        book.publisherPhone.length > maxLength) {
        responseAttributes.status = 400;
        responseAttributes.message = `Error: The maximum field ` +
            `length is ${maxLength} characters.`;
        resolve(responseAttributes);
    }
    dao.create(book).then(result => {
        responseAttributes.status = 201;
        responseAttributes.message = book;
        resolve(responseAttributes);
    }).catch(error => {
        responseAttributes.status = 500;
        responseAttributes.message = 'There was an error while trying to ' +
            'add this publisher to the database.';
        resolve(responseAttributes);
    })
};

exports.readOne = () => {

};

exports.readAll = () => {

};

exports.update = () => {

};

exports.delete = () => {

};
