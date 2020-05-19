'use strict';

const dao = require('../oDao/publisherDao.js');

exports.create = () => {

};

exports.readOne = () => {

};

exports.readAll = () => {

};

exports.update = () => {

};

exports.delete = (publisherId) => {
    const responseAttributes = {};
    return new Promise((resolve, reject) => {
        dao.read(publisherId).then(result => {
            if (result.length === 0) {
                responseAttributes.status = 404;
                responseAttributes.message =
                    `There exists no publisher with ID ${publisherId}.`;
                reject(responseAttributes);
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
                    reject(responseAttributes);
                })
            }
        }).catch(error => {
            responseAttributes.status = 500;
            responseAttributes.message =
                'There was an error while attempting to ' +
                'find that publisher in the database.';
            reject(responseAttributes);
        })
    })
};
