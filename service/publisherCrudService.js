'use strict';

const dao = require('../oDao/publisherDao.js');

exports.create = () => {

};

exports.readOne = () => {

};

exports.readAll = () => {
    const responseAttributes = {};
    dao.read().then(result => {
        responseAttributes.status = 200
        responseAttributes.message = result.length === 0 ?
            'There are no publishers in the database.' : result;
    }).catch(error => {
        responseAttributes.status = 500;
        responseAttributes.message = 'There was an error while attempting to ' +
        'read publishers from the database.';
    })
    return responseAttributes;
};

exports.update = () => {

};

exports.delete = () => {

};
