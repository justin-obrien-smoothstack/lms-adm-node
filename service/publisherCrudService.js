'use strict';

const dao = require('../oDao/publisherDao.js');

exports.create = (publisher) => {
    const responseAttributes = {};
    return new Promise((resolve, reject) => {
        if (publisher.publisherName.length > 45 || )
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
