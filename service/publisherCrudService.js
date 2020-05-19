'use strict';

const dao = require('../oDao/publisherDao.js');

const maxLength = 45;

exports.create = (publisher) => {
    const responseAttributes = {};
    return new Promise((resolve, reject) => {
        if (publisher.publisherName.length > maxLength ||
            publisher.publisherAddress.length > maxLength ||
            publisher.publisherPhone.length > maxLength) {
            responseAttributes.status = 400;
            responseAttributes.message = `Error: The maximum field ` +
                `length is ${maxLength} characters.`;
        }
        dao.create(publisher).then(result => {
            responseAttributes.status = 201;
            responseAttributes.message = publisher;
        }).catch(error => {

        })

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
