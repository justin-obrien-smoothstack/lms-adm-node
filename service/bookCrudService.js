'use strict';

const dao = require('../oDao/bookDao.js');

exports.create = () => {

};

exports.readOne = () => {

};

exports.readAll = (cb) => {
    const responseAttributes = {};
    dao.read((error, result) => {
        if (error) {
            responseAttributes.status = 500;
            responseAttributes.message = 'There was an error while attempting to ' +
                'read books from the database.';
            return responseAttributes;
        }
        responseAttributes.status = 200
        responseAttributes.message = result.length === 0 ?
            'There are no publishers in the database.' : result;
        return responseAttributes;
    })
}

.then(result => {
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
};

exports.update = () => {

};

exports.delete = () => {

};
