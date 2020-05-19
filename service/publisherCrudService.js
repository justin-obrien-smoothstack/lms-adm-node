'use strict';

const dao = require('../oDao/publisherDao.js');

const maxLength = 45;

exports.create = () => {

};

exports.readOne = () => {

};

exports.readAll = () => {

};

exports.update = (publisher) => {
    const responseAttributes = {};
    return new Promise((resolve, reject) => {
        if (!(publisher.publisherName && publisher.publisherId)) {
            responseAttributes.status = 400;
            responseAttributes.message = 'Error: The fields "publisherId" ' +
                'and "publisherName" are required.';
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
        dao.read(publisher.publisherId).then(result => {
            if (result.length === 0) {
                responseAttributes.status = 404;
                responseAttributes.message =
                    `There exists no publisher with ` +
                    `ID ${publisher.publisherId}.`;
                resolve(responseAttributes);
            } else {
                dao.update(publisher).then(result => {
                    responseAttributes.status = 200;
                    responseAttributes.message = `Publisher ` +
                        `#${publisher.publisherId} was updated.`;
                    resolve(responseAttributes);
                }).catch(error => {
                    responseAttributes.status = 500;
                    responseAttributes.message = 'There was an error while ' +
                        'trying to update that publisher in the database.';
                    resolve(responseAttributes);
                })
            }
        }).catch(error => {
            responseAttributes.status = 500;
            responseAttributes.message =
                'There was an error while attempting to ' +
                'find that publisher in the database.';
            resolve(responseAttributes);
        })
    })
};

exports.delete = () => {

};
