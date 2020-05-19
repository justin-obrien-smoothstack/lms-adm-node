'use strict';

const dao = require('../oDao/publisherDao.js');

const maxLength = 45;

exports.create = (publisher) => {
    const responseAttributes = {};
    return new Promise((resolve, reject) => {
        if (!publisher.publisherName) {
            responseAttributes.status = 400;
            responseAttributes.message = 'Error: The field "publisherName" ' +
                'is required.';
            resolve(responseAttributes);
        }
        if (publisher.publisherName.length > maxLength ||
            publisher.publisherAddress &&
            publisher.publisherAddress.length > maxLength ||
            publisher.publisherPhone &&
            publisher.publisherPhone.length > maxLength) {
            responseAttributes.status = 400;
            responseAttributes.message = `Error: The maximum field ` +
                `length is ${maxLength} characters.`;
            resolve(responseAttributes);
        }
        dao.create(publisher).then(result => {
            responseAttributes.status = 201;
            responseAttributes.message = publisher;
            resolve(responseAttributes);
        }).catch(error => {
            responseAttributes.status = 500;
            responseAttributes.message = 'There was an error while trying to ' +
                'add this publisher to the database.';
            resolve(responseAttributes);
        })
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
