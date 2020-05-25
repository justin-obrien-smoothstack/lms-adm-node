'use strict';

const db = require('./db.js');

const write = (query, parameters) => {
    return new Promise((resolve, reject) => {
        db.beginTransaction(transactionError => {
            if (transactionError) return reject(transactionError);
            db.query(query, parameters, (queryError, result) => {
                if (queryError) {
                    db.rollback(() => { return reject(queryError); });
                }
                db.commit(() => { return resolve(result); });
            })
        })
    })
};

exports.create = (publisher) => {
    const query = 'INSERT INTO tbl_publisher ' +
        '(publisherName, publisherAddress, publisherPhone) VALUES (?, ?, ?);',
        parameters = [publisher.publisherName, publisher.publisherAddress,
        publisher.publisherPhone]
    return write(query, parameters);
};

exports.read = (publisherId = '%') => {
    const query = 'SELECT * FROM tbl_publisher WHERE publisherId LIKE ?';
    return new Promise((resolve, reject) => {
        db.query(query, [publisherId], (error, result) => {
            return error ? reject(error) : resolve(result);
        })
    })
};

exports.update = (publisher) => {
    const query = 'UPDATE tbl_publisher SET publisherName = ?, ' +
        'publisherAddress = ?, publisherPhone = ? WHERE publisherId = ?;',
        parameters = [publisher.publisherName, publisher.publisherAddress,
        publisher.publisherPhone, publisher.publisherId];
    return write(query, parameters);
};

exports.delete = publisherId => {
    const query = 'DELETE FROM tbl_publisher WHERE publisherId = ?;';
    return write(query, [publisherId]);
};
