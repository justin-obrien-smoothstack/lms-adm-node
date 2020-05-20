'use strict';

const db = require('./db.js');

const write = (query, parameters, cb) => {
    db.beginTransaction(transactionError => {
        if (transactionError) cb(transactionError);
        else db.query(query, parameters, (queryError, result) => {
            if (queryError) db.rollback();
            else db.commit();
            cb(queryError, result);
        })
    })
};

exports.create = () => {

};

exports.read = () => {

};

exports.update = () => {

};

exports.delete = () => {

};
