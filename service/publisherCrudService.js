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

exports.readOne = (publisherId) => {
    const responseAttributes = {};
    return new Promise((resolve, reject) => {
        dao.read(publisherId).then(result => {
            if (result.length !== 0) {
                responseAttributes.status = 200;
                responseAttributes.message = result[0];
            } else {
                responseAttributes.status = 404;
                responseAttributes.message =
                    `There exists no publisher with ID ${publisherId}.`;
            }
            resolve(responseAttributes);
        }).catch(error => {
            responseAttributes.status = 500;
            responseAttributes.message =
            'There was an error while attempting to ' +
                'read that publisher from the database.';
            resolve(responseAttributes);
        })
    })
};

exports.readAll = () => {
    const responseAttributes = {};
    return new Promise((resolve, reject) => {
        dao.read().then(result => {
            responseAttributes.status = 200
            responseAttributes.message = result.length === 0 ?
                'There are no publishers in the database.' : result;
            resolve(responseAttributes);
        }).catch(error => {
            responseAttributes.status = 500;
            responseAttributes.message = 'There was an error while attempting to ' +
                'read publishers from the database.';
            resolve(responseAttributes);
        })
    })
};

exports.update = (publisher) => {
    const responseAttributes = {};
    return new Promise((resolve, reject) => {
        if (!(publisher.publisherName &&
            (publisher.publisherId === 0 || publisher.publisherId))) {
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

exports.delete = (publisherId) => {
    const responseAttributes = {};
    return new Promise((resolve, reject) => {
        dao.read(publisherId).then(result => {
            if (result.length === 0) {
                responseAttributes.status = 404;
                responseAttributes.message =
                    `There exists no publisher with ID ${publisherId}.`;
                resolve(responseAttributes);
            } else {
                dao.delete(publisherId).then(result => {
                    responseAttributes.status = 200;
                    responseAttributes.message =
                        `Publisher #${publisherId} ` +
                        `was deleted from the database.`;
                    resolve(responseAttributes);
                }).catch(error => {
                    responseAttributes.status = 500;
                    responseAttributes.message =
                        'There was an error while attempting to ' +
                        'delete that publisher from the database.';
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
