'use strict';

const dao = require('../oDao/publisherDao.js');

exports.create = () => {

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
            reject(responseAttributes);
        })
    })
};

exports.readAll = () => {

};

exports.update = () => {

};

exports.delete = () => {

};
