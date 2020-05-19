'use strict';

const dao = require('../oDao/publisherDao.js');

exports.create = () => {

};

exports.readOne = () => {

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

exports.update = () => {

};

exports.delete = () => {

};
